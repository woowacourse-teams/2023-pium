CREATE TABLE IF NOT EXISTS session_group
(
    id                  BIGINT AUTO_INCREMENT NOT NULL,
    session_id          VARCHAR(255)          NOT NULL,
    session_key         VARCHAR(255)          NOT NULL,
    session_value       VARCHAR(255)          NOT NULL,
    created_at          DATETIME              NOT NULL,
    updated_at          DATETIME              NOT NULL,
    expire_time         DATETIME              NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE session_group
ADD CONSTRAINT uniq_sessions UNIQUE(session_id, session_key);
