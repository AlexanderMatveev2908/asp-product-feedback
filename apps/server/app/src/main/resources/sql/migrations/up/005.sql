DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'CATEGORY_TYPE') THEN
        CREATE TYPE CATEGORY_TYPE AS ENUM (
            'ui',
            'ux',
            'feature',
            'enhancement',
            'bug'
        );
    END IF;
END$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'STATUS_TYPE') THEN
        CREATE TYPE STATUS_TYPE AS ENUM (
            'suggestion',
            'planned',
            'in_progress',
            'live'
        );
    END IF;
END$$;

CREATE TABLE IF NOT EXISTS feedbacks (
  title VARCHAR(100) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  upvotes INTEGER NOT NULL,
  category CATEGORY_TYPE NOT NULL,
  status STATUS_TYPE NOT NULL DEFAULT 'suggestion'
) INHERITS (root_table);

ALTER TABLE feedbacks
    ADD CONSTRAINT feedbacks_pkey PRIMARY KEY (id);

CREATE TRIGGER trigger_timestamp_feedbacks
BEFORE INSERT OR UPDATE ON feedbacks
FOR EACH ROW
EXECUTE FUNCTION trigger_timestamp();