package server.lib.data_structure.prs.sub;

public class F_PrsCases extends E_PrsPrim {
  public static final String camelFromSnake(String key) {
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

  public static final String snakeFromCamel(String key) {
    final StringBuilder sb = new StringBuilder();

    for (final char c : key.toCharArray()) {
      if (Character.isUpperCase(c)) {
        final Character asLower = Character.toLowerCase(c);
        sb.append("_");
        sb.append(asLower);
      } else {
        sb.append(c);
      }
    }

    return sb.toString();
  }

}
