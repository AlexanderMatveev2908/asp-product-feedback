package server.models.replies;

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
@Table("replies")
public class Reply extends RootTable {

  @Column("user_id")
  private final UUID userId;

  @Column("replying_to")
  private final UUID replyingTo;

  @Column("comment_id")
  private final UUID commentId;

  @Column("content")
  private final String content;

  @Override
  public String toString() {
    return reflectiveToString();
  }
}
