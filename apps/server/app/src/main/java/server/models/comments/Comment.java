package server.models.comments;

import java.util.UUID;

import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import server.models.RootTable;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@Table("comments")
public class Comment extends RootTable {

  @Column("content")
  private String content;

  @Column("user_id")
  private UUID userId;

  @Column("feedback_id")
  private UUID feedbackId;

  @Override
  public String toString() {
    return reflectiveToString();
  }

}
