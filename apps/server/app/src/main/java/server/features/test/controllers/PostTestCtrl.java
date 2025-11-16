package server.features.test.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.type.TypeReference;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.core.ErrAPI;
import server.decorators.core.api.Api;
import server.decorators.core.res_api.ResAPI;
import server.decorators.types.Dict;
import server.features.test.services.PostFormSvc;
import server.lib.data_structure.LibShape;

@Component
@RequiredArgsConstructor
public class PostTestCtrl {
    private final PostFormSvc postFormSvc;

    public final Mono<ResponseEntity<ResAPI>> postMsg(Api api) {
        return api.getBd(new TypeReference<Dict>() {
        }).flatMap(bd -> {
            final Object msg = bd.get("msg");

            if (!LibShape.hasText(msg))
                return ResAPI.withStatus(400).msg("missing msg").build();

            return ResAPI.withStatus(200).msg("msg received").data(Dict.of("clientMsg", msg)).build();
        }).switchIfEmpty(Mono.error(new ErrAPI("missing msg", 400)));
    }

    public final Mono<ResponseEntity<ResAPI>> postFormData(Api api) {
        return postFormSvc.postForm(api).flatMap(tpl -> {
            return ResAPI.withStatus(200).msg(
                    "form parsed • processed • saved locally • uploaded on cloud • deleted locally • deleted from cloud")
                    .data(Dict.of("saved", tpl.getT1(), "deleted", tpl.getT2())).build();
        });
    }

}
