CREATE TABLE IF NOT EXISTS replies (
  content VARCHAR(1000) NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id),
  replying_to UUID NOT NULL REFERENCES users(id),
  comment_id UUID NOT NULL REFERENCES comments(id)
  ) INHERITS (root_table);

ALTER TABLE replies
    ADD CONSTRAINT replies_pkey PRIMARY KEY (id);

CREATE INDEX idx__replies__author ON replies(user_id);
CREATE INDEX idx__replies__recipient ON replies(replying_to);
CREATE INDEX idx__replies__comment ON replies(comment_id);

CREATE TRIGGER trigger_timestamp_replies
BEFORE INSERT OR UPDATE ON replies
FOR EACH ROW
EXECUTE FUNCTION trigger_timestamp();
