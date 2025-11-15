package server.lib.data_structure.prs.sub;

public class F_PrsCases extends E_PrsPrim {
  public static final String snakeToCamel(String key) {
    final StringBuilder sb = new StringBuilder();
    boolean upperNext = false;

    for (final char c : key.toCharArray()) {
      if (c == '_') {
        upperNext = true;
      } else if (upperNext) {
        sb.append(Character.toUpperCase(c));
        upperNext = false;
      } else {
        sb.append(c);
      }
    }

    return sb.toString();
  }
}
