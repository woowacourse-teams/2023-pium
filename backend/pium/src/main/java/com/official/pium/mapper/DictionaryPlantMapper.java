package com.official.pium.mapper;

import com.official.pium.domain.DictionaryPlant;
import com.official.pium.domain.WaterCycle;
import com.official.pium.service.dto.DictionaryPlantCreateRequest;
import com.official.pium.service.dto.DictionaryPlantResponse;
import com.official.pium.service.dto.DictionaryPlantResponse.WaterCycleResponse;
import com.official.pium.service.dto.DictionaryPlantSearchResponse;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class DictionaryPlantMapper {

    public static DictionaryPlantResponse toDictionaryPlantResponse(DictionaryPlant dictionaryPlant) {
        return DictionaryPlantResponse.builder()
                .id(dictionaryPlant.getId())
                .name(dictionaryPlant.getName())
                .image(dictionaryPlant.getImageUrl())
                .familyName(dictionaryPlant.getFamilyName())
                .smell(dictionaryPlant.getSmell())
                .poison(dictionaryPlant.getPoison())
                .manageLevel(dictionaryPlant.getManageLevel())
                .growSpeed(dictionaryPlant.getGrowSpeed())
                .requireTemp(dictionaryPlant.getRequireTemp())
                .minimumTemp(dictionaryPlant.getMinimumTemp())
                .requireHumidity(dictionaryPlant.getRequireHumidity())
                .postingPlace(dictionaryPlant.getPostingPlace())
                .specialManageInfo(dictionaryPlant.getSpecialManageInfo())
                .waterCycle(toWaterCycleResponse(dictionaryPlant.getWaterCycle()))
                .build();
    }

    private static WaterCycleResponse toWaterCycleResponse(WaterCycle waterCycle) {
        return WaterCycleResponse.builder()
                .spring(waterCycle.getSpring())
                .summer(waterCycle.getSummer())
                .autumn(waterCycle.getAutumn())
                .winter(waterCycle.getWinter())
                .build();
    }

    public static DictionaryPlantSearchResponse toDictionaryPlantSearchResponse(DictionaryPlant dictionaryPlant) {
        return DictionaryPlantSearchResponse.builder()
                .id(dictionaryPlant.getId())
                .name(dictionaryPlant.getName())
                .image(dictionaryPlant.getImageUrl())
                .build();
    }

    public static DictionaryPlant toDictionaryPlant(DictionaryPlantCreateRequest createRequest) {
        return DictionaryPlant.builder()
                .name(createRequest.getName())
                .imageUrl(createRequest.getImageUrl())
                .familyName(createRequest.getFamilyName())
                .smell(createRequest.getSmell())
                .poison(createRequest.getPoison())
                .manageLevel(createRequest.getManageLevel())
                .growSpeed(createRequest.getGrowSpeed())
                .requireTemp(createRequest.getRequireTemp())
                .minimumTemp(createRequest.getMinimumTemp())
                .requireHumidity(createRequest.getRequireHumidity())
                .postingPlace(createRequest.getPostingPlace())
                .specialManageInfo(createRequest.getSpecialManageInfo())
                .waterCycle(
                        WaterCycle.builder()
                                .spring(createRequest.getSpring())
                                .summer(createRequest.getSummer())
                                .autumn(createRequest.getAutumn())
                                .winter(createRequest.getWinter())
                                .build()
                )
                .build();
    }
}
