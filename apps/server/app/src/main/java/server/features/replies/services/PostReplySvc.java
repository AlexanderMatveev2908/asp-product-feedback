package server.features.replies.services;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.core.api.Api;
import server.decorators.types.Dict;
import server.features.replies.paperwork.PostReplyFormT;
import server.models.replies.Reply;
import server.models.replies.etc.ReplySvc;

@Service
@Transactional
@RequiredArgsConstructor
@SuppressFBWarnings({ "EI2", "EI" })
public class PostReplySvc {
  private final ReplySvc replySvc;

  public Mono<Dict> main(Api api) {
    final PostReplyFormT form = (PostReplyFormT) api.getTypedData().orYell();
    final UUID commentId = api.getPathVarIdInRoute("commentId").orYell();
    final Reply newReply = new Reply(form.getUserId(), form.getReplyingTo(), commentId, form.getContent());

    return replySvc.insert(newReply).map(created -> Dict.of("reply", created));
  }
}
