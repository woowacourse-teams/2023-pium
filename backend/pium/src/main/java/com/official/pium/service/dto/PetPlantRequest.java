package com.official.pium.service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class PetPlantRequest {

    @NotNull
    private Long dictionaryPlantId;

    @NotBlank
    private String nickname;

    @NotBlank
    private String location;

    @NotBlank
    private String flowerpot;

    @NotNull
    private Integer waterCycle;

    @NotBlank
    private String light;

    @NotBlank
    private String wind;

    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;

    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate lastWaterDate;
}
