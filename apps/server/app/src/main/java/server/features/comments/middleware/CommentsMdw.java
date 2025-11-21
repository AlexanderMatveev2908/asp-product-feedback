package server.features.comments.middleware;

import org.springframework.stereotype.Component;
import org.springframework.web.server.WebFilterChain;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.core.api.Api;
import server.features.comments.paperwork.CommentFormT;
import server.middleware.base_mdw.BaseMdw;
import server.models.feedbacks.etc.FeedSvc;
import server.models.users.etc.UserSvc;

import org.springframework.http.HttpMethod;

@SuppressFBWarnings({ "EI2", "EI" })
@Component
@RequiredArgsConstructor
public final class CommentsMdw extends BaseMdw {
  private final FeedSvc feedSvc;
  private final UserSvc userSvc;

  @Override
  public final Mono<Void> handle(Api api, WebFilterChain chain) {
    return matchPathAfterCutIdOut(api, chain, "/comments", HttpMethod.POST, () -> {
      return limit(api, 10, 15).then(withPathId(api).flatMap(feedbackId -> feedSvc.throwNotFound(feedbackId)))
          .then(
              checkBodyForm(api, CommentFormT.class).flatMap(typedForm -> userSvc.throwNotFound(typedForm.getUserId())))
          .then(chain.filter(api));
    });
  }
}
