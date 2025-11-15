package server.middleware.err_mng.etc;

import org.springframework.web.server.ServerWebExchange;

import server.decorators.Nullable;
import server.decorators.flow.ErrAPI;
import server.paperwork.Reg;

public final record RecMetaErr(String msg, int status) {

  private static final String getMsgFromErr(Throwable err, String originalMsg) {
    return Reg.startsWithEmj(Nullable.of(originalMsg)) ? originalMsg
        : String.format("%s %s", err instanceof ErrAPI ? "❌" : "💣", originalMsg);
  }

  private static final int getStatusFromErr(Throwable err) {
    return err instanceof final ErrAPI errInst ? errInst.getStatus() : 500;
  }

  public static final RecMetaErr fromErr(ServerWebExchange exc, Throwable err) {
    final String originalMsg = Nullable.of(err.getMessage()).orElse("");
    final RouteFlags flags = RouteFlags.fromMsg(originalMsg);

    return flags.isRouteIssue() ? new RecMetaErr(flags.getRouteErrMsg(exc), flags.getRouteErrStatus())
        : new RecMetaErr(getMsgFromErr(err, originalMsg), getStatusFromErr(err));
  }
}

final record RouteFlags(boolean isRouteNotFound, boolean isMethodNotAllowed) {
  public static final RouteFlags fromMsg(String msg) {
    final boolean isRouteNotFound = msg.contains("404 NOT_FOUND");
    final boolean isMethodNotAllowed = msg.contains("405 METHOD_NOT_ALLOWED");
    return new RouteFlags(isRouteNotFound, isMethodNotAllowed);
  }

  public final boolean isRouteIssue() {
    return isRouteNotFound || isMethodNotAllowed;
  }

  public final String getRouteErrMsg(ServerWebExchange exc) {
    final String endpoint = exc.getRequest().getPath().value();
    return isRouteNotFound ? String.format("❌ route %s not found 🚦", endpoint)
        : String.format("❌ route %s does not support %s requests 🚦", endpoint,
            exc.getRequest().getMethod().toString());
  }

  public final int getRouteErrStatus() {
    return isRouteNotFound ? 404 : 405;
  }
}