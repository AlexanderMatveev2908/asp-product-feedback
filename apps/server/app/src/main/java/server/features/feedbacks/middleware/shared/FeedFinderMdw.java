package server.features.feedbacks.middleware.shared;

import java.util.UUID;

import reactor.core.publisher.Mono;
import server.decorators.core.ErrAPI;
import server.models.feedbacks.Feedback;
import server.models.feedbacks.etc.FeedSvc;

public interface FeedFinderMdw {

  public abstract FeedSvc getFeedSvc();

  default Mono<Feedback> throwOn404(Mono<UUID> monoId) {
    return monoId.flatMap(
        feedbackId -> getFeedSvc().byId(feedbackId).switchIfEmpty(Mono.error(new ErrAPI("feedback not found", 404))));
  }
}
