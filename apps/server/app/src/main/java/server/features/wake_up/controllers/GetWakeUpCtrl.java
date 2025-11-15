package server.features.wake_up.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import reactor.core.publisher.Mono;
import server.decorators.flow.res_api.ResAPI;

@Component
public class GetWakeUpCtrl {

    public final Mono<ResponseEntity<ResAPI>> wakeUp() {
        return ResAPI.withStatus(200).msg("ops I did not listen the alarm ⏰").build();
    }
}
