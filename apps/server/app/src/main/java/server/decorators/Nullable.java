package server.decorators;

import lombok.RequiredArgsConstructor;

// ! used only when arg could intentionally can be left as null
// ! in other places arg must in every case be a non-nullable value
// ! like an empty string or empty map which at least have methods
@RequiredArgsConstructor
public final class Nullable<T> {
  public final T data;

  public static final <K> Nullable<K> of(K arg) {
    return new Nullable<K>(arg);
  }

  public static final <K> Nullable<K> none() {
    return new Nullable<K>(null);
  }

  public final boolean isNull() {
    return data == null;
  }

  public final boolean isPresent() {
    return data != null;
  }

  public final <K> Object orElse(K def) {
    return isPresent() ? get() : def;
  }

  public final T get() {
    return data;
  }
}
