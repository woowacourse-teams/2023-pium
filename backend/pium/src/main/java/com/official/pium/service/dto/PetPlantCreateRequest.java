package com.official.pium.service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class PetPlantCreateRequest {

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
    @PastOrPresent(message = "입양일은 과거 또는 현재의 날짜여야 합니다. birthDate: ${validatedValue}")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;

    @NotNull
    @PastOrPresent(message = "마지막 물주기 날짜는 과거 또는 현재의 날짜여야 합니다. lastWaterDate: ${validatedValue}")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate lastWaterDate;
}
