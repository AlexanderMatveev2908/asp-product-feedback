package server.models.images.etc;

import java.util.UUID;

import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

import reactor.core.publisher.Mono;
import server.models.images.Image;

@Repository
public interface ImageRepo extends ReactiveCrudRepository<Image, UUID> {
  @Query("""
      INSERT INTO images (public_id, url)
      VALUES (:#{#image.publicId}, :#{#image.url})
      RETURNING *
      """)
  public Mono<Image> insert(Image image);
}
