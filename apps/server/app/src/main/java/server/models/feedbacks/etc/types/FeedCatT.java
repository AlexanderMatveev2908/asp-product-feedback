package server.models.feedbacks.etc.types;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import server.decorators.core.ErrAPI;

@RequiredArgsConstructor
@Getter
public enum FeedCatT {
  UI("UI"),
  UX("UX"),
  FEATURE("FEATURE"),
  ENHANCEMENT("ENHANCEMENT"),
  BUG("BUG");

  private final String val;

  public static final FeedCatT fromVal(String dbEnum) {
    for (var v : values())
      if (v.val.equals(dbEnum))
        return v;

    throw new ErrAPI("unknown arg val => " + dbEnum);
  }
}
