package server.features.comments.middleware;

import org.springframework.stereotype.Component;
import org.springframework.web.server.WebFilterChain;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.core.api.Api;
import server.features.comments.paperwork.CommentFormT;
import server.features.feedbacks.middleware.shared.FeedFinderMdw;
import server.middleware.base_mdw.BaseMdw;
import server.models.feedbacks.etc.FeedSvc;

import org.springframework.http.HttpMethod;

@SuppressFBWarnings({ "EI2", "EI" })
@Component
@RequiredArgsConstructor
public final class CommentsMdw extends BaseMdw implements FeedFinderMdw {
  private final FeedSvc feedSvc;

  public FeedSvc getFeedSvc() {
    return feedSvc;
  }

  @Override
  public final Mono<Void> handle(Api api, WebFilterChain chain) {
    return matchPathAfterCutIdOut(api, chain, "/comments", HttpMethod.POST, () -> {
      return limit(api, 10, 15).then(throwOn404(withPathId(api))).then(checkBodyForm(api, CommentFormT.class))
          .then(chain.filter(api));
    });
  }
}
