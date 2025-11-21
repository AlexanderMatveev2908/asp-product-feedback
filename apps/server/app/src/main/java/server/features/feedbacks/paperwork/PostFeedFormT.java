package server.features.feedbacks.paperwork;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import server.models.feedbacks.etc.types.FeedCatT;
import server.paperwork.Reg;
import server.paperwork.enums.enum_match.EnumMatch;

@Data
public class PostFeedFormT {
  @NotBlank(message = "title required")
  @Pattern(regexp = Reg.TXT, message = "title invalid")
  @Size(max = 100, message = "max length exceeded")
  private String title;

  @NotNull(message = "category required")
  @EnumMatch(enumTarget = FeedCatT.class, message = "category invalid")
  private FeedCatT category;

  @NotBlank(message = "content required")
  @Pattern(regexp = Reg.TXT, message = "content invalid")
  @Size(max = 1000, message = "max length exceeded")
  private String content;
}
