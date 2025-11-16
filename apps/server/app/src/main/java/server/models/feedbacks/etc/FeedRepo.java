package server.models.feedbacks.etc;

import java.util.UUID;

import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

import reactor.core.publisher.Mono;
import server.models.feedbacks.Feedback;

@Repository
public interface FeedRepo extends ReactiveCrudRepository<Feedback, UUID> {

  @Query("""
      INSERT INTO feedbacks (title, description, category, status)
      VALUES (:#{#feedback.title}, :#{#feedback.description}, CAST(:#{#feedback.category.getVal()} AS category_type), CAST(:#{#feedback.status.getVal()} AS status_type))
      RETURNING *
      """)
  public Mono<Feedback> insert(Feedback feedback);
}