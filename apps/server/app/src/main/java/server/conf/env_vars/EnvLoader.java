package server.conf.env_vars;

import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HexFormat;
import java.util.Properties;
import java.util.Set;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.PropertiesPropertySource;

import io.github.cdimascio.dotenv.Dotenv;
import io.github.cdimascio.dotenv.DotenvEntry;
import server.decorators.flow.ErrAPI;
import server.lib.dev.lib_log.LibLog;
import server.lib.paths.LibPath;

public final class EnvLoader implements EnvironmentPostProcessor {

    private final Path generateCa(String supabaseCa) {
        final Path certPath = LibPath.CA_FILE;
        try {
            Files.write(certPath, HexFormat.of().parseHex(supabaseCa));
        } catch (Exception err) {
            LibLog.logErr(err);
            throw new ErrAPI("missing db ca");
        }

        return certPath;
    }

    private final String buildReactiveURL(String dbUrl, CtxDbVars ctxDb, Path certPath) {
        // ! remove jdbc which supabase append automatically for java connections
        final URI uri = URI.create(dbUrl.replace("jdbc:", ""));
        final String host = uri.getHost();
        final int port = uri.getPort();
        final String dbName = uri.getPath().replaceFirst("/", "");

        final StringBuilder r2dbcUrl = new StringBuilder();
        r2dbcUrl.append("r2dbc:postgresql://")
                .append(ctxDb.dbUs()).append(":").append(ctxDb.dbPwd()).append("@")
                .append(host).append(":").append(port).append("/")
                .append(dbName);
        r2dbcUrl.append("?sslMode=verify-full&sslRootCert=")
                .append(certPath);

        return r2dbcUrl.toString();

    }

    private final void dbSetup(Dotenv dotenv, Properties props) {
        // ? tokens connections
        final CtxDbVars ctxDb = CtxDbVars.fromDotEnv(dotenv);
        // ? generated on boot
        final Path certPath = generateCa(ctxDb.supabaseCa());

        // ? full url
        final String dbUrl = ctxDb.dbUrl() + "?sslmode=verify-full&sslrootcert=" + certPath;
        final String reactiveUrl = buildReactiveURL(dbUrl, ctxDb, certPath);

        props.put("spring.r2dbc.url", reactiveUrl);
        props.put("spring.r2dbc.username", ctxDb.dbUs());
        props.put("spring.r2dbc.password", ctxDb.dbPwd());
    }

    private final void appSetup(Dotenv dotenv, Properties props, ConfigurableEnvironment env) {
        final Set<DotenvEntry> existingVars = dotenv.entries();

        for (final DotenvEntry pair : existingVars)
            props.put(pair.getKey(), pair.getValue());

        env.getPropertySources().addFirst(new PropertiesPropertySource("dotenv", props));
    }

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment env, SpringApplication app) {
        final Path serverDir = LibPath.SERVER_DIR;

        final Dotenv dotenv = Dotenv.configure()
                .directory(serverDir.toString())
                .filename(".env")
                .ignoreIfMissing()
                .load();

        final Properties props = new Properties();

        dbSetup(dotenv, props);
        appSetup(dotenv, props, env);
    }
}

final record CtxDbVars(
        String dbUrl,
        String dbUs,
        String dbPwd,
        String supabaseCa) {

    public static CtxDbVars fromDotEnv(Dotenv dotenv) {
        final String dbUrl = dotenv.get("DB_URL");
        final String dbUs = dotenv.get("DB_US");
        final String dbPwd = dotenv.get("DB_PWD");
        final String supabaseCa = dotenv.get("SUPABASE_CA");

        return new CtxDbVars(dbUrl, dbUs, dbPwd, supabaseCa);
    }
}