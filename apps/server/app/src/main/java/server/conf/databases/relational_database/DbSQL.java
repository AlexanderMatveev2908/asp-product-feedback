package server.conf.databases.relational_database;

import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.r2dbc.connection.R2dbcTransactionManager;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import org.springframework.transaction.reactive.TransactionalOperator;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import io.r2dbc.spi.ConnectionFactory;
import lombok.Getter;

@Service
@Getter
@SuppressFBWarnings({ "EI2", "EI" })
public final class DbSQL {
  private final ConnectionFactory factory;
  private final R2dbcEntityTemplate orm;
  private final DatabaseClient sqlClient;
  private final TransactionalOperator trxMng;

  public DbSQL(ConnectionFactory factory) {
    // ? low level connection
    this.factory = factory;
    // ? ORM code style
    this.orm = new R2dbcEntityTemplate(factory);
    // ? low level code SQL
    this.sqlClient = orm.getDatabaseClient();
    // ? transaction manager for commit/rollback
    this.trxMng = TransactionalOperator.create(new R2dbcTransactionManager(factory));
  }

}
