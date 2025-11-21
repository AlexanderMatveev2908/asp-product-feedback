package server.features.feedbacks.services;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.core.api.Api;
import server.decorators.types.Dict;
import server.features.feedbacks.paperwork.PutFeedFormT;
import server.models.feedbacks.etc.FeedSvc;

@Service
@Transactional
@RequiredArgsConstructor
@SuppressFBWarnings({ "EI2", "EI" })
public class FeedPutSvc {
  private final FeedSvc feedSvc;

  public Mono<Dict> main(Api api) {
    final UUID feedbackId = api.getPathVarIdInRoute("feedbackId").orYell();
    final PutFeedFormT form = (PutFeedFormT) api.getTypedData().orYell();

    return feedSvc.update(form, feedbackId).map(updated -> Dict.of("feedback", updated));
  }
}
