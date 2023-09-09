package com.official.pium.service.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class DictionaryPlantCreateRequest {

    private String name;
    private String imageUrl;
    private String familyName;
    private String smell;
    private String poison;
    private String manageLevel;
    private String growSpeed;
    private String requireTemp;
    private String minimumTemp;
    private String requireHumidity;
    private String postingPlace;
    private String specialManageInfo;
    private String spring;
    private String summer;
    private String autumn;
    private String winter;
}
