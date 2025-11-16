package server.lib.data_structure;

import server.decorators.core.ErrAPI;
import server.decorators.types.MessyRunnable;
import server.decorators.types.MessySupplier;

public final class LibRuntime {
  public static final <T> T inTryBlock(MessySupplier<T> cb) {
    try {
      return cb.get();
    } catch (final Exception err) {
      throw new ErrAPI(err.getMessage());
    }
  }

  public static final void inTryBlock(MessyRunnable cb) {
    try {
      cb.run();
    } catch (final Exception err) {
      throw new ErrAPI(err.getMessage());
    }
  }
}
