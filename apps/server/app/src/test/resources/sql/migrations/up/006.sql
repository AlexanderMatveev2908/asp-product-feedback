CREATE TABLE IF NOT EXISTS comments (
  content VARCHAR(1000) NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id),
  feedback_id UUID NOT NULL REFERENCES feedbacks(id)
) INHERITS (root_table);

ALTER TABLE comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);

CREATE INDEX idx__comments__user ON comments(user_id);
CREATE INDEX idx__comments__feedback ON comments(feedback_id);

CREATE TRIGGER trigger_timestamp_comments
BEFORE INSERT OR UPDATE ON comments
FOR EACH ROW
EXECUTE FUNCTION trigger_timestamp();
