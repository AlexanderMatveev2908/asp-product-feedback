package server.lib.dev.lib_log;

import server.decorators.Nullable;
import server.lib.data_structure.LibShape;
import server.lib.dev.lib_log.sub.C_LibLogErr;

public final class LibLog extends C_LibLogErr {

    public static final void logTtl(Nullable<String> title, Object... args) {
        wOk(args);

        startLog();
        logHeader(title);

        tab();

        if (LibShape.isPresent(args))
            for (final Object v : args)
                stdOut(v);

        endLog();
    }

    public static final void log(Object... arg) {
        logTtl(Nullable.asNone(), arg);
    }

    public static final void logKV(String key, Object val) {
        stdOutF("🔑 %s => 🖍️ %s%n", key, val);
    }
}
