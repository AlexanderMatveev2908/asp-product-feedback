package server.decorators.types;

@FunctionalInterface
public interface MessyRunnable {
  public abstract void run() throws Exception;
}
