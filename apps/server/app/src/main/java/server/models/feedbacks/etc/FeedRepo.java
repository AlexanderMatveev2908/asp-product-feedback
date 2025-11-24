package server.models.feedbacks.etc;

import java.util.UUID;

import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

import reactor.core.publisher.Mono;
import server.features.feedbacks.paperwork.PutFeedFormT;
import server.models.feedbacks.Feedback;

@Repository
public interface FeedRepo extends ReactiveCrudRepository<Feedback, UUID> {

  @Query("""
      INSERT INTO feedbacks (title, description, category, status)
      VALUES (:#{#feedback.title}, :#{#feedback.description}, CAST(:#{#feedback.category} AS category_type), CAST(:#{#feedback.status} AS status_type))
      RETURNING *
      """)
  public Mono<Feedback> insert(Feedback feedback);

  @Query("""
      UPDATE feedbacks
      SET upvotes = upvotes + 1
        WHERE id = :feedbackId
        RETURNING TRUE
      """)
  public Mono<Boolean> like(UUID feedbackId);

  @Query("""
      UPDATE feedbacks
      SET title = :#{#form.title},
        category = CAST(:#{#form.category} AS category_type),
        status = CAST(:#{#form.status} AS status_type),
        description = :#{#form.content}
      WHERE id = :feedbackId
      RETURNING *
      """)
  public Mono<Feedback> update(PutFeedFormT form, UUID feedbackId);

  @Query("""
      DELETE FROM feedbacks
      WHERE id = :feedbackId
      RETURNING 1
      """)
  public Mono<Integer> delById(UUID feedbackId);
}