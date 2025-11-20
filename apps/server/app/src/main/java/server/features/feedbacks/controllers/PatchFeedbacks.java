package server.features.feedbacks.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.core.api.Api;
import server.decorators.core.res_api.ResAPI;
import server.features.feedbacks.services.FeedLikeSvc;

@SuppressFBWarnings({ "EI2" })
@Component
@RequiredArgsConstructor
public class PatchFeedbacks {
  private final FeedLikeSvc feedSvc;

  public Mono<ResponseEntity<ResAPI>> likeFeedback(Api api) {
    return feedSvc.main(api).flatMap(bool -> ResAPI.withStatus(200).msg("upvote added").build());
  }
}
