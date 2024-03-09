package com.official.pium.dictionaryPlant.application.dto;

import com.official.pium.dictionaryPlant.domain.vo.CareDetail;
import com.official.pium.dictionaryPlant.domain.vo.Classification;
import com.official.pium.dictionaryPlant.domain.vo.Property;
import com.official.pium.petPlant.domain.vo.Temperature;
import com.official.pium.petPlant.domain.vo.WaterCycle;
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

    public Classification toClassification() {
        return Classification.builder()
                .name(this.name)
                .familyName(this.familyName)
                .build();
    }

    public Property toProperty() {
        return Property.builder()
                .smell(this.smell)
                .poison(this.poison)
                .manageLevel(this.manageLevel)
                .growSpeed(this.growSpeed)
                .build();
    }

    public CareDetail toCareDetail() {
        return CareDetail.builder()
                .temperature(
                        toTemperature()
                )
                .requireHumidity(
                        this.requireHumidity
                )
                .postingPlace(
                        this.postingPlace
                )
                .specialManageInfo(
                        this.specialManageInfo
                )
                .waterCycle(
                        toWaterCycle()
                )
                .build();
    }

    private WaterCycle toWaterCycle() {
        return WaterCycle.builder()
                .spring(this.spring)
                .summer(this.summer)
                .autumn(this.autumn)
                .winter(this.winter)
                .build();
    }

    private Temperature toTemperature() {
        return Temperature.builder()
                .minimumTemp(this.minimumTemp)
                .requireTemp(this.requireTemp)
                .build();
    }
}
