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
public class DictionaryPlantCreateRequest {

    @NotNull(message = "name은 비어있을 수 없습니다 name: ${validatedValue}")
    private String name;

    @NotNull(message = "imageUrl은 비어있을 수 없습니다 imageUrl: ${validatedValue}")
    private String imageUrl;

    @NotNull(message = "familyName은 비어있을 수 없습니다 familyName: ${validatedValue}")
    private String familyName;

    @NotNull(message = "smell은 비어있을 수 없습니다 smell: ${validatedValue}")
    private String smell;

    @NotNull(message = "poison은 비어있을 수 없습니다 poison: ${validatedValue}")
    private String poison;

    @NotNull(message = "manageLevel은 비어있을 수 없습니다 manageLevel: ${validatedValue}")
    private String manageLevel;

    @NotNull(message = "growSpeed은 비어있을 수 없습니다 growSpeed: ${validatedValue}")
    private String growSpeed;

    @NotNull(message = "requireTemp은 비어있을 수 없습니다 requireTemp: ${validatedValue}")
    private String requireTemp;

    @NotNull(message = "minimumTemp은 비어있을 수 없습니다 minimumTemp: ${validatedValue}")
    private String minimumTemp;

    @NotNull(message = "requireHumidity은 비어있을 수 없습니다 requireHumidity: ${validatedValue}")
    private String requireHumidity;

    @NotNull(message = "postingPlace은 비어있을 수 없습니다 postingPlace: ${validatedValue}")
    private String postingPlace;

    @NotNull(message = "specialManageInfo은 비어있을 수 없습니다 specialManageInfo: ${validatedValue}")
    private String specialManageInfo;

    @NotNull(message = "spring은 비어있을 수 없습니다 spring: ${validatedValue}")
    private String spring;

    @NotNull(message = "summer은 비어있을 수 없습니다 summer: ${validatedValue}")
    private String summer;

    @NotNull(message = "autumn은 비어있을 수 없습니다 autumn: ${validatedValue}")
    private String autumn;

    @NotNull(message = "winter은 비어있을 수 없습니다 winter: ${validatedValue}")
    private String winter;
}
