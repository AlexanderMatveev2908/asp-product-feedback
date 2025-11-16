package server.decorators.types;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Map.Entry;

import server.decorators.core.ErrAPI;
import server.lib.data_structure.LibMemory;

// ? wrote it just because is shorter than writing every time Map<String,Object> for every
// ? generic map i need when type is not even strictly necessary
public class Dict extends LinkedHashMap<String, Object> {

  public Dict() {
    super();
  }

  public Dict(Map<String, Object> src) {
    super(src);
  }

  public final Dict cpy() {
    Dict copy = new Dict();
    for (Entry<String, Object> e : this.entrySet())
      copy.put(e.getKey(), LibMemory.deepCpy(e.getValue()));

    return copy;
  }

  public static Dict of(Object... kv) {
    if (kv.length % 2 != 0)
      throw new ErrAPI("Dict.of requires key-val pairs");

    Dict d = new Dict();

    for (int i = 0; i < kv.length; i += 2) {
      Object rawKey = kv[i];

      if (!(rawKey instanceof String))
        throw new ErrAPI("Dict.of key must be a String, got: " + rawKey);

      String key = (String) rawKey;
      Object value = kv[i + 1];
      d.put(key, value);
    }

    return d;
  }
}
