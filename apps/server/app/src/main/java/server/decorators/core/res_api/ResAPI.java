package server.decorators.core.res_api;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.Getter;
import reactor.core.publisher.Mono;
import server.decorators.core.ErrAPI;
import server.decorators.core.res_api.data_structure.ResApiJson;
import server.decorators.core.res_api.meta.MetaRes;
import server.decorators.types.Dict;
import server.decorators.types.Nullable;

@SuppressFBWarnings({ "EI" })
@Getter
@JsonSerialize(using = ResApiJson.class)
public final class ResAPI {
    private Nullable<String> msg = Nullable.asNone();
    private Integer status;
    private Nullable<Dict> data = Nullable.asNone();
    private final List<ResponseCookie> cookies = new ArrayList<>();
    private final List<ResponseCookie> deleteCookies = new ArrayList<>();

    public ResAPI(int status, String msg, Dict data) {
        this.status = status;
        this.msg = Nullable.of(msg);
        this.data = Nullable.of(data);
    }

    private ResAPI(int status) {
        this.status = status;
    }

    public static final ResAPI withStatus(int status) {
        return new ResAPI(status);
    }

    public final List<ResponseCookie> getCookies() {
        return List.copyOf(cookies);
    }

    public final ResAPI status(int status) {
        this.status = status;
        return this;
    }

    public final ResAPI msg(String msg) {
        this.msg = Nullable.of(msg);
        return this;
    }

    @SuppressWarnings("unchecked")
    public final ResAPI data(Object data) {
        if (data instanceof Nullable<?> inst) {
            Object inner = inst.orNone();
            if (inst.isNone() || inner instanceof Dict)
                this.data = (Nullable<Dict>) inst;
        } else if (data instanceof Dict inst)
            this.data = Nullable.of(inst);
        else
            throw new ErrAPI("passed invalid arg to ResApi builder => " + data);

        return this;
    }

    public final ResAPI cookie(ResponseCookie cookie) {
        this.cookies.add(cookie);
        return this;
    }

    public final ResAPI delCookie(ResponseCookie cookie) {
        this.deleteCookies.add(cookie);
        return this;
    }

    public final Mono<ResponseEntity<ResAPI>> build() {

        final ResponseEntity.BodyBuilder builder = ResponseEntity.status(status);
        for (final ResponseCookie cookie : cookies)
            builder.header(HttpHeaders.SET_COOKIE, cookie.toString());

        for (final ResponseCookie cookie : deleteCookies)
            builder.header(HttpHeaders.SET_COOKIE, cookie.toString());

        if (status == 204)
            return Mono.just(builder.build());

        final String prettyMsg = MetaRes.prettyMsg(msg, status);
        final ResAPI myRes = ResAPI.withStatus(status).msg(prettyMsg).data(data);

        return Mono.just(builder.body(myRes));
    }
}
