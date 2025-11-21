package server.features.replies.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.core.api.Api;
import server.decorators.core.res_api.ResAPI;
import server.features.replies.services.PostReplySvc;

@SuppressFBWarnings({ "EI2", "EI" })
@Component
@RequiredArgsConstructor
public final class PostReplies {
  private final PostReplySvc replySvc;

  public final Mono<ResponseEntity<ResAPI>> postReply(Api api) {
    return replySvc.main(api).flatMap(dict -> ResAPI.withStatus(200).data(dict).build());
  }
}
