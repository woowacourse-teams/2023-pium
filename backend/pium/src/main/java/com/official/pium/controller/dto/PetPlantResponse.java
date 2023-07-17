package com.official.pium.controller.dto;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
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
