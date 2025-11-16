package server.models.feedbacks;

import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import server.models.RootTable;
import server.models.feedbacks.etc.types.FeedCatT;
import server.models.feedbacks.etc.types.FeedStatT;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Table("feedbacks")
public final class Feedback extends RootTable {

  @Column("title")
  private String title;

  @Column("description")
  private String description;

  @Column("category")
  private FeedCatT category;

  @Column("status")
  private FeedStatT status;

  @Column("upvotes")
  private int upvotes;

  public Feedback(String title, String description, FeedCatT category, FeedStatT status) {
    this.title = title;
    this.description = description;
    this.upvotes = 0;
    this.category = category;
    this.status = status;
  }

  @Override
  public final String toString() {
    return reflectiveToString();
  }

}
