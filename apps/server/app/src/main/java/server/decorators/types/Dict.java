package server.decorators.types;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Map.Entry;

import server.decorators.core.ErrAPI;
import server.lib.data_structure.LibMemory;
import server.lib.data_structure.LibShape;
import server.lib.data_structure.prs.LibPrs;

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

  @SuppressWarnings("unchecked")
  public static final Dict castObj(Object obj) {
    if (LibShape.isNone(obj))
      throw new ErrAPI("tried to cast None to Dict");
    if (!(obj instanceof Map<?, ?>))
      throw new ErrAPI("tried to cast a non Map to Dict");

    try {
      Map<String, Object> m = (Map<String, Object>) obj;
      return new Dict(m);
    } catch (Exception err) {
      throw new ErrAPI("wrongly casted unknown arg to Map");
    }
  }

  public static final <T> Dict fromT(T obj) {
    return LibPrs.dictFromT(obj);
  }

  public static final Dict fromRow(Map<String, Object> row) {
    return LibPrs.dictFromRow(row);
  }

  public final <T> T toT(Class<T> cls) {
    return LibPrs.tFromDict(this, cls);
  }

  public final <T> T casting(String key, Class<T> cls) {
    try {
      Nullable<?> asNullable = Nullable.of(get(key));

      if (asNullable.isNone())
        throw new ErrAPI("tried to cast None to Class => " + cls.getSimpleName());

      Object val = asNullable.orYell();

      if (!cls.isInstance(val))
        throw new ErrAPI("tried to cast value to wrong class");

      return cls.cast(val);
    } catch (Exception err) {
      throw new ErrAPI("wrongly casted value to => " + cls.getSimpleName());
    }
  }

  public final Dict mergeWith(Dict other) {
    Dict merged = new Dict();

    if (LibShape.isNone(other))
      throw new ErrAPI("tried to merge a Dict with None");

    merged.putAll(this);
    merged.putAll(other);

    return merged;
  }

  public final String valAsString(String key) {
    Object rawVal = get(key);

    if (LibShape.isNone(rawVal))
      throw new ErrAPI("tried to convert None to String");

    if (!(rawVal instanceof String))
      throw new ErrAPI("val is not a String => " + rawVal.getClass().getSimpleName());

    return (String) rawVal;
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
