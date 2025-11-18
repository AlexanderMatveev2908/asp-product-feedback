package server.lib.data_structure.prs.sub;

import java.lang.reflect.Array;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import server.decorators.core.ErrAPI;
import server.decorators.types.Dict;
import server.lib.data_structure.Jack;
import server.lib.data_structure.LibRuntime;
import server.lib.data_structure.LibShape;

public class G_PrsType extends F_PrsCases {
  public static final <T> T tFromJson(String json, Class<T> cls) {
    final Dict dict = dictFromJson(json);
    return tFromDict(dict, cls);
  }

  public static final <T> T tFromDict(Dict dict, Class<T> cls) {
    try {
      return Jack.main.convertValue(dict, cls);
    } catch (final Exception err) {
      err.printStackTrace();
      throw new ErrAPI("invalid data", 400);
    }
  }

  private static final Object convertArray(Object val, Set<Object> visited) {
    final int len = Array.getLength(val);
    final List<Object> list = new ArrayList<>();
    for (int i = 0; i < len; i++)
      list.add(convertValue(Array.get(val, i), visited));
    return list;
  }

  private static final Object convertCollection(Collection<?> col, Set<Object> visited) {
    final List<Object> list = new ArrayList<>();
    for (Object item : col)
      list.add(convertValue(item, visited));
    return list;
  }

  private static final Object convertMap(Map<?, ?> map, Set<Object> visited) {
    final Dict d = new Dict();
    for (final Map.Entry<?, ?> pair : map.entrySet())
      d.put(String.valueOf(pair.getKey()), convertValue(pair.getValue(), visited));
    return d;
  }

  private static Object convertValue(Object val, Set<Object> visited) {
    if (val == null)
      return null;

    if (val instanceof UUID uuid)
      return uuid.toString();

    final Class<?> type = val.getClass();

    if (LibShape.isPrim(val))
      return val;

    if (type.isArray())
      return convertArray(val, visited);

    if (val instanceof final Collection<?> col)
      return convertCollection(col, visited);

    if (val instanceof final Map<?, ?> map)
      return convertMap(map, visited);

    return dictFromT(val, visited);
  }

  private static final Dict dictFromT(Object obj, Set<Object> visited) {
    if (obj == null)
      return null;

    if (visited.contains(obj))
      return Dict.of("ref", obj.getClass().getName());

    visited.add(obj);

    final Dict dict = new Dict();
    Class<?> curr = obj.getClass();

    while (LibShape.isPresent(curr) && !curr.getName().startsWith("java.")) {
      for (Field field : curr.getDeclaredFields()) {
        if (Modifier.isStatic(field.getModifiers()))
          continue;

        field.setAccessible(true);
        final Object value = LibRuntime.inTryBlock(() -> field.get(obj));

        dict.put(field.getName(), convertValue(value, visited));
      }
      curr = curr.getSuperclass();
    }

    return dict;
  }

  public static final Dict dictFromT(Object obj) {
    return dictFromT(obj, new HashSet<>());
  }
}
