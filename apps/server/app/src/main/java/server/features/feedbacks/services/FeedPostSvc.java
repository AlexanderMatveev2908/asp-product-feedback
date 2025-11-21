package server.features.feedbacks.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.core.api.Api;
import server.decorators.types.Dict;
import server.features.feedbacks.paperwork.PostFeedFormT;
import server.models.feedbacks.Feedback;
import server.models.feedbacks.etc.FeedSvc;

@Service
@Transactional
@RequiredArgsConstructor
@SuppressFBWarnings({ "EI2", "EI" })
public class FeedPostSvc {
  private final FeedSvc feedSvc;

  public Mono<Dict> main(Api api) {
    final PostFeedFormT form = (PostFeedFormT) api.getTypedData().orYell();
    final Feedback newFeed = new Feedback(form.getTitle(), form.getContent(), form.getCategory());

    return feedSvc.insert(newFeed).map(created -> Dict.of("feedback", created));

  }
}
