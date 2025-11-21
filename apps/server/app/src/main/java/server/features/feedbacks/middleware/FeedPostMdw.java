package server.features.feedbacks.middleware;

import org.springframework.stereotype.Component;
import org.springframework.web.server.WebFilterChain;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.core.api.Api;
import server.features.feedbacks.paperwork.PostFeedFormT;
import server.middleware.base_mdw.BaseMdw;
import org.springframework.http.HttpMethod;
import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;

@Component
@RequiredArgsConstructor
@SuppressFBWarnings({ "EI2" })
public class FeedPostMdw extends BaseMdw {

  @Override
  public final Mono<Void> handle(Api api, WebFilterChain chain) {
    return isTarget(api, chain, "/feedbacks", HttpMethod.POST, () -> {
      return limit(api, 10, 15).then(checkBodyForm(api, PostFeedFormT.class).then(chain.filter(api)));
    });
  }
}