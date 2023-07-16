package com.official.pium.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
@Builder
@AllArgsConstructor
public class PetPlantResponse {

    private final Long id;
    private final String nickname;
    private final String imageUrl;
    private final String location;
    private final String flowerpot;
    private final String light;
    private final String wind;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private final LocalDate birthDate;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private final LocalDate lastWaterDate;

    private final Integer waterCycle;
    private final Long nextWaterDay;
    private final Long daySince;

    private final DictionaryPlantResponse dictionaryPlant;

    @Getter
    @Builder
    @AllArgsConstructor
    public static class DictionaryPlantResponse {
        private final Long id;
        private final String name;
    }
}
