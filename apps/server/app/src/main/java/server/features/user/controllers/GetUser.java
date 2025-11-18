package server.features.user.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.core.api.Api;
import server.decorators.core.res_api.ResAPI;
import server.features.user.services.UserRandSvc;

@SuppressFBWarnings({ "EI2", "EI" })
@Component
@RequiredArgsConstructor
public class GetUser {

  private final UserRandSvc userRandSvc;

  public Mono<ResponseEntity<ResAPI>> getRandUser(Api api) {
    return userRandSvc.main(api).flatMap(dict -> ResAPI.withStatus(200).data(dict).build());
  }
}
