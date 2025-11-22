package server.lib.data_structure.prs.sub;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import io.r2dbc.postgresql.codec.Json;
import server.decorators.types.Dict;
import server.lib.data_structure.Jack;
import server.lib.data_structure.LibRuntime;

public class H_PrsSql extends G_PrsType {

  private static final Object convertJson(Json json) {
    return LibRuntime.inTryBlock(() -> {
      final String str = json.asString();
      final Object parsed = Jack.main.readValue(str, Object.class);
      return convertValue(parsed);
    });
  }

  private static final Object convertMap(Map<?, ?> m) {
    final Dict nested = new Dict();
    for (final Entry<?, ?> pair : m.entrySet())
      nested.put(camelFromSnake(pair.getKey().toString()), convertValue(pair.getValue()));
    return nested;
  }

  private static final Object convertList(List<?> list) {
    final List<Object> conv = new ArrayList<>();
    for (final Object item : list)
      conv.add(convertValue(item));
    return conv;

  }

  private static final Object convertValue(Object val) {
    if (val == null)
      return null;

    if (val instanceof final Json json)
      return convertJson(json);

    if (val instanceof final Map<?, ?> m)
      return convertMap(m);

    if (val instanceof final List<?> list)
      return convertList(list);

    return val;
  }

  public static final Dict dictFromRow(Map<String, Object> row) {
    final Dict map = new Dict();

    for (final Entry<String, Object> pair : row.entrySet())
      map.put(camelFromSnake(pair.getKey()), convertValue(pair.getValue()));

    return map;
  }

}
