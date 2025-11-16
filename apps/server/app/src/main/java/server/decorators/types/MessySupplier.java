package server.decorators.types;

@FunctionalInterface
public interface MessySupplier<T> {
  public abstract T get() throws Exception;
}
