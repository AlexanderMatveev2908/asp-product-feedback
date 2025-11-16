package server.models.comments.etc;

import java.util.UUID;

import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

import reactor.core.publisher.Mono;
import server.models.comments.Comment;

@Repository
public interface CommentRepo extends ReactiveCrudRepository<Comment, UUID> {

  @Query("""
      INSERT INTO comments (content, user_id, feedback_id)
      VALUES (:#{#comment.content}, :#{#comment.userId}, :#{#comment.feedbackId})
      RETURNING *
      """)
  public Mono<Comment> insert(Comment comment);
}