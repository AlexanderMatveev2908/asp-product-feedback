package server.features.feedbacks.middleware;

import org.springframework.stereotype.Component;
import org.springframework.web.server.WebFilterChain;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.core.api.Api;
import server.middleware.base_mdw.BaseMdw;
import org.springframework.http.HttpMethod;

@SuppressFBWarnings({ "EI2" }) @Component @RequiredArgsConstructor
public class FeedbacksMdw extends BaseMdw {

  @Override
  public Mono<Void> handle(Api api, WebFilterChain chain) {
    return isTarget(api, chain, "/feedbacks",HttpMethod.GET, () -> {
      return chain.filter(api);
    });
  }
}
