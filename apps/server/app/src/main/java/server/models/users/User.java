package server.models.users;

import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import server.models.RootTable;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Table("users")
public final class User extends RootTable {

  @Column("name")
  private String name;

  @Column("username")
  private String username;

  @Override
  public final String toString() {
    return reflectiveToString();
  }
}
