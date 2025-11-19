package server.lib.data_structure;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.List;

import server.lib.data_structure.prs.LibPrs;

public final class LibSql {
  public static final List<String> sqlKeys(Class<?> cls) {
    List<String> keys = new ArrayList<>();

    Class<?> curr = cls;

    while (LibShape.isPresent(curr) && !curr.getName().startsWith("java.")) {
      for (final Field f : curr.getDeclaredFields()) {
        final int mods = f.getModifiers();
        if (Modifier.isStatic(mods) || Modifier.isTransient(mods))
          continue;

        f.setAccessible(true);
        final String asSnakeCase = LibPrs.snakeFromCamel(f.getName());
        keys.add(asSnakeCase);
      }
      curr = curr.getSuperclass();
    }

    return keys;
  }

  public static final String rowKeyValPairs(Class<?> cls, String alias) {
    List<String> snakeKeys = sqlKeys(cls);

    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < snakeKeys.size(); i++) {
      final String key = snakeKeys.get(i);

      sb.append(String.format("'%s'", key));
      sb.append(String.format(", %s.%s", alias, key));

      if (i != snakeKeys.size() - 1)
        sb.append(",");

      sb.append("\n");
    }

    return sb.toString();
  }

}
