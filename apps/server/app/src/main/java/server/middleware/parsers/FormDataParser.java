package server.middleware.parsers;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;

import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;
import server.conf.cloud.etc.data_structure.CloudResourceT;
import server.decorators.core.api.Api;
import server.decorators.types.AppFile;
import server.decorators.types.Dict;
import server.decorators.types.Nullable;
import server.middleware.parsers.sub.ParserManager;

@Component
@Order(20)
public final class FormDataParser extends ParserManager implements WebFilter {

    @Override
    public final Mono<Void> filter(ServerWebExchange exc, WebFilterChain chain) {
        final var api = (Api) exc;

        return splitParts(api).flatMap(parts -> {
            final CtxParse ctx = new CtxParse();
            Arrays.stream(parts).forEach(prt -> handlePart(prt, ctx));

            if (ctx.sb.length() > 0)
                ctx.sb.setLength(ctx.sb.length() - 1);

            final Nullable<Dict> parsedForm = nestDict(ctx.sb.toString());

            if (parsedForm.isPresent()) {
                final Dict mappedForm = parsedForm.orYell();
                mappedForm.put("images", ctx.images);
                mappedForm.put("videos", ctx.videos);
                api.setParsedFormAttr(mappedForm);
            }

            return Mono.when(ctx.promises.isEmpty() ? Mono.empty() : Mono.when(ctx.promises)).then(chain.filter(api));

        }).switchIfEmpty(Mono.defer(() ->
        // ? flatMap above will fallback in this block if
        // ? • no form data => all ok as usual
        // ? • form actually exists but returning Mono.empty() or Mono<Void> trigger
        // ? flatMap to fallback to another Publisher
        api.isResCmt() ? Mono.empty() : chain.filter(api)));
    }

    private final Mono<String[]> splitParts(Api api) {
        final String contentType = api.getContentType();
        if (!contentType.startsWith("multipart/form-data"))
            return Mono.empty();

        final String boundary = "--" + contentType.split("boundary=")[1];

        return api.getRawBd().flatMap(raw -> {
            if (raw.length == 0)
                return Mono.empty();

            final String txtBody = new String(raw, StandardCharsets.ISO_8859_1);
            return Mono.just(txtBody.split(Pattern.quote(boundary)));
        });
    }

    private final void handlePart(String prt, CtxParse ctx) {
        final String[] headerAndBody = prt.split("\r\n\r\n", 2);
        if (headerAndBody.length < 2)
            return;

        final CtxPart part = new CtxPart(headerAndBody[0], headerAndBody[1]);
        if (part.name.isNone())
            return;

        if (part.headers.contains("filename=")) {
            handleAssetPart(part, ctx);
        } else {
            final String val = new String(part.body.getBytes(StandardCharsets.ISO_8859_1), StandardCharsets.UTF_8)
                    .trim();
            ctx.sb.append(URLEncoder.encode(part.name.orYell(), StandardCharsets.UTF_8)).append("=")
                    .append(URLEncoder.encode(val, StandardCharsets.UTF_8)).append("&");
        }
    }

    private final void handleAssetPart(CtxPart part, CtxParse ctx) {
        final CloudResourceT resourceT;
        try {
            resourceT = CloudResourceT.fromFileField(part.name.orYell());
        } catch (Exception err) {
            return;
        }

        handleAsset(part, resourceT).ifPresent(asset -> {
            final Mono<Void> prm = Mono.<Void>fromRunnable(asset::saveLocally).subscribeOn(Schedulers.boundedElastic());

            ctx.promises.add(prm);

            if (resourceT.isImage())
                ctx.images.add(asset);
            else
                ctx.videos.add(asset);
        });
    }

    private static final Nullable<AppFile> handleAsset(CtxPart part, CloudResourceT resourceT) {
        final Nullable<String> filename = findPattern("filename", part.headers);
        if (filename.isNone())
            return Nullable.asNone();

        final Matcher cm = Pattern.compile("Content-Type: (.+)").matcher(part.headers);
        final Nullable<String> contentTypePart = cm.find() ? Nullable.of(cm.group(1).trim()) : Nullable.asNone();
        if (contentTypePart.isNone())
            return Nullable.asNone();

        final Nullable<byte[]> rawFile = Nullable.of(part.body.getBytes(StandardCharsets.ISO_8859_1));
        return Nullable
                .of(new AppFile(resourceT, filename.orYell(), contentTypePart, rawFile));
    }

    public static final Nullable<String> findPattern(String key, String headers) {
        final Matcher m = Pattern.compile(String.format("%s=\"([^\"]+)\"", Pattern.quote(key))).matcher(headers);
        return !m.find() ? Nullable.asNone() : Nullable.of(m.group(1));
    }
}

class CtxParse {
    public final StringBuilder sb = new StringBuilder();
    public final List<AppFile> images = new ArrayList<>();
    public final List<AppFile> videos = new ArrayList<>();
    public final List<Mono<Void>> promises = new ArrayList<>();

}

class CtxPart {
    public final String headers;
    public final String body;
    public final Nullable<String> name;

    CtxPart(String headers, String body) {
        this.headers = headers;
        this.body = body;
        this.name = FormDataParser.findPattern("name", headers);
    }
}
