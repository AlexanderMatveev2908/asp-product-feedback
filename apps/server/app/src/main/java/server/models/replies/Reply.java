package server.models.replies;

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
@Table("replies")
public final class Reply extends RootTable {

  @Column("user_id")
  private UUID userId;

  @Column("replying_to")
  private UUID replyingTo;

  @Column("comment_id")
  private UUID commentId;

  @Column("content")
  private String content;

  @Override
  public final String toString() {
    return reflectiveToString();
  }
}
