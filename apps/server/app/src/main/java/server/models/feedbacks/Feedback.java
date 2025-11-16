package server.models.feedbacks;

import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.RequiredArgsConstructor;
import server.models.RootTable;
import server.models.feedbacks.etc.types.FeedCatT;
import server.models.feedbacks.etc.types.FeedStatT;

@Data
@EqualsAndHashCode(callSuper = true)
@RequiredArgsConstructor
@Table("feedbacks")
public class Feedback extends RootTable {

  @Column("title")
  private final String title;

  @Column("description")
  private final String description;

  @Column("category")
  private final FeedCatT category;

  @Column("status")
  private final FeedStatT status;

  @Column("upvotes")
  private final int upvotes;

  @Override
  public String toString() {
    return reflectiveToString();
  }

}
