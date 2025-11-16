package server.models.feedbacks.etc.types;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum FeedStatT {
  SUGGESTION("suggestion"),
  PLANNED("planned"),
  IN_PROGRESS("in_progress"),
  LIVE("live");

  private final String val;
}
