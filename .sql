          SELECT f.*,
            COALESCE(
              (
                SELECT JSON_AGG(c_agg ORDER BY c_agg.created_at DESC)
                FROM (
                  SELECT c.*,

                      (
                        SELECT ROW_TO_JSON(u_obj)
                        FROM (
                          SELECT u.*
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
                              SELECT u.*
                              FROM users u
                                WHERE r.user_id = u.id
                            ) u_obj
                          ) user
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