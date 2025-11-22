package server.features.feedbacks.middleware;

import org.springframework.stereotype.Component;
import org.springframework.web.server.WebFilterChain;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.core.api.Api;
import server.middleware.base_mdw.BaseMdw;
import server.models.feedbacks.etc.FeedSvc;

import org.springframework.http.HttpMethod;
import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;

@Component
@RequiredArgsConstructor
@SuppressFBWarnings({ "EI2", "EI" })
public class FeedDelMdw extends BaseMdw {
  private final FeedSvc feedSvc;

  @Override
  public final Mono<Void> handle(Api api, WebFilterChain chain) {
    return matchPathAfterCutIdOut(api, chain, "/feedbacks", HttpMethod.DELETE, () -> {
      return limit(api, 10, 15).then(withPathId(api).flatMap(feedbackId -> feedSvc.throwNotFound(feedbackId)))
          .then(chain.filter(api));
    });
  }
}
