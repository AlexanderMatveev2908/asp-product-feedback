package server.lib.dev.lib_log.sub;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Optional;

import server.decorators.types.Nullable;
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

    protected static final void limiter() {
        stdOut("-".repeat(60));
    }

    protected static final void tab() {
        stdOut("\t");
    }

    protected static final void startLog() {
        tab();
        limiter();
    }

    protected static final void endLog() {
        limiter();
        tab();
    }

    protected static final void logHeader(String title) {
        final RecMainLog mainInfo = getMainLogInfo();

        stdOutF("⏰ %s • 🗃️ %s • %s", mainInfo.time(), mainInfo.fileName(),
                Nullable.of(title).isPresent() ? "📌 " + title : "🧵 " + mainInfo.thread());
        tab();
    }

    public static final void stdOut(Object msg) {
        System.out.println(msg);
    }

    public static final void stdOutF(String msg, Object... args) {
        System.out.printf(msg, args);
    }

    public static final void stdErr(String msg) {
        System.err.println("❌ " + msg);
    }
}
