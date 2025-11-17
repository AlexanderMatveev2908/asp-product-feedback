package server.lib.dev.lib_log.sub;

import server.decorators.types.Nullable;

public class C_LibLogErr extends B_LibLogAio {
  public static final void logErr(Throwable err) {
    wErr(err);

    startLog();

    logHeader(null);

    tab();

    final StackTraceElement[] frames = err.getStackTrace();

    for (final StackTraceElement f : frames)
      stdOutF("📂 %s => 🔢 %d | 🆎 %s | ☢️ %s%n", f.getFileName(), f.getLineNumber(), f.getMethodName(),
          f.toString());

    final String msg = err.getMessage();
    final int depth = frames.length;
    final Nullable<StackTraceElement> last = depth > 0 ? Nullable.of(frames[0]) : Nullable.asNone();

    tab();

    stdOutF("📝 msg => %s%n", msg);
    stdOutF("📏 depth => %d%n", depth);

    if (last.isPresent()) {
      stdOutF("💥 last file => 📁 %s%n", last.orYell().getFileName());
      stdOutF("📏 last line => %d%n", last.orYell().getLineNumber());
      stdOutF("👻 last cb name => %s%n", last.orYell().getMethodName());
    }

    endLog();
  }
}
