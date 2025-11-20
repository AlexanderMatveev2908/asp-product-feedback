package server.features.feedbacks.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.core.api.Api;
import server.models.feedbacks.Feedback;
import server.models.feedbacks.etc.FeedSvc;

@Service
@Transactional
@RequiredArgsConstructor
@SuppressFBWarnings({ "EI2", "EI" })
public class FeedLikeSvc {
  private final FeedSvc feedSvc;

  public Mono<Boolean> main(Api api) {

    Feedback feed = (Feedback) api.getTypedData().orYell();
    return feedSvc.like(feed.getId());
  }
}
