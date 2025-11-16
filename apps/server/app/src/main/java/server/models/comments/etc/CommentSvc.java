package server.models.comments.etc;

import java.util.UUID;

import org.springframework.stereotype.Service;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.models.comments.Comment;

@Service
@SuppressFBWarnings({ "EI2", "EI" })
@RequiredArgsConstructor
public class CommentSvc {
  private final CommentRepo commentRepo;

  public final Mono<Comment> insert(Comment comment) {
    return commentRepo.insert(comment);
  }

  public final Mono<Comment> byId(UUID id) {
    return commentRepo.findById(id);
  }
}