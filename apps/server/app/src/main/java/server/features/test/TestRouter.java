package server.features.test;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.flow.api.Api;
import server.decorators.flow.res_api.ResAPI;
import server.features.test.controllers.GetTestCtrl;
import server.features.test.controllers.PostTestCtrl;
import server.router.RouterAPI;

@RouterAPI("/api/v1/test")
@RequiredArgsConstructor
public class TestRouter {

    private final PostTestCtrl postCtrl;
    private final GetTestCtrl getCtrl;

    @GetMapping("/limited")
    public final Mono<ResponseEntity<ResAPI>> getLimited(Api api) {
        return getCtrl.getLimited(api);
    }

    @GetMapping
    public final Mono<ResponseEntity<ResAPI>> getTest(Api api) {
        return getCtrl.getTest(api);
    }

    @PostMapping
    public final Mono<ResponseEntity<ResAPI>> postMsg(Api api) {
        return postCtrl.postMsg(api);
    }

    @PostMapping("/form-data")
    public final Mono<ResponseEntity<ResAPI>> postFormData(Api api) {
        return postCtrl.postFormData(api);
    }
}
