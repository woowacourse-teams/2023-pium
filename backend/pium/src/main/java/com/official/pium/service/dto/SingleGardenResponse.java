package com.official.pium.service.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class SingleGardenResponse {

    private Long id;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String dictionaryPlantName;
    private String content;
    private String manageLevel;
    private PetPlantInfo petPlant;

    @Getter
    @NoArgsConstructor
    public static class PetPlantInfo {

        private String imageUrl;
        private String nickname;
        private String location;
        private String flowerpot;
        private String light;
        private String wind;
        private Long daySince;
        private Integer waterCycle;

        @Builder
        private PetPlantInfo(String imageUrl, String nickname, String location, String flowerpot, String light, String wind, Long daySince, Integer waterCycle) {
            this.imageUrl = imageUrl;
            this.nickname = nickname;
            this.location = location;
            this.flowerpot = flowerpot;
            this.light = light;
            this.wind = wind;
            this.daySince = daySince;
            this.waterCycle = waterCycle;
        }
    }
}