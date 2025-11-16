package server.models.users;

import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.RequiredArgsConstructor;
import server.models.RootTable;

@Data
@EqualsAndHashCode(callSuper = true)
@RequiredArgsConstructor
@Table("users")
public class User extends RootTable {

  @Column("name")
  private final String name;

  @Column("username")
  private final String username;

  @Override
  public String toString() {
    return reflectiveToString();
  }
}
