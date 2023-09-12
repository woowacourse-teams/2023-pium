package com.official.pium.service.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class DictionaryPlantUpdateRequest {

    @NotNull
    private String name;

    @NotNull
    private String imageUrl;

    @NotNull
    private String familyName;

    @NotNull
    private String smell;

    @NotNull
    private String poison;

    @NotNull
    private String manageLevel;

    @NotNull
    private String growSpeed;

    @NotNull
    private String requireTemp;

    @NotNull
    private String minimumTemp;

    @NotNull
    private String requireHumidity;

    @NotNull
    private String postingPlace;

    @NotNull
    private String specialManageInfo;

    @NotNull
    private String spring;

    @NotNull
    private String summer;

    @NotNull
    private String autumn;

    @NotNull
    private String winter;
}
