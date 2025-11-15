package server.conf.databases.relational_database;

import java.util.function.Function;

import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class SqlCmd {
  private final DbSQL dbSQL;

  public final <T> Mono<T> trxLowLevel(Function<DatabaseClient, Mono<T>> cb) {
    return cb.apply(dbSQL.getSqlClient()).as(dbSQL.getTrxMng()::transactional);
  }

  public final <T> Mono<T> trxHighLevel(Function<R2dbcEntityTemplate, Mono<T>> cb) {
    return cb.apply(dbSQL.getOrm()).as(dbSQL.getTrxMng()::transactional);
  }
}
