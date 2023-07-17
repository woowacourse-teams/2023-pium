package com.official.pium.mapper;

import com.official.pium.service.dto.DictionaryPlantSearchResponse;
import com.official.pium.domain.DictionaryPlant;

public class DictionaryPlantMapper {

    public static DictionaryPlantSearchResponse toDictionaryPlantSearchResponse(DictionaryPlant dictionaryPlant) {
        return DictionaryPlantSearchResponse.builder()
                .id(dictionaryPlant.getId())
                .name(dictionaryPlant.getName())
                .image(dictionaryPlant.getImageUrl())
                .build();
    }
}
