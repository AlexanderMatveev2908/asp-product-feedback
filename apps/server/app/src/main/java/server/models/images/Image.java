package server.models.images;

import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.RequiredArgsConstructor;
import server.models.RootTable;

@Data
@EqualsAndHashCode(callSuper = true)
@RequiredArgsConstructor
@Table("images")
public class Image extends RootTable {

  @Column("public_id")
  private final String publicId;

  @Column("url")
  private final String url;

  @Override
  public String toString() {
    return reflectiveToString();
  }
}
