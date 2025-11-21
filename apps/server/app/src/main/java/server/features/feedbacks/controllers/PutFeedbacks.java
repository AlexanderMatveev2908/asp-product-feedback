package server.features.feedbacks.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.core.api.Api;
import server.decorators.core.res_api.ResAPI;
import server.features.feedbacks.services.FeedPutSvc;

@SuppressFBWarnings({ "EI2" })
@Component
@RequiredArgsConstructor
public class PutFeedbacks {
  private final FeedPutSvc feedSvc;

  public final Mono<ResponseEntity<ResAPI>> putFeedback(Api api) {
    return feedSvc.main(api).flatMap(dict -> ResAPI.withStatus(200).data(dict).build());
  }
}
