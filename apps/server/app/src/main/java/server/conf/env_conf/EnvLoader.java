package server.conf.env_conf;

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
        Path certPath = LibPath.CA_FILE;
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
        URI uri = URI.create(dbUrl.replace("jdbc:", ""));
        String host = uri.getHost();
        int port = uri.getPort();
        String dbName = uri.getPath().replaceFirst("/", "");

        StringBuilder r2dbcUrl = new StringBuilder();
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
        CtxDbVars ctxDb = CtxDbVars.fromDotEnv(dotenv);
        // ? generated on boot
        Path certPath = generateCa(ctxDb.supabaseCa());

        // ? full url
        String dbUrl = ctxDb.dbUrl() + "?sslmode=verify-full&sslrootcert=" + certPath;
        String reactiveUrl = buildReactiveURL(dbUrl, ctxDb, certPath);

        props.put("spring.r2dbc.url", reactiveUrl);
        props.put("spring.r2dbc.username", ctxDb.dbUs());
        props.put("spring.r2dbc.password", ctxDb.dbPwd());
    }

    private final void appSetup(Dotenv dotenv, Properties props, ConfigurableEnvironment env) {
        Set<DotenvEntry> existingVars = dotenv.entries();

        for (DotenvEntry pair : existingVars)
            props.put(pair.getKey(), pair.getValue());

        env.getPropertySources().addFirst(new PropertiesPropertySource("dotenv", props));
    }

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment env, SpringApplication app) {
        Path serverDir = LibPath.SERVER_DIR;

        Dotenv dotenv = Dotenv.configure()
                .directory(serverDir.toString())
                .filename(".env")
                .ignoreIfMissing()
                .load();

        Properties props = new Properties();

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
        String dbUrl = dotenv.get("DB_URL");
        String dbUs = dotenv.get("DB_US");
        String dbPwd = dotenv.get("DB_PWD");
        String supabaseCa = dotenv.get("SUPABASE_CA");

        return new CtxDbVars(dbUrl, dbUs, dbPwd, supabaseCa);
    }
}