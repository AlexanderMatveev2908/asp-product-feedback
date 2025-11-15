package server.middleware.parsers;

import java.util.Map;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;

import reactor.core.publisher.Mono;
import server.decorators.Nullable;
import server.decorators.flow.api.Api;
import server.middleware.parsers.sub.ParserManager;

@Component
@Order(30)
public final class QueryParserMdw extends ParserManager implements WebFilter {

    @Override
    public final Mono<Void> filter(ServerWebExchange exc, WebFilterChain chain) {
        final Api api = (Api) exc;

        final String query = api.getQuery();
        final Nullable<Map<String, Object>> parsedQuery = nestDict(query);

        if (parsedQuery.isPresent())
            api.setParsedQueryAttr(parsedQuery.get());

        return chain.filter(api);
    }
}
