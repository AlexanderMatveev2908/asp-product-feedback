package server.decorators;

import java.util.List;

import org.springframework.boot.web.context.WebServerInitializedEvent;
import org.springframework.stereotype.Service;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import reactor.util.function.Tuples;
import server.conf.databases.relational_database.SqlCmd;
import server.conf.databases.remote_dictionary.RD;
import server.conf.env_vars.EnvVars;
import server.lib.dev.lib_log.LibLog;

@Service
@RequiredArgsConstructor
@SuppressFBWarnings({ "EI2", "EI" })
public final class LifeSpawn {
    private final EnvVars envKeeper;
    private final RD rd;
    private final SqlCmd sqlCmd;

    private final String prettyTables(List<String> arg) {
        final StringBuilder sb = new StringBuilder();

        sb.append("🗃️ sql tables => ");
        sb.append(arg.size());
        sb.append("\n");

        final int maxWidth = arg.stream()
                .mapToInt(String::length)
                .max()
                .orElse(0) + 10;

        for (int i = 0; i < arg.size(); i++) {
            final String curr = arg.get(i);

            sb.append(String.format("| %-" + maxWidth + "s", curr));
            if ((i + 1) % 3 == 0)
                sb.append("\n");
        }

        return sb.toString();
    }

    private final Mono<List<String>> getSqlTables() {
        return sqlCmd.trxLowLevel(client -> client.sql("""
                    SELECT table_name
                    FROM information_schema.tables
                    WHERE table_schema = 'public'
                      AND table_name NOT IN ('databasechangelog', 'databasechangeloglock')
                """)
                .map((row, meta) -> row.get("table_name", String.class))
                .all()
                .collectList());
    }

    @SuppressWarnings({ "UnnecessaryTemporaryOnConversionFromString" })
    public final void lifeCheck(WebServerInitializedEvent e) {

        getSqlTables().flatMap(sqlTables -> rd.dbSize()
                .map(size -> Tuples.of(sqlTables, size)))
                .subscribe(tpl -> {
                    final String whereRun = String.format("🚀 server running on => %d...", e.getWebServer().getPort());
                    final String whoAccess = String.format("⬜ whitelist => %s", envKeeper.getFrontUrl());
                    final String remoteDictionarySize = String.format("🧮 redis keys => %d", tpl.getT2());
                    final String sqlTables = prettyTables(tpl.getT1());

                    LibLog.log(
                            whereRun,
                            whoAccess,
                            remoteDictionarySize,
                            sqlTables);

                }, err -> LibLog.logErr(err));

    }
}
