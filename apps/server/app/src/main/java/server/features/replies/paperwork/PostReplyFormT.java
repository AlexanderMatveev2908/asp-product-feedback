package server.features.replies.paperwork;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import server.features.comments.paperwork.CommentFormT;

@Data
@EqualsAndHashCode(callSuper = true)
public final class PostReplyFormT extends CommentFormT {
  @NotNull(message = "replyingToId required")
  private UUID replyingToId;

}
