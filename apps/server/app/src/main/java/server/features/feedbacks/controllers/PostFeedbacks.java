package server.features.feedbacks.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.core.api.Api;
import server.decorators.core.res_api.ResAPI;

@SuppressFBWarnings({ "EI2" }) 
@Component 
@RequiredArgsConstructor
public class PostFeedbacks {

  public Mono<ResponseEntity<ResAPI>> example(Api api) {
    return ResAPI.withStatus(200).msg("Post Feedbacks endpoint").build();
  }
}
