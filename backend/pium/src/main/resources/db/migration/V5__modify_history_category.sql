ALTER TABLE history_category DROP COLUMN created_at;
ALTER TABLE history_category DROP COLUMN updated_at;

ALTER TABLE history_category ADD history_type VARCHAR(255) UNIQUE;
