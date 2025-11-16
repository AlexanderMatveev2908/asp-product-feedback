package server.models.feedbacks.etc.types;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import server.decorators.core.ErrAPI;

@RequiredArgsConstructor
@Getter
public enum FeedStatT {
  SUGGESTION("SUGGESTION"),
  PLANNED("PLANNED"),
  IN_PROGRESS("IN_PROGRESS"),
  LIVE("LIVE");

  private final String val;

  public static final FeedStatT fromVal(String dbEnum) {
    for (var v : values())
      if (v.val.equals(dbEnum))
        return v;

    throw new ErrAPI("unknown arg val => " + dbEnum);
  }
}
