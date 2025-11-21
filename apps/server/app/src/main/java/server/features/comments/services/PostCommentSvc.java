package server.features.comments.services;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.core.api.Api;
import server.decorators.types.Dict;
import server.features.comments.paperwork.CommentFormT;
import server.models.comments.Comment;
import server.models.comments.etc.CommentSvc;

@Service
@Transactional
@RequiredArgsConstructor
@SuppressFBWarnings({ "EI2" })
public class PostCommentSvc {
  private final CommentSvc commentSvc;

  public Mono<Dict> main(Api api) {
    final UUID feedbackId = api.getPathVarIdInRoute("feedbackId").orYell();
    final CommentFormT form = (CommentFormT) api.getTypedData().orYell();
    final Comment newComment = new Comment(form.getContent(), form.getUserId(), feedbackId);

    return commentSvc.insert(newComment).map(created -> Dict.of("comment", created));
  }
}
