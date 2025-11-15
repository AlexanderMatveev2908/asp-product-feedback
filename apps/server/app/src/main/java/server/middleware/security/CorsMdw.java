package server.middleware.security;

import java.util.Map;

import org.springframework.core.annotation.Order;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;

import com.fasterxml.jackson.core.JsonProcessingException;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.conf.env_vars.EnvVars;
import server.decorators.flow.ErrAPI;
import server.decorators.flow.api.Api;
import server.lib.data_structure.Jack;
import server.lib.data_structure.prs.LibPrs;
import server.lib.dev.lib_log.LibLog;

@Component
@Order(10)
@RequiredArgsConstructor
@SuppressFBWarnings({ "EI2", "EI" })
public final class CorsMdw implements WebFilter {
    private final EnvVars envKeeper;

    @Override
    public final Mono<Void> filter(ServerWebExchange exc, WebFilterChain chain) {
        final Api api = (Api) exc;
        final ServerHttpResponse res = api.getResponse();

        final String origin = api.getHeader(HttpHeaders.ORIGIN);
        final String allowed = envKeeper.getFrontUrl();

        if (!origin.isBlank() && !origin.startsWith(allowed))
            return writeForbidden(res, origin);

        setCorsHeaders(res, allowed);

        if (HttpMethod.OPTIONS.equals(api.getMethod())) {
            res.setStatusCode(HttpStatus.OK);
            return res.setComplete();
        }

        return chain.filter(api);
    }

    private final Mono<Void> writeForbidden(ServerHttpResponse res, String origin) {
        res.setStatusCode(HttpStatus.FORBIDDEN);
        res.getHeaders().setContentType(MediaType.APPLICATION_JSON);

        final String msg = String.format("❌ %s not allowed ⚔️", origin);
        LibLog.log(msg);

        final String body;
        try {
            body = Jack.mapper.writeValueAsString(Map.of("msg", msg, "status", 403));
        } catch (JsonProcessingException err) {
            throw new ErrAPI("err writing json for cors response");
        }

        final DataBuffer buff = res.bufferFactory().wrap(LibPrs.binaryFromUtf8(body));
        return res.writeWith(Mono.just(buff));
    }

    private final void setCorsHeaders(ServerHttpResponse res, String allowed) {
        final String allowedHdr = "Origin, Content-Type, Accept, Authorization";

        final HttpHeaders resHdr = res.getHeaders();
        resHdr.set(HttpHeaders.ACCESS_CONTROL_ALLOW_HEADERS, allowedHdr);
        resHdr.set(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, allowed);
        resHdr.set(HttpHeaders.ACCESS_CONTROL_ALLOW_METHODS, "GET, POST, PUT, PATCH, DELETE, OPTIONS");
        resHdr.set(HttpHeaders.ACCESS_CONTROL_ALLOW_CREDENTIALS, "true");
    }
}
