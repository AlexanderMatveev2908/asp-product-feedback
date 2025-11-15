package server.lib.data_structure;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;

public class LibMemory {
  public static final Map<String, Object> cpyMap(Map<String, Object> arg) {
    return arg.entrySet().stream()
        .collect(Collectors.toMap(Map.Entry::getKey,
            Map.Entry::getValue, (oldVal, newVal) -> newVal, LinkedHashMap::new));
  }
}
