ALTER TABLE history_category DROP COLUMN created_at;
ALTER TABLE history_category DROP COLUMN updated_at;

ALTER TABLE history_category ADD UNIQUE (history_type);
