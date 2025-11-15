package server.lib.dev.lib_log.sub;

import server.decorators.Nullable;
import server.lib.data_structure.LibShape;

public class C_LibLogErr extends B_LibLogAio {
  public static final void logErr(Throwable err) {
    wErr(err);

    startLog();

    if (LibShape.isNone(err)) {
      logTtl("⚠️ passed None to logErr ⚠️");
      return;
    }

    logHeader(null);

    System.out.println("\t");

    final StackTraceElement[] frames = err.getStackTrace();

    for (final StackTraceElement f : frames)
      System.out.printf("📂 %s => 🔢 %d | 🆎 %s | ☢️ %s%n", f.getFileName(), f.getLineNumber(), f.getMethodName(),
          f.toString());

    final String msg = err.getMessage();
    final int depth = frames.length;
    final Nullable<StackTraceElement> last = depth > 0 ? Nullable.of(frames[0]) : Nullable.asNone();

    System.out.println("\t");
    System.out.printf("📝 msg => %s%n", msg);
    System.out.printf("📏 depth => %d%n", depth);

    if (last.isPresent()) {
      System.out.printf("💥 last file => 📁 %s%n", last.get().getFileName());
      System.out.printf("📏 last line => %d%n", last.get().getLineNumber());
      System.out.printf("👻 last cb name => %s%n", last.get().getMethodName());
    }

    endLog();

  }
}
