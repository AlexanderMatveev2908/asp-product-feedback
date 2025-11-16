package server.models;

import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import server.decorators.etc.RootCls;

@Data
@AllArgsConstructor
@NoArgsConstructor
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
