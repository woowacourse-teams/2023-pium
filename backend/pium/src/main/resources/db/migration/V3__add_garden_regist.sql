CREATE TABLE garden
(
    id                  BIGINT AUTO_INCREMENT NOT NULL,
    dictionary_plant_id BIGINT                NULL,
    member_id           BIGINT                NULL,
    content             VARCHAR(500)          NOT NULL,
    nickname            VARCHAR(255)          NOT NULL,
    image_url           VARCHAR(255)          NOT NULL,
    location            VARCHAR(255)          NOT NULL,
    flowerpot           VARCHAR(255)          NOT NULL,
    light               VARCHAR(255)          NOT NULL,
    wind                VARCHAR(255)          NOT NULL,
    day_since           INT                   NOT NULL,
    water_cycle         INT                   NOT NULL,
    manage_level        VARCHAR(255)          NOT NULL,
    created_at          DATETIME              NOT NULL,
    updated_at          DATETIME              NOT NULL,
    CONSTRAINT pk_garden PRIMARY KEY (id)
);

CREATE TABLE registration
(
    id         BIGINT AUTO_INCREMENT NOT NULL,
    plant_name VARCHAR(255)          NULL,
    image_url  VARCHAR(255)          NULL,
    created_at DATETIME              NOT NULL,
    updated_at DATETIME              NOT NULL,
    CONSTRAINT pk_registration PRIMARY KEY (id)
);

ALTER TABLE garden
    ADD CONSTRAINT FK_GARDEN_ON_DICTIONARY_PLANT FOREIGN KEY (dictionary_plant_id) REFERENCES dictionary_plant (id);

ALTER TABLE garden
    ADD CONSTRAINT FK_GARDEN_ON_MEMBER FOREIGN KEY (member_id) REFERENCES member (id);
