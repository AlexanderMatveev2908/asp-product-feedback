package server.models.feedbacks.etc.types;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum FeedStatT {
  SUGGESTION("SUGGESTION"),
  PLANNED("PLANNED"),
  IN_PROGRESS("IN_PROGRESS"),
  LIVE("LIVE");

  private final String val;
}
