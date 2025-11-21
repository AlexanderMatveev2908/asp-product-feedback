package server.features.feedbacks.paperwork;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import server.models.feedbacks.etc.types.FeedStatT;
import server.paperwork.enums.enum_match.EnumMatch;

@Data
@EqualsAndHashCode(callSuper = true)
public class PutFeedFormT extends PostFeedFormT {
  @NotNull(message = "status required")
  @EnumMatch(enumTarget = FeedStatT.class, message = "status invalid")
  private FeedStatT status;
}
