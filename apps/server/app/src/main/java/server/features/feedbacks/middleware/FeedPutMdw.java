package server.features.feedbacks.middleware;

import org.springframework.stereotype.Component;
import org.springframework.web.server.WebFilterChain;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.core.api.Api;
import server.features.feedbacks.middleware.shared.FeedFinderMdw;
import server.features.feedbacks.paperwork.PutFeedFormT;
import server.middleware.base_mdw.BaseMdw;
import server.models.feedbacks.etc.FeedSvc;

import org.springframework.http.HttpMethod;
import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;

@Component
@RequiredArgsConstructor
@SuppressFBWarnings({ "EI2", "EI" })
public class FeedPutMdw extends BaseMdw implements FeedFinderMdw {
  private final FeedSvc feedSvc;

  public FeedSvc getFeedSvc() {
    return feedSvc;
  }

  @Override
  public final Mono<Void> handle(Api api, WebFilterChain chain) {
    return matchPathAfterCutIdOut(api, chain, "/feedbacks", HttpMethod.PUT, () -> {
      return limit(api, 10, 15)
          .then(throwOn404(withPathId(api)))
          .then(checkBodyForm(api, PutFeedFormT.class))
          .then(chain.filter(api));
    });
  }
}