CREATE TABLE IF NOT EXISTS images (
  public_id VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,
  user_id UUID NOT NULL UNIQUE REFERENCES users(id)
) INHERITS (root_table);

ALTER TABLE images
    ADD CONSTRAINT images_pkey PRIMARY KEY (id);

CREATE INDEX idx__images_user ON images(user_id);

CREATE TRIGGER trigger_timestamp_images
BEFORE INSERT OR UPDATE ON images
FOR EACH ROW
EXECUTE FUNCTION trigger_timestamp();