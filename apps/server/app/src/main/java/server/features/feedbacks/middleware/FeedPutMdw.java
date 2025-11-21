package server.features.feedbacks.middleware;

import org.springframework.stereotype.Component;
import org.springframework.web.server.WebFilterChain;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.core.ErrAPI;
import server.decorators.core.api.Api;
import server.features.feedbacks.paperwork.PutFeedFormT;
import server.middleware.base_mdw.BaseMdw;
import server.models.feedbacks.etc.FeedSvc;

import org.springframework.http.HttpMethod;
import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;

@Component
@RequiredArgsConstructor
@SuppressFBWarnings({ "EI2" })
public class FeedPutMdw extends BaseMdw {
  private final FeedSvc feedSvc;

  @Override
  public final Mono<Void> handle(Api api, WebFilterChain chain) {
    return matchPathAfterCutIdOut(api, chain, "/feedbacks", HttpMethod.PUT, () -> {
      return limit(api, 10, 15)
          .then(withPathId(api).flatMap(
              feedbackId -> feedSvc.byId(feedbackId).switchIfEmpty(Mono.error(new ErrAPI("feedback not found", 404)))))
          .then(checkBodyForm(api, PutFeedFormT.class))
          .then(chain.filter(api));
    });
  }
}