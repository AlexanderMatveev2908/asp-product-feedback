package server.features.comments.middleware;

import org.springframework.stereotype.Component;
import org.springframework.web.server.WebFilterChain;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.core.api.Api;
import server.middleware.base_mdw.BaseMdw;
import org.springframework.http.HttpMethod;

@SuppressFBWarnings({ "EI2", "EI" })
@Component
@RequiredArgsConstructor
public final class CommentsMdw extends BaseMdw {

  @Override
  public final Mono<Void> handle(Api api, WebFilterChain chain) {
    return isTarget(api, chain, "/comments", HttpMethod.GET, () -> {
      return chain.filter(api);
    });
  }
}
