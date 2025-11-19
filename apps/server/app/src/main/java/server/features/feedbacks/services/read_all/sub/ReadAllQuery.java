package server.features.feedbacks.services.read_all.sub;

//CHECKSTYLE:OFF
public class ReadAllQuery {
  public static final String getQuery() {
    StringBuilder sb = new StringBuilder();
    sb.append("""
        SELECT f.*,
          COALESCE(
            (
              SELECT JSON_AGG(c_agg ORDER BY c_agg.created_at DESC)
              FROM (
                SELECT c.*,

                    (
                      SELECT ROW_TO_JSON(u_obj)
                      FROM (
                        SELECT u.*,
                        (
                          SELECT ROW_TO_JSON(im_obj)
                          FROM (
                            SELECT im.*
                            FROM images im
                              WHERE im.user_id = u.id
                          ) im_obj
                        ) image
                        FROM users u
                          WHERE c.user_id = u.id
                          LIMIT 1
                      ) u_obj
                    ) user,

                  COALESCE(
                  (
                    SELECT JSON_AGG(r_agg ORDER BY r_agg.created_at DESC)
                    FROM (
                      SELECT r.*,
                        (
                          SELECT ROW_TO_JSON(u_obj)
                          FROM (
                            SELECT u.*,

                            (
                            SELECT ROW_TO_JSON(im_obj)
                            FROM (
                              SELECT im.*
                              FROM images im
                                WHERE im.user_id = u.id
                              ) im_obj
                            ) image

                            FROM users u
                              WHERE r.user_id = u.id
                          ) u_obj
                        ) user,

                        (
                          SELECT ROW_TO_JSON(rt_obj)
                          FROM (
                            SELECT rt.*,

                            (
                            SELECT ROW_TO_JSON(im_obj)
                            FROM (
                              SELECT im.*
                              FROM images im
                                WHERE im.user_id = rt.id
                              ) im_obj
                            ) image

                            FROM users rt
                              WHERE r.replying_to = rt.id
                          ) rt_obj
                        ) replying_to

                      FROM replies r
                        WHERE r.comment_id = c.id
                    ) r_agg
                  )
                  ,'[]'::JSON
                  ) replies

                FROM comments c
                  WHERE c.feedback_id = f.id
              ) c_agg
            )
            ,'[]'::JSON
          ) comments
        FROM feedbacks f;
                  """);

    return sb.toString();

  }
}
