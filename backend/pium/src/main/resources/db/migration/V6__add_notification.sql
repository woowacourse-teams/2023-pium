ALTER TABLE member ADD COLUMN device_token VARCHAR(255) UNIQUE;

CREATE TABLE notification
(
    id        BIGINT AUTO_INCREMENT NOT NULL,
    member_id BIGINT                NULL,
    title     VARCHAR(255)          NULL,
    body      VARCHAR(255)          NULL,
    CONSTRAINT pk_notification PRIMARY KEY (id)
);

ALTER TABLE notification
    ADD CONSTRAINT FK_NOTIFICATION_ON_MEMBER FOREIGN KEY (member_id) REFERENCES member (id);
