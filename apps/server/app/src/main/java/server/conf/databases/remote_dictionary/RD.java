package server.conf.databases.remote_dictionary;

import org.springframework.stereotype.Service;

import io.lettuce.core.RedisClient;
import io.lettuce.core.api.StatefulRedisConnection;
import io.lettuce.core.api.reactive.RedisReactiveCommands;
import reactor.core.publisher.Mono;
import server.conf.env_vars.EnvVars;
import server.decorators.RootCls;
import server.decorators.flow.ErrAPI;
import server.lib.data_structure.LibShape;

@Service
public final class RD implements RootCls {
    private final RedisClient client;
    private final StatefulRedisConnection<String, String> cnt;
    private final RedisReactiveCommands<String, String> cmd;

    public RD(EnvVars envKeeper) {
        this.client = RedisClient.create(envKeeper.getRedisUrl());
        this.cnt = client.connect();
        this.cmd = cnt.reactive();
    }

    public final RedisReactiveCommands<String, String> getCmd() {
        return cmd;
    }

    public final Mono<String> checkConnection() {
        return cmd.ping()
                .onErrorMap(err -> new ErrAPI("rd cnt failed"))
                .map(res -> {
                    if (!"PONG".equals(res))
                        throw new ErrAPI("rd cnt failed");
                    return res;
                });
    }

    public final Mono<Integer> dbSize() {
        return cmd.dbsize()
                .onErrorMap(err -> new ErrAPI("rd fetch db size failed"))
                .map(size -> {
                    return size.intValue();
                });
    }

    public final void close() {
        if (LibShape.isPresent(cnt) && cnt.isOpen())
            cnt.close();

        if (LibShape.isPresent(client))
            client.shutdown();
    }

}
