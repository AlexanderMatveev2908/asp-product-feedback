package server.features.feedbacks.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.conf.databases.relational_database.SqlCmd;
import server.decorators.core.api.Api;
import server.decorators.types.Dict;
import server.lib.data_structure.LibSql;
import server.models.comments.Comment;

@Service
@Transactional
@RequiredArgsConstructor
@SuppressFBWarnings({ "EI2", "EI" })
public class FeedReadAllSvc {
  private final SqlCmd sqlCmd;

  private Mono<List<Dict>> query() {
    return sqlCmd.trxLowLevel(client -> {
      StringBuilder sql = new StringBuilder();
      sql.append(String.format("""
          SELECT f.*,
            (
              SELECT COALESCE(
                JSON_AGG(
                  JSON_BUILD_OBJECT(
                    %s
                  ) ORDER BY c.created_at DESC
                ),
                '[]'
              ) FROM comments c
                  WHERE c.feedback_id = f.id
            ) comments
            FROM feedbacks f
          """, LibSql.rowKeyValPairs(Comment.class, "c")));

      return client.sql(sql.toString()).fetch().all().map(row -> Dict.fromRow(row)).collectList();
    });
  }

  public Mono<Dict> main(Api api) {
    return query().map(list -> Dict.of("feedbacks", list));
  }
}
