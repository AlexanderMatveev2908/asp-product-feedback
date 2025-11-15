package server.lib.dev.lib_log.sub;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Optional;

import server.lib.data_structure.LibShape;
import server.lib.dev.lib_log.LibLog;

public class A_LibLogBase {
    private static final String APP_PKG = "server";

    private record RecMainLog(String time, String fileName, String thread) {
    }

    private static final RecMainLog getMainLogInfo() {
        final String time = LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss"));

        final Optional<StackTraceElement> caller = Arrays.stream(Thread.currentThread().getStackTrace())
                .filter(f -> f.getClassName().startsWith(APP_PKG))
                .filter(f -> !f.getClassName().contains(LibLog.class.getSimpleName())).findFirst();

        final String fileName = caller.isPresent() ? caller.get().getFileName() : "unknown caller";
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
                LibShape.hasText(title) ? "📌 " + title : "🧵 " + mainInfo.thread());
    }

    public static final void logTtl(String title, Object... args) {

        startLog();
        logHeader(title);

        System.out.println("\t");

        if (LibShape.isPresent(args))
            for (final Object v : args)
                System.out.println(v);

        endLog();
    }

    public static final void log(Object... arg) {
        logTtl(null, arg);
    }

}
