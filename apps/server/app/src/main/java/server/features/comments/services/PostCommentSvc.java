package server.features.comments.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.core.api.Api;
import server.decorators.types.Dict;

@Service
@Transactional
@RequiredArgsConstructor
@SuppressFBWarnings({ "EI2" })
public class PostCommentSvc {
  public Mono<Dict> main(Api api) {
    return Mono.just(Dict.of("aa", "bb"));
  }
}
