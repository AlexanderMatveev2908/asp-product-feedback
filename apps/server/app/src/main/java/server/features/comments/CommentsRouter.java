package server.features.comments;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.features.comments.controllers.PostComments;
import server.router.RouterAPI;
import server.decorators.core.api.Api;
import server.decorators.core.res_api.ResAPI;

@SuppressFBWarnings({ "EI2", "EI" })
@RouterAPI("/api/v1/comments")
@RequiredArgsConstructor
public final class CommentsRouter {
  private final PostComments postCtrl;

  @PostMapping("/{feedbackId}")
  public final Mono<ResponseEntity<ResAPI>> postComment(Api api) {

    return postCtrl.postComment(api);
  }

}
