package com.official.pium.controller.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class PetPlantRequest {

    private Long dictionaryPlantId;

    @NotBlank
    private String nickname;

    @NotBlank
    private String location;

    @NotBlank
    private String flowerpot;

    private Integer waterCycle;

    @NotBlank
    private String light;

    @NotBlank
    private String wind;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate lastWaterDate;

    @Builder
    private PetPlantRequest(@NotNull Long dictionaryPlantId, String nickname, String location, String flowerpot, @NotNull Integer waterCycle, String light, String wind, @NotNull LocalDate birthDate, @NotNull LocalDate lastWaterDate) {
        this.dictionaryPlantId = dictionaryPlantId;
        this.nickname = nickname;
        this.location = location;
        this.flowerpot = flowerpot;
        this.waterCycle = waterCycle;
        this.light = light;
        this.wind = wind;
        this.birthDate = birthDate;
        this.lastWaterDate = lastWaterDate;
    }
}
