package server.models.users.etc;

import java.util.UUID;

import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

import reactor.core.publisher.Mono;
import server.models.users.User;

@Repository
public interface UserRepo extends ReactiveCrudRepository<User, UUID> {
  @Query("""
      INSERT INTO users (name, username)
      VALUES (:#{#user.name}, :#{#user.username})
      RETURNING *
      """)
  public Mono<User> insert(User user);

  @Query("""
      SELECT * FROM users
      WHERE username = :username
      LIMIT 1
      """)
  public Mono<User> byUsername(String username);
}
