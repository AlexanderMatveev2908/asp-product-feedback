package server.models.feedbacks.etc.types;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum FeedCatT {
  UI("ui"),
  UX("ux"),
  FEATURE("feature"),
  ENHANCEMENT("enhancement"),
  BUG("bug");

  private final String val;
}
