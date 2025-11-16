package server.models.comments;

import java.util.UUID;

import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.RequiredArgsConstructor;
import server.models.RootTable;

@Data
@EqualsAndHashCode(callSuper = true)
@RequiredArgsConstructor
@Table("comments")
public class Comment extends RootTable {

  @Column("content")
  private final String content;

  @Column("user_id")
  private final UUID userId;

  @Column("feedback_id")
  private final UUID feedbackId;

  @Override
  public String toString() {
    return reflectiveToString();
  }

}
