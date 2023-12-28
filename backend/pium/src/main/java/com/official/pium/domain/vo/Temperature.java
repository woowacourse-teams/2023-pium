package com.official.pium.domain.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Temperature {

    @Column(name = "require_temp")
    private String requireTemp;

    @Column(name = "minimum_temp")
    private String minimumTemp;

    @Builder
    public Temperature(String requireTemp, String minimumTemp) {
        this.requireTemp = requireTemp;
        this.minimumTemp = minimumTemp;
    }
}
