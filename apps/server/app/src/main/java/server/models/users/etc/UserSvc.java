package server.models.users.etc;

import java.util.UUID;

import org.springframework.stereotype.Service;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.models.users.User;

@Service
@SuppressFBWarnings({ "EI2", "EI" })
@RequiredArgsConstructor
public final class UserSvc {
  private final UserRepo userRepo;

  public final Mono<User> insert(User user) {
    return userRepo.insert(user);
  }

  public final Mono<User> byId(UUID id) {
    return userRepo.findById(id);
  }

  public final Mono<User> byUsername(String arg) {
    return userRepo.byUsername(arg);
  }
}
