package server.lib.data_structure;

import server.decorators.MessySupplier;
import server.decorators.flow.ErrAPI;

public final class LibRuntime {
  public static final <T> T inTryBlock(MessySupplier<T> cb) {
    try {
      return cb.get();
    } catch (Exception err) {
      throw new ErrAPI(err.getMessage());
    }
  }
}
