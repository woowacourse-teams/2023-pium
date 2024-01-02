package com.official.pium.dictionaryPlant.application.dto;

import com.official.pium.dictionaryPlant.domain.DictionaryPlant;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class DictionaryPlantSearchResponse {

    private Long id;
    private String name;
    private String image;

    @Builder
    private DictionaryPlantSearchResponse(Long id, String name, String image) {
        this.id = id;
        this.name = name;
        this.image = image;
    }

    public static DictionaryPlantSearchResponse from(DictionaryPlant dictionaryPlant) {
        return DictionaryPlantSearchResponse.builder()
                .id(dictionaryPlant.getId())
                .name(dictionaryPlant.getClassification().getName())
                .image(dictionaryPlant.getImageUrl())
                .build();
    }
}
