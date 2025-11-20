package server.features.feedbacks.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.core.api.Api;
import server.decorators.types.Dict;
import server.models.feedbacks.Feedback;

@Service
@Transactional
@RequiredArgsConstructor
@SuppressFBWarnings({ "EI2", "EI" })
public class FeedLikeSvc {
  public Mono<Dict> main(Api api) {

    Feedback feed = (Feedback) api.getTypedData().orYell();
    return Mono.just(Dict.fromT(feed));
  }
}
