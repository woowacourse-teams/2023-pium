package com.official.pium.dictionaryPlant.domain.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Property {

    @Column(name = "smell")
    private String smell;

    @Column(name = "poison")
    private String poison;

    @Column(name = "manage_level")
    private String manageLevel;

    @Column(name = "grow_speed")
    private String growSpeed;

    @Builder
    private Property(String smell, String poison, String manageLevel, String growSpeed) {
        this.smell = smell;
        this.poison = poison;
        this.manageLevel = manageLevel;
        this.growSpeed = growSpeed;
    }
}
