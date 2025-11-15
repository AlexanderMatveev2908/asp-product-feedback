package server.features.test.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.flow.api.Api;
import server.decorators.flow.res_api.ResAPI;

@Component
@RequiredArgsConstructor
public class GetTestCtrl {

    public final Mono<ResponseEntity<ResAPI>> getLimited(Api api) {
        return ResAPI.withStatus(200).msg("get request limited 🚦").build();
    }

    public final Mono<ResponseEntity<ResAPI>> getTest(Api api) {
        return ResAPI.withStatus(200).msg("get request received 👻").build();
    }

}
