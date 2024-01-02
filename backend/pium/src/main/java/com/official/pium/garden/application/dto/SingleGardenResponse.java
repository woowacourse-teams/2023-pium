package com.official.pium.garden.application.dto;

import com.official.pium.garden.domain.Garden;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

    public static SingleGardenResponse from(Garden garden) {
        return SingleGardenResponse.builder()
                .id(garden.getId())
                .createdAt(garden.getCreatedAt())
                .updatedAt(garden.getUpdatedAt())
                .dictionaryPlantName(garden.getDictionaryPlant().getClassification()
                        .getName())
                .content(garden.getContent())
                .manageLevel(garden.getManageLevel())
                .petPlant(toPetPlantInfo(garden))
                .build();
    }

    private static SingleGardenResponse.PetPlantInfo toPetPlantInfo(Garden garden) {
        return SingleGardenResponse.PetPlantInfo.builder()
                .imageUrl(garden.getImageUrl())
                .nickname(garden.getNickname())
                .location(garden.getGardenPlantState().getLocation())
                .flowerpot(garden.getGardenPlantState().getFlowerpot())
                .light(garden.getGardenPlantState().getLight())
                .wind(garden.getGardenPlantState().getWind())
                .daySince(garden.getDaySince())
                .waterCycle(garden.getWaterCycle())
                .build();
    }

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
        private PetPlantInfo(String imageUrl, String nickname, String location, String flowerpot, String light,
                             String wind, Long daySince, Integer waterCycle) {
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
