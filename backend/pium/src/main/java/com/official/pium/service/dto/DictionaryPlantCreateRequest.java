package com.official.pium.service.dto;

import com.official.pium.domain.DictionaryPlant;
import com.official.pium.domain.vo.WaterCycle;
import com.official.pium.domain.vo.CareDetail;
import com.official.pium.domain.vo.Classification;
import com.official.pium.domain.vo.Property;
import com.official.pium.domain.vo.Temperature;
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

    public DictionaryPlant toDictionaryPlant() {
        return DictionaryPlant.builder()
                .imageUrl(this.imageUrl)
                .classification(toClassification())
                .property(toProperty())
                .careDetail(toCareDetail())
                .build();
    }

    private Classification toClassification() {
        return Classification.builder()
                .name(this.name)
                .familyName(this.familyName)
                .build();
    }

    private Property toProperty() {
        return Property.builder()
                .smell(this.smell)
                .poison(this.poison)
                .manageLevel(this.manageLevel)
                .growSpeed(this.growSpeed)
                .build();
    }

    private CareDetail toCareDetail() {
        return CareDetail.builder()
                .temperature(toTemperature())
                .requireHumidity(this.requireHumidity)
                .postingPlace(this.postingPlace)
                .specialManageInfo(this.specialManageInfo)
                .waterCycle(toWaterCycle())
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
