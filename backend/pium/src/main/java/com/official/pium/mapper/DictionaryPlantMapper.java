package com.official.pium.mapper;

import com.official.pium.domain.DictionaryPlant;
import com.official.pium.domain.WaterCycle;
import com.official.pium.service.dto.DictionaryPlantResponse;
import com.official.pium.service.dto.DictionaryPlantResponse.WaterCycleResponse;
import com.official.pium.service.dto.DictionaryPlantSearchResponse;

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
}
