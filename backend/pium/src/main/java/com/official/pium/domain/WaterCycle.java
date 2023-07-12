package com.official.pium.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
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
}
