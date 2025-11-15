package server.lib.dev.lib_log.sub;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;

import server.lib.dev.lib_log.LibLog;

public class A_LibLogBase {
    private static final String APP_PKG = "server";

    private record RecMainLog(String time, String fileName, String thread) {
    }

    private static final RecMainLog getMainLogInfo() {
        final String time = LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss"));

        final StackTraceElement caller = Arrays.stream(Thread.currentThread().getStackTrace())
                .filter(f -> f.getClassName().startsWith(APP_PKG))
                .filter(f -> !f.getClassName().contains(LibLog.class.getSimpleName())).findFirst().orElse(null);

        final String fileName = (caller != null) ? caller.getFileName() : "unknown caller";
        final String thread = Thread.currentThread().getName();

        return new RecMainLog(time, fileName, thread);
    }

    public static final void limiter() {
        System.out.println("-".repeat(60));
    }

    public static final void startLog() {
        System.out.println("\n");
        limiter();
    }

    public static final void endLog() {
        limiter();
        System.out.println("\n");
    }

    public static final void logHeader(String title) {
        final RecMainLog mainInfo = getMainLogInfo();

        System.out.printf("⏰ %s • 🗃️ %s • %s%n", mainInfo.time(), mainInfo.fileName(),
                title != null ? "📌 " + title : "🧵 " + mainInfo.thread());
    }

    public static final void logTtl(String title, Object... arg) {

        startLog();
        logHeader(title);

        System.out.println("\t");

        if (arg != null)
            for (final Object v : arg)
                System.out.println(v);

        endLog();
    }

    public static final void log(Object... arg) {
        logTtl(null, arg);
    }

}
