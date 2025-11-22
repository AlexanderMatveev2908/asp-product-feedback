package server.models.replies.etc;

import java.util.UUID;

import org.springframework.stereotype.Service;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.core.ErrAPI;
import server.models.replies.Reply;

@Service
@SuppressFBWarnings({ "EI2", "EI" })
@RequiredArgsConstructor
public final class ReplySvc {
  private final ReplyRepo replyRepo;

  public final Mono<Reply> insert(Reply reply) {
    return replyRepo.insert(reply);
  }

  public final Mono<Reply> byId(UUID id) {
    return replyRepo.findById(id);
  }

  public final Mono<Reply> throwNotFound(UUID id) {
    return byId(id).switchIfEmpty(Mono.error(new ErrAPI("reply not found", 404)));
  }
}