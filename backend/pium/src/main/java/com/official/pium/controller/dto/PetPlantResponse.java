package com.official.pium.controller.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class PetPlantResponse {

    private Long id;
    private String nickname;
    private String imageUrl;
    private String location;
    private String flowerpot;
    private String light;
    private String wind;
    private Integer waterCycle;
    private Long nextWaterDay;
    private Long daySince;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate lastWaterDate;

    private DictionaryPlantResponse dictionaryPlant;

    @Builder
    private PetPlantResponse(Long id, String nickname, String imageUrl, String location, String flowerpot, String light, String wind, LocalDate birthDate, LocalDate lastWaterDate, Integer waterCycle, Long nextWaterDay, Long daySince, DictionaryPlantResponse dictionaryPlant) {
        this.id = id;
        this.nickname = nickname;
        this.imageUrl = imageUrl;
        this.location = location;
        this.flowerpot = flowerpot;
        this.light = light;
        this.wind = wind;
        this.birthDate = birthDate;
        this.lastWaterDate = lastWaterDate;
        this.waterCycle = waterCycle;
        this.nextWaterDay = nextWaterDay;
        this.daySince = daySince;
        this.dictionaryPlant = dictionaryPlant;
    }

    @Getter
    @NoArgsConstructor
    public static class DictionaryPlantResponse {

        private Long id;
        private String name;

        @Builder
        private DictionaryPlantResponse(Long id, String name) {
            this.id = id;
            this.name = name;
        }
    }
}
