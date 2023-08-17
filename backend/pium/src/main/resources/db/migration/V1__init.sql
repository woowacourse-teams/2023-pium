create TABLE IF NOT EXISTS dictionary_plant
(
    id                  BIGINT AUTO_INCREMENT NOT NULL,
    name                VARCHAR(255)          NULL,
    image_url           TEXT                  NULL,
    family_name         VARCHAR(255)          NULL,
    smell               VARCHAR(255)          NULL,
    poison              VARCHAR(255)          NULL,
    manage_level        VARCHAR(255)          NULL,
    grow_speed          VARCHAR(255)          NULL,
    require_temp        VARCHAR(255)          NULL,
    minimum_temp        VARCHAR(255)          NULL,
    require_humidity    VARCHAR(255)          NULL,
    posting_place       VARCHAR(255)          NULL,
    special_manage_info TEXT                  NULL,
    water_cycle_spring  VARCHAR(255)          NULL,
    water_cycle_summer  VARCHAR(255)          NULL,
    water_cycle_autumn  VARCHAR(255)          NULL,
    water_cycle_winter  VARCHAR(255)          NULL,
    created_at          DATETIME              NOT NULL,
    updated_at          DATETIME              NOT NULL,
    CONSTRAINT pk_dictionary_plant PRIMARY KEY (id)
);

create TABLE IF NOT EXISTS member
(
    id         BIGINT AUTO_INCREMENT NOT NULL,
    kakao_id   BIGINT                NOT NULL,
    email      VARCHAR(255)          NOT NULL,
    created_at DATETIME              NOT NULL,
    updated_at DATETIME              NOT NULL,
    CONSTRAINT pk_member PRIMARY KEY (id)
);

create TABLE IF NOT EXISTS pet_plant
(
    id                  BIGINT AUTO_INCREMENT NOT NULL,
    member_id           BIGINT                NULL,
    dictionary_plant_id BIGINT                NULL,
    nickname            VARCHAR(255)          NOT NULL,
    image_url           TEXT                  NOT NULL,
    location            VARCHAR(255)          NOT NULL,
    flowerpot           VARCHAR(255)          NOT NULL,
    light               VARCHAR(255)          NOT NULL,
    wind                VARCHAR(255)          NOT NULL,
    birth_date          DATE                  NOT NULL,
    next_water_date     DATE                  NOT NULL,
    last_water_date     DATE                  NOT NULL,
    water_cycle         INT                   NOT NULL,
    created_at          DATETIME              NOT NULL,
    updated_at          DATETIME              NOT NULL,
    CONSTRAINT pk_pet_plant PRIMARY KEY (id)
);

create TABLE IF NOT EXISTS history
(
    id                  BIGINT AUTO_INCREMENT NOT NULL,
    pet_plant_id        BIGINT                NOT NULL,
    history_category_id BIGINT                NOT NULL,
    event_date          DATE                  NOT NULL,
    prev                VARCHAR(255)          NOT NULL,
    curr                VARCHAR(255)          NOT NULL,
    created_at          DATETIME              NOT NULL,
    updated_at          DATETIME              NOT NULL,
    CONSTRAINT pk_history PRIMARY KEY (id)
);

create TABLE IF NOT EXISTS history_category
(
    id           BIGINT AUTO_INCREMENT NOT NULL,
    history_type VARCHAR(255)          NOT NULL,
    created_at   DATETIME              NOT NULL,
    updated_at   DATETIME              NOT NULL,
    CONSTRAINT pk_history_category PRIMARY KEY (id)
);



alter table pet_plant
    add CONSTRAINT FK_PET_PLANT_ON_DICTIONARY_PLANT FOREIGN KEY (dictionary_plant_id) REFERENCES dictionary_plant (id);

alter table pet_plant
    add CONSTRAINT FK_PET_PLANT_ON_MEMBER FOREIGN KEY (member_id) REFERENCES member (id);

alter table history
    add CONSTRAINT FK_HISTORY_ON_PET_PLANT FOREIGN KEY (pet_plant_id) REFERENCES pet_plant (id);

alter table history
    add CONSTRAINT FK_HISTORY_ON_HISTORY_CATEGORY FOREIGN KEY (history_category_id) REFERENCES history_category (id);

ALTER TABLE member
    ADD UNIQUE (kakao_id);
