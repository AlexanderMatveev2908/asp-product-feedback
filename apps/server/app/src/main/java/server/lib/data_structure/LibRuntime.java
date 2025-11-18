package server.lib.data_structure;

import java.time.Duration;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import server.decorators.core.ErrAPI;
import server.decorators.types.MessyRunnable;
import server.decorators.types.MessySupplier;
import server.lib.dev.lib_log.LibLog;

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

  public static final void timer(Mono<?> job) {
    Flux.interval(Duration.ofSeconds(1))
        .takeUntilOther(job)
        .subscribe(sec -> LibLog.stdOut("⏳ generating mock data... " + (sec + 1) + "s"));

  }
}
