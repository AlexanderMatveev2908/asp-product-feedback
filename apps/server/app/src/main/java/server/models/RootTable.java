package server.models;

import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;

import lombok.Data;
import server.decorators.RootCls;

@Data
public class RootTable implements RootCls {

  @Id
  protected UUID id;

  @Column("created_at")
  protected long createdAt;

  @Column("updated_at")
  protected long updatedAt;

  @Column("deleted_at")
  protected Long deletedAt;

}
