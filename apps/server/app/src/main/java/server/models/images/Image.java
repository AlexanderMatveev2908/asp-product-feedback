package server.models.images;

import java.util.UUID;

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
@Table("images")
public final class Image extends RootTable {

  @Column("public_id")
  private String publicId;

  @Column("url")
  private String url;

  @Column("user_id")
  private UUID userId;

  @Override
  public final String toString() {
    return reflectiveToString();
  }
}
