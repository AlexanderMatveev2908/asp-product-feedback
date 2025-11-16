package server.models.feedbacks.etc;

import java.util.UUID;

import org.springframework.stereotype.Service;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.models.feedbacks.Feedback;

@Service
@SuppressFBWarnings({ "EI2", "EI" })
@RequiredArgsConstructor
public class FeedbackSvc {
  private final FeedRepo feedRepo;

  public final Mono<Feedback> insert(Feedback feedback) {
    return feedRepo.insert(feedback);
  }

  public final Mono<Feedback> byId(UUID id) {
    return feedRepo.findById(id);
  }
}