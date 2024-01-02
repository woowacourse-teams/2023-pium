package com.official.pium.petPlant.domain.vo;

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
public class PetPlantState {

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
    private PetPlantState(String location, String flowerpot, String light, String wind) {
        validateEmptyValue(location);
        validateEmptyValue(flowerpot);
        validateEmptyValue(light);
        validateEmptyValue(wind);
        this.location = location;
        this.flowerpot = flowerpot;
        this.light = light;
        this.wind = wind;
    }

    private void validateEmptyValue(String value) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("반려 식물 속성에는 빈 값 들어올 수 없습니다. value: " + value);
        }
    }
}
