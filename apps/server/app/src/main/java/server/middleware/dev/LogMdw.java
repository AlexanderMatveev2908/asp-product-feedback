package server.middleware.dev;

import java.util.List;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;

import reactor.core.publisher.Mono;
import server.decorators.core.api.Api;
import server.decorators.types.AppFile;
import server.decorators.types.Dict;
import server.decorators.types.Nullable;
import server.lib.data_structure.prs.LibPrs;
import server.lib.dev.lib_log.LibLog;

@Component
@Order(100)
@SuppressWarnings({ "unchecked" })
public final class LogMdw implements WebFilter {

    @Override
    public final Mono<Void> filter(ServerWebExchange exc, WebFilterChain chain) {
        final Api api = (Api) exc;

        final Dict arg = new Dict();
        arg.put("url", api.getPath());
        arg.put("method", api.getMethod().toString());
        arg.put("accessToken", normalizeEmpty(api.getHeader("authorization")).orNone());
        arg.put("refreshToken", normalizeEmpty(api.getCookie("refreshToken")).orNone());
        arg.put("query", normalizeEmpty(api.getQuery()).orNone());
        arg.put("parsedQuery", api.getParsedQuery().orNone());
        arg.put("parsedForm", handleParsedForm(api).orNone());

        return api.getBdStr().defaultIfEmpty("").doOnNext(body -> {

            final Nullable<Object> norm = api.getContentType().contains("multipart/form-data") ? Nullable.asNone()
                    : normalizeEmpty(body);
            try {
                arg.put("body", norm.isPresent() ? LibPrs.dictFromJson((String) norm.orYell())
                        : norm.orNone());
            } catch (Exception err) {
                LibLog.stdErr("invalid body");
                arg.put("body", "👻 invalid client body");
                arg.put("wrongBody", norm.orNone());
            }

            LibLog.wOk(arg);
        }).then(chain.filter(api));

    }

    private final Nullable<Object> normalizeEmpty(Object obj) {
        Nullable<?> inst = Nullable.of(obj);

        if (inst.isNone() || (!inst.hasText() && !inst.hasListItems() && !inst.hasObjKeys()))
            return Nullable.asNone();

        return Nullable.of(obj);
    }

    private final Nullable<Dict> handleParsedForm(Api api) {
        final Nullable<Dict> parsedForm = api.getParsedForm();
        if (parsedForm.isNone())
            return Nullable.asNone();

        final Dict cpyForm = parsedForm.orYell().cpy();

        final Nullable<List<AppFile>> images = Nullable.of((List<AppFile>) cpyForm.get("images"));
        final Nullable<List<AppFile>> videos = Nullable.of((List<AppFile>) cpyForm.get("videos"));

        if (images.isPresent())
            cpyForm.put("images", images.orYell().stream().map(AppFile::getFancyShape).toList());

        if (videos.isPresent())
            cpyForm.put("videos", videos.orYell().stream().map(AppFile::getFancyShape).toList());

        return Nullable.of(cpyForm);
    }

}
