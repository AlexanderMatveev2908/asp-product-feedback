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

  public static final Object deepCpy(Object val) {
    if (val == null)
      return null;

    if (val instanceof Dict d)
      return d.cpy();

    if (val instanceof Map<?, ?> m) {
      Dict newMap = new Dict();
      m.forEach((k, v) -> newMap.put(k.toString(), deepCpy(v)));
      return newMap;
    }

    if (val instanceof List<?> list) {
      List<Object> newList = new ArrayList<>(list.size());
      for (Object item : list)
        newList.add(deepCpy(item));
      return newList;
    }

    if (val.getClass().isArray()) {
      int len = Array.getLength(val);
      Object newArr = Array.newInstance(val.getClass().getComponentType(), len);
      for (int i = 0; i < len; i++)
        Array.set(newArr, i, deepCpy(Array.get(val, i)));
      return newArr;
    }

    if (val instanceof String
        || val instanceof Number
        || val instanceof Boolean
        || val instanceof Character
        || val instanceof Enum<?>)
      return val;

    if (val instanceof Cloneable) {
      try {
        Method cloneMethod = val.getClass().getMethod("clone");
        return cloneMethod.invoke(val);
      } catch (Exception ignored) {
      }
    }

    return val;
  }
}
