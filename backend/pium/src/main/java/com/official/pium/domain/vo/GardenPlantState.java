package com.official.pium.domain.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GardenPlantState {

    @NotBlank
    @Column(name = "location", nullable = false)
    private String location;

    @NotBlank
    @Column(name = "flowerpot", nullable = false)
    private String flowerpot;

    @NotBlank
    @Column(name = "light", nullable = false)
    private String light;

    @NotBlank
    @Column(name = "wind", nullable = false)
    private String wind;

    @Builder
    private GardenPlantState(String location, String flowerpot, String light, String wind) {
        this.location = location;
        this.flowerpot = flowerpot;
        this.light = light;
        this.wind = wind;
    }
}
