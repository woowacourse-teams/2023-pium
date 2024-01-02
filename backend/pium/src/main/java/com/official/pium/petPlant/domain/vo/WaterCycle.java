package com.official.pium.petPlant.domain.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class WaterCycle {

    @Column(name = "water_cycle_spring")
    private String spring;

    @Column(name = "water_cycle_summer")
    private String summer;

    @Column(name = "water_cycle_autumn")
    private String autumn;

    @Column(name = "water_cycle_winter")
    private String winter;

    @Builder
    private WaterCycle(String spring, String summer, String autumn, String winter) {
        this.spring = spring;
        this.summer = summer;
        this.autumn = autumn;
        this.winter = winter;
    }
}
