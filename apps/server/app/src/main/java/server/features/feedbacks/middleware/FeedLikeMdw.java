package server.features.feedbacks.middleware;

import org.springframework.stereotype.Component;
import org.springframework.web.server.WebFilterChain;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.core.ErrAPI;
import server.decorators.core.api.Api;
import server.middleware.base_mdw.BaseMdw;
import server.models.feedbacks.etc.FeedSvc;

import org.springframework.http.HttpMethod;
import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;

@Component
@RequiredArgsConstructor
@SuppressFBWarnings({ "EI2" })
public class FeedLikeMdw extends BaseMdw {
  private final FeedSvc feedSvc;

  @Override
  public Mono<Void> handle(Api api, WebFilterChain chain) {
    return matchPathAfterCutIdOut(api, chain, "/feedbacks/like", HttpMethod.PATCH, () -> {
      return limit(api, 30, 30).then(withPathId(api).flatMap(id -> {
        return feedSvc.byId(id).switchIfEmpty(
            Mono.error(new ErrAPI("feedback not found", 404))).flatMap(found -> {
              api.setTypedDataAttr(found);
              return chain.filter(api);
            });
      }));
    });
  }
}