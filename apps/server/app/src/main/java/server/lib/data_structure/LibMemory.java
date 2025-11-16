package server.lib.data_structure;

import java.lang.reflect.Array;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import server.decorators.types.Dict;

public class LibMemory {
  public static final Dict shallowCpy(Dict arg) {
    return arg.entrySet().stream()
        .collect(Collectors.toMap(Map.Entry::getKey,
            Map.Entry::getValue, (oldVal, newVal) -> newVal, Dict::new));
  }

  private static final Object cpyArray(Object val) {
    int len = Array.getLength(val);
    final Object newArr = Array.newInstance(val.getClass().getComponentType(), len);
    for (int i = 0; i < len; i++)
      Array.set(newArr, i, deepCpy(Array.get(val, i)));
    return newArr;
  }

  private static final List<?> cpyList(List<?> list) {
    final List<Object> newList = new ArrayList<>(list.size());
    for (final Object item : list)
      newList.add(deepCpy(item));
    return newList;
  }

  private static final Map<?, ?> cpyMap(Map<?, ?> m) {
    final Dict newMap = new Dict();
    m.forEach((k, v) -> newMap.put(k.toString(), deepCpy(v)));
    return newMap;
  }

  private static final boolean isPrimitive(Object val) {
    return val instanceof String
        || val instanceof Number
        || val instanceof Boolean
        || val instanceof Character
        || val instanceof Enum<?>;
  }

  public static final Object deepCpy(Object val) {
    if (val == null)
      return null;

    if (val instanceof Dict d)
      return d.cpy();

    if (val instanceof Map<?, ?> m)
      return cpyMap(m);

    if (val instanceof final List<?> list)
      return cpyList(list);

    if (val.getClass().isArray())
      return cpyArray(val);

    if (isPrimitive(val))
      return val;

    if (val instanceof Cloneable) {
      try {
        final Method cloneMethod = val.getClass().getMethod("clone");
        return cloneMethod.invoke(val);
      } catch (Exception ignored) {
      }
    }

    return val;
  }
}
