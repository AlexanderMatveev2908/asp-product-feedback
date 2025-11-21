package server.features.comments.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.core.api.Api;
import server.decorators.core.res_api.ResAPI;
import server.features.comments.services.PostCommentSvc;

@SuppressFBWarnings({ "EI2", "EI" })
@Component
@RequiredArgsConstructor
public final class PostComments {
  private final PostCommentSvc commentSvc;

  public final Mono<ResponseEntity<ResAPI>> postComment(Api api) {
    return commentSvc.main(api).flatMap(
        dict -> ResAPI.withStatus(200).data(dict).build());
  }
}
