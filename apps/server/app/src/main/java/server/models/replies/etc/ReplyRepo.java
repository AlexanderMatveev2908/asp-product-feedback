package server.models.replies.etc;

import java.util.UUID;

import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

import reactor.core.publisher.Mono;
import server.models.replies.Reply;

@Repository
public interface ReplyRepo extends ReactiveCrudRepository<Reply, UUID> {

  @Query("""
      INSERT INTO replies (content, user_id, replying_to_id, comment_id)
      VALUES (:#{#reply.content}, :#{#reply.userId}, :#{#reply.replyingToId}, :#{#reply.commentId})
      RETURNING *
      """)
  public Mono<Reply> insert(Reply reply);
}
