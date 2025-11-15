package server.decorators;

@FunctionalInterface
public interface MessySupplier<T> {
  public abstract T get() throws Exception;
}
