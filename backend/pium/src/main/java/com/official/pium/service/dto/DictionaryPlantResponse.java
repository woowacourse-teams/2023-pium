package com.official.pium.service.dto;

import java.util.Arrays;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class DictionaryPlantResponse {

    private Long id;
    private String name;
    private String image;
    private String familyName;
    private String smell;
    private String poison;
    private String manageLevel;
    private String growSpeed;
    private String requireTemp;
    private String minimumTemp;
    private String requireHumidity;
    private List<String> postingPlace;
    private String specialManageInfo;
    private WaterCycleResponse waterCycle;

    @Builder
    private DictionaryPlantResponse(Long id, String name, String image, String familyName, String smell, String poison,
                                    String manageLevel, String growSpeed, String requireTemp, String minimumTemp,
                                    String requireHumidity, String postingPlace, String specialManageInfo,
                                    WaterCycleResponse waterCycle) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.familyName = familyName;
        this.smell = smell;
        this.poison = poison;
        this.manageLevel = manageLevel;
        this.growSpeed = growSpeed;
        this.requireTemp = requireTemp;
        this.minimumTemp = minimumTemp;
        this.requireHumidity = requireHumidity;
        this.postingPlace = Arrays.asList(postingPlace.split(","));
        this.specialManageInfo = specialManageInfo;
        this.waterCycle = waterCycle;
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class WaterCycleResponse {

        private String spring;
        private String summer;
        private String autumn;
        private String winter;

        @Builder
        private WaterCycleResponse(String spring, String summer, String autumn, String winter) {
            this.spring = spring;
            this.summer = summer;
            this.autumn = autumn;
            this.winter = winter;
        }
    }
}
