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
public class Classification {

    @Column(name = "name")
    private String name;

    @Column(name = "family_name")
    private String familyName;

    @Builder
    private Classification(String name, String familyName) {
        this.name = name;
        this.familyName = familyName;
    }
}
