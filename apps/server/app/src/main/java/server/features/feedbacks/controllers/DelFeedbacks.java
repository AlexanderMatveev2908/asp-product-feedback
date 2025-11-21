package server.features.feedbacks.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.core.api.Api;
import server.decorators.core.res_api.ResAPI;
import server.features.feedbacks.services.FeedDelSvc;

@SuppressFBWarnings({ "EI2" })
@Component
@RequiredArgsConstructor
public class DelFeedbacks {
  private final FeedDelSvc feedSvc;

  public final Mono<ResponseEntity<ResAPI>> delByById(Api api) {
    return feedSvc.main(api).flatMap(dict -> ResAPI.withStatus(200).data(dict).build());
  }
}
