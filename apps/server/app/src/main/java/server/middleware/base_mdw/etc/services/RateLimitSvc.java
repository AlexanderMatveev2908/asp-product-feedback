package server.middleware.base_mdw.etc.services;

import java.time.Duration;
import java.util.UUID;

import org.springframework.stereotype.Component;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import io.lettuce.core.Range;
import io.lettuce.core.api.reactive.RedisReactiveCommands;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.conf.databases.remote_dictionary.RD;
import server.conf.env_vars.EnvVars;
import server.conf.env_vars.etc.data_structure.EnvModeT;
import server.decorators.flow.ErrAPI;
import server.decorators.flow.api.Api;

@Component
@SuppressFBWarnings({ "EI2" })
public final class RateLimitSvc {
    private final RedisReactiveCommands<String, String> cmd;
    private final EnvVars envKeeper;

    public RateLimitSvc(RD rd, EnvVars envKeeper) {
        this.cmd = rd.getCmd();
        this.envKeeper = envKeeper;
    }

    private final LimitData extractLimitData(Api api, Integer minutes) {
        final long now = System.currentTimeMillis();
        final long windowMs = Duration.ofMinutes(minutes).toMillis();

        final String ip = api.getClientIp();
        final String path = api.getPath();
        final String method = api.getMethod().toString();

        final String key = String.format("rl:%s:%s__%s", ip, path, method);
        final String val = now + ":" + UUID.randomUUID();

        return new LimitData(now, windowMs, key, val);
    }

    private final Mono<Long> getIpCount(LimitData data) {
        return cmd.zremrangebyscore(data.getKey(), Range.create(0, data.expired()))
                .then(cmd.zadd(data.getKey(), data.getNow(), data.getVal()))
                .then(cmd.zcard(data.getKey()))
                .flatMap(count -> cmd.pexpire(data.getKey(), data.getWindowMs() + 1).thenReturn(count));
    }

    private final Mono<Void> withError(Api api, LimitData data) {
        return cmd.zrangeWithScores(data.getKey(), 0, 0).singleOrEmpty().flatMap(tuple -> {
            final long oldest = (long) tuple.getScore();
            final long resetMs = data.reset(oldest);

            api.addHeader("RateLimit-Reset", resetMs);

            return Mono.error(
                    new ErrAPI("🐹 Our hamster-powered server took a break — try again later!", 429));
        });
    }

    public final Mono<Void> limit(Api api, int limit, int minutes) {
        if (envKeeper.getMode().equals(EnvModeT.TEST))
            return Mono.empty();

        final LimitData data = extractLimitData(api, minutes);

        return getIpCount(data)
                .flatMap(count -> {
                    final int remaining = Math.max(0, limit - count.intValue());

                    // ? method itself use String.valueOf on 2 arg
                    api.addHeader("RateLimit-Limit", limit);
                    api.addHeader("RateLimit-Remaining", remaining);
                    api.addHeader("RateLimit-Window", data.getWindowMs());

                    if (count < limit)
                        return Mono.empty();

                    return withError(api, data);
                });
    }

}

@Getter
@RequiredArgsConstructor
final class LimitData {
    private final long now;
    private final long windowMs;
    private final String key;
    private final String val;

    public long expired() {
        return now - windowMs;
    }

    public long reset(long oldest) {
        return Math.max(0, (windowMs - (now - oldest)));
    }
}