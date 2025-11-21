package server.features.replies.paperwork;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import server.paperwork.ContentFormT;

@Data
public final class PostReplyFormT implements ContentFormT {
  @NotNull(message = "replyingTo required")
  private UUID replyingTo;

  private String content;
}
