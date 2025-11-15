package server.middleware.dev;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;

import reactor.core.publisher.Mono;
import server.decorators.AppFile;
import server.decorators.Nullable;
import server.decorators.flow.api.Api;
import server.lib.data_structure.LibMemory;
import server.lib.data_structure.LibShape;
import server.lib.data_structure.prs.LibPrs;
import server.lib.dev.lib_log.LibLog;

@Component
@Order(100)
@SuppressWarnings({ "unchecked" })
public final class LogMdw implements WebFilter {

    @Override
    public final Mono<Void> filter(ServerWebExchange exc, WebFilterChain chain) {
        final Api api = (Api) exc;

        final Map<String, Object> arg = new LinkedHashMap<>();
        arg.put("url", api.getPath());
        arg.put("method", api.getMethod().toString());
        arg.put("accessToken", normalizeEmpty(api.getHeader("authorization")).get());
        arg.put("refreshToken", normalizeEmpty(api.getCookie("refreshToken")).get());
        arg.put("query", normalizeEmpty(api.getQuery()).get());
        arg.put("parsedQuery", api.getParsedQuery().orElse(null));
        arg.put("parsedForm", handleParsedForm(api).get());

        return api.getBdStr().defaultIfEmpty("").doOnNext(body -> {

            final Nullable<Object> norm = api.getContentType().contains("multipart/form-data") ? Nullable.asNone()
                    : normalizeEmpty(body);

            arg.put("body", LibShape.hasText(norm.get()) ? LibPrs.mapFromJson((String) norm.get()) : norm.get());

            LibLog.wOk(arg);
        }).then(chain.filter(api));

    }

    private final Nullable<Object> normalizeEmpty(Object obj) {
        if (LibShape.isNone(obj))
            return Nullable.asNone();

        if (obj instanceof final String str && !LibShape.hasText(str))
            return Nullable.asNone();
        if (obj instanceof final Map<?, ?> map && map.isEmpty())
            return Nullable.asNone();

        return Nullable.of(obj);
    }

    private final Nullable<Map<String, Object>> handleParsedForm(Api api) {
        final Nullable<Map<String, Object>> parsedForm = api.getParsedForm();
        if (parsedForm.isNone())
            return Nullable.asNone();

        final Map<String, Object> cpyForm = LibMemory.cpyMap(parsedForm.get());

        final Nullable<List<AppFile>> images = Nullable.of((List<AppFile>) cpyForm.get("images"));
        final Nullable<List<AppFile>> videos = Nullable.of((List<AppFile>) cpyForm.get("videos"));

        if (images.isPresent())
            cpyForm.put("images", images.get().stream().map(AppFile::getFancyShape).toList());

        if (videos.isPresent())
            cpyForm.put("videos", videos.get().stream().map(AppFile::getFancyShape).toList());

        return Nullable.of(cpyForm);
    }

}
