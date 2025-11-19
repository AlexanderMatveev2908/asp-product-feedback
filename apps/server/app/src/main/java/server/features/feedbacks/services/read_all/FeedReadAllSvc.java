package server.features.feedbacks.services.read_all;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.conf.databases.relational_database.SqlCmd;
import server.decorators.core.api.Api;
import server.decorators.types.Dict;
import server.features.feedbacks.services.read_all.sub.ReadAllQuery;

@Service
@Transactional
@RequiredArgsConstructor
@SuppressFBWarnings({ "EI2", "EI" })
public class FeedReadAllSvc {
  private final SqlCmd sqlCmd;

  private Mono<List<Dict>> query() {
    return sqlCmd.trxLowLevel(client -> {

      final String sql = ReadAllQuery.getQuery();

      return client.sql(sql.toString()).fetch().all().map(row -> Dict.fromRow(row)).collectList();
    });
  }

  public Mono<Dict> main(Api api) {
    return query().map(list -> Dict.of("feedbacks", list));
  }
}
