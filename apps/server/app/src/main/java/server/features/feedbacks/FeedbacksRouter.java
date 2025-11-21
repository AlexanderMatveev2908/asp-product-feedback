package server.features.feedbacks;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.features.feedbacks.controllers.GetFeedbacks;
import server.features.feedbacks.controllers.PostFeedbacks;
import server.features.feedbacks.controllers.PutFeedbacks;
import server.features.feedbacks.controllers.PatchFeedbacks;
import server.features.feedbacks.controllers.DelFeedbacks;
import server.router.RouterAPI;
import server.decorators.core.api.Api;
import server.decorators.core.res_api.ResAPI;

@SuppressFBWarnings({ "EI2", "EI" })
@RouterAPI("/api/v1/feedbacks")
@RequiredArgsConstructor
@SuppressWarnings({ "unused" })
public class FeedbacksRouter {
  private final GetFeedbacks getCtrl;
  private final PostFeedbacks postCtrl;
  private final PutFeedbacks putCtrl;
  private final PatchFeedbacks patchCtrl;
  private final DelFeedbacks delCtrl;

  @GetMapping
  public final Mono<ResponseEntity<ResAPI>> readAllFeedbacks(Api api) {
    return getCtrl.readAllFeedbacks(api);
  }

  @PatchMapping("/like/{feedbackId}")
  public final Mono<ResponseEntity<ResAPI>> likeFeedback(Api api) {
    return patchCtrl.likeFeedback(api);
  }

  @PostMapping
  public final Mono<ResponseEntity<ResAPI>> postFeedback(Api api) {
    return postCtrl.postFeedback(api);
  }

  @PutMapping("/{feedbackId}")
  public final Mono<ResponseEntity<ResAPI>> putFeedback(Api api) {
    return putCtrl.putFeedback(api);
  }

}
