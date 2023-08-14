package com.official.pium.service.dto;

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
public class PetPlantResponse {

    private Long id;
    private String nickname;
    private String imageUrl;
    private String location;
    private String flowerpot;
    private String light;
    private String wind;
    private Integer waterCycle;
    private Long daySince;
    private Long dday;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate lastWaterDate;
    
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate secondLastWaterDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate nextWaterDate;

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
