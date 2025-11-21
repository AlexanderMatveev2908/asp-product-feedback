package server.features.feedbacks.middleware;

import org.springframework.stereotype.Component;
import org.springframework.web.server.WebFilterChain;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.core.api.Api;
import server.features.feedbacks.middleware.shared.FeedFinderMdw;
import server.middleware.base_mdw.BaseMdw;
import server.models.feedbacks.etc.FeedSvc;

import org.springframework.http.HttpMethod;
import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;

@Component
@RequiredArgsConstructor
@SuppressFBWarnings({ "EI2", "EI" })
public class FeedLikeMdw extends BaseMdw implements FeedFinderMdw {
  private final FeedSvc feedSvc;

  public FeedSvc getFeedSvc() {
    return feedSvc;
  }

  @Override
  public final Mono<Void> handle(Api api, WebFilterChain chain) {
    return matchPathAfterCutIdOut(api, chain, "/feedbacks/like", HttpMethod.PATCH, () -> {
      return limit(api, 30, 15).then(throwOn404(withPathId(api)).flatMap(found -> {
        api.setTypedDataAttr(found);
        return chain.filter(api);
      }));
    });
  }
}