DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'category_type') THEN
        CREATE TYPE category_type AS ENUM (
            'UI',
            'UX',
            'FEATURE',
            'ENHANCEMENT',
            'BUG'
        );
    END IF;
END$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status_type') THEN
        CREATE TYPE status_type AS ENUM (
            'SUGGESTION',
            'PLANNED',
            'IN_PROGRESS',
            'LIVE'
        );
    END IF;
END$$;


CREATE TABLE IF NOT EXISTS feedbacks (
  title VARCHAR(100) NOT NULL,
  description VARCHAR(250) NOT NULL,
  upvotes INTEGER NOT NULL DEFAULT 0,
  category category_type NOT NULL,
  status status_type NOT NULL DEFAULT 'suggestion'
) INHERITS (root_table);

ALTER TABLE feedbacks
    ADD CONSTRAINT feedbacks_pkey PRIMARY KEY (id);

CREATE TRIGGER trigger_timestamp_feedbacks
BEFORE INSERT OR UPDATE ON feedbacks
FOR EACH ROW
EXECUTE FUNCTION trigger_timestamp();