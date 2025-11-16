package server.models.feedbacks.etc.types;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum FeedCatT {
  UI("UI"),
  UX("UX"),
  FEATURE("FEATURE"),
  ENHANCEMENT("ENHANCEMENT"),
  BUG("BUG");

  private final String val;

}
