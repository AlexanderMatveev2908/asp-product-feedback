package server.features.replies;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.features.replies.controllers.PostReplies;
import server.router.RouterAPI;
import server.decorators.core.api.Api;
import server.decorators.core.res_api.ResAPI;

@SuppressFBWarnings({ "EI2", "EI" })
@RouterAPI("/api/v1/replies")
@RequiredArgsConstructor
@SuppressWarnings({ "unused", })
public final class RepliesRouter {
  private final PostReplies postCtrl;

  @PostMapping("/{commentId}")
  public final Mono<ResponseEntity<ResAPI>> postReply(Api api) {
    return postCtrl.postReply(api);
  }
}
