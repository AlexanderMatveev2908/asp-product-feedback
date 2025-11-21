package server.features.comments.paperwork;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import server.paperwork.Reg;

@Data
public final class CommentFormT {
  @NotBlank(message = "content required")
  @Size(max = 250, message = "max length exceeded")
  @Pattern(regexp = Reg.TXT, message = "content invalid")
  private String content;

  @NotNull(message = "user id required")
  private UUID userId;
}
