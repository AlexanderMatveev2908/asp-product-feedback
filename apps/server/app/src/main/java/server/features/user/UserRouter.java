package server.features.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.features.user.controllers.GetUser;
import server.router.RouterAPI;
import server.decorators.core.api.Api;
import server.decorators.core.res_api.ResAPI;

@SuppressFBWarnings({ "EI2", "EI" })
@RouterAPI("/api/v1/user")
@RequiredArgsConstructor
public class UserRouter {
  private final GetUser getCtrl;

  @GetMapping("/random")
  public Mono<ResponseEntity<ResAPI>> getRandUser(Api api) {
    return getCtrl.getRandUser(api);
  }
}
