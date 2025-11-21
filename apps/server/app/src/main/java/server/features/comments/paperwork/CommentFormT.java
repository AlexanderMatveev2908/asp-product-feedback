package server.features.comments.paperwork;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import server.paperwork.ContentFormT;

@Data
public final class CommentFormT implements ContentFormT {
  private String content;

  @NotNull(message = "user id required")
  private UUID userId;
}
