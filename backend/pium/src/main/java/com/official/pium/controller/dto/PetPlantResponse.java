package com.official.pium.controller.dto;

import com.official.pium.domain.DictionaryPlant;
import com.official.pium.domain.PetPlant;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PetPlantResponse {

    private Long id;
    private String nickname;
    private String imageUrl;
    private DictionaryPlantDto dictionaryPlant;
    private String location;
    private String flowerpot;
    private String light;
    private String wind;
    private LocalDate birthDate;
    private LocalDate lastWaterDate;
    private Integer waterCycle;
    private long nextWaterDay;
    private long daySince;

    public static PetPlantResponse of(PetPlant petPlant, long nextWaterDay, long daySince) {
        return new PetPlantResponse(
                petPlant.getId(),
                petPlant.getNickname(),
                petPlant.getImageUrl(),
                DictionaryPlantDto.from(petPlant.getDictionaryPlant()),
                petPlant.getLocation(),
                petPlant.getFlowerpot(),
                petPlant.getLight(),
                petPlant.getWind(),
                petPlant.getBirthDate(),
                petPlant.getLastWaterDate(),
                petPlant.getWaterCycle(),
                nextWaterDay,
                daySince
        );
    }

    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    static class DictionaryPlantDto {

        private Long id;
        private String name;

        public static DictionaryPlantDto from(DictionaryPlant dictionaryPlant) {
            return new DictionaryPlantDto(dictionaryPlant.getId(), dictionaryPlant.getName());
        }
    }
}
