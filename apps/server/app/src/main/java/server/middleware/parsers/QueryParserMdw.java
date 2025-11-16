package server.middleware.parsers;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;

import reactor.core.publisher.Mono;
import server.decorators.core.api.Api;
import server.decorators.types.Dict;
import server.decorators.types.Nullable;
import server.middleware.parsers.sub.ParserManager;

@Component
@Order(30)
public final class QueryParserMdw extends ParserManager implements WebFilter {

    @Override
    public final Mono<Void> filter(ServerWebExchange exc, WebFilterChain chain) {
        final Api api = (Api) exc;

        final String query = api.getQuery();
        final Nullable<Dict> parsedQuery = nestDict(query);

        if (parsedQuery.isPresent())
            api.setParsedQueryAttr(parsedQuery.orYell());

        return chain.filter(api);
    }
}
