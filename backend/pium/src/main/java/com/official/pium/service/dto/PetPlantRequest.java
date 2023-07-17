package com.official.pium.service.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
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
}
