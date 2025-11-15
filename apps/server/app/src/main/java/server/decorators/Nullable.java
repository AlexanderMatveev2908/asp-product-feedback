package server.decorators;

import java.util.function.Consumer;
import java.util.function.Function;

import lombok.RequiredArgsConstructor;
import server.lib.data_structure.LibShape;

// ! used only when arg could intentionally can be left as null
// ! in other places arg must in every case be a non-nullable value
// ! like an empty string or empty map but never 'null'
@RequiredArgsConstructor
public final class Nullable<T> {
  public final T data;

  public static final <K> Nullable<K> of(K arg) {
    return new Nullable<K>(arg);
  }

  public static final <K> Nullable<K> asNone() {
    return new Nullable<K>(null);
  }

  public final boolean isNone() {
    return LibShape.isNone(data);
  }

  public final boolean isPresent() {
    return LibShape.isPresent(data);
  }

  public final T orElse(T def) {
    return isPresent() ? data : def;
  }

  public final T yellIfNone() {
    LibShape.yellNone(data);
    return get();
  }

  public final <K> Nullable<K> map(Function<T, K> cb) {
    return isPresent() ? Nullable.of(cb.apply(data)) : Nullable.asNone();
  }

  public final void ifPresent(Consumer<T> cb) {
    if (isPresent())
      cb.accept(data);
  }

  public final T get() {
    return data;
  }
}
