package server.features.replies.middleware;

import org.springframework.stereotype.Component;
import org.springframework.web.server.WebFilterChain;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.core.api.Api;
import server.features.replies.paperwork.PostReplyFormT;
import server.middleware.base_mdw.BaseMdw;
import server.models.comments.etc.CommentSvc;
import server.models.users.etc.UserSvc;

import org.springframework.http.HttpMethod;

@SuppressFBWarnings({ "EI2", "EI" })
@Component
@RequiredArgsConstructor
public final class RepliesMdw extends BaseMdw {
  private final CommentSvc commentSvc;
  private final UserSvc userSvc;

  @Override
  public final Mono<Void> handle(Api api, WebFilterChain chain) {
    return matchPathAfterCutIdOut(api, chain, "/replies", HttpMethod.POST, () -> {
      return limit(api, 10, 15)
          .then(
              withPathId(api).flatMap(commentId -> commentSvc.throwNotFound(commentId)))
          .then(
              checkBodyForm(api, PostReplyFormT.class).flatMap(typedForm -> userSvc.throwNotFound(typedForm.getUserId())
                  .then(userSvc
                      .throwNotFound(typedForm.getReplyingTo()))))
          .then(chain.filter(api));
    });
  }
}
