package com.official.pium.mapper;

import com.official.pium.domain.DictionaryPlant;
import com.official.pium.domain.Member;
import com.official.pium.domain.PetPlant;
import com.official.pium.service.dto.PetPlantRequest;
import com.official.pium.service.dto.PetPlantResponse;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class PetPlantMapper {

    public static PetPlant toPetPlant(PetPlantRequest request, DictionaryPlant dictionaryPlant, Member member) {
        return PetPlant.builder()
                .dictionaryPlant(dictionaryPlant)
                .member(member)
                .nickname(request.getNickname())
                .imageUrl(dictionaryPlant.getImageUrl())
                .location(request.getLocation())
                .flowerpot(request.getFlowerpot())
                .light(request.getLight())
                .wind(request.getWind())
                .birthDate(request.getBirthDate())
                .lastWaterDate(request.getLastWaterDate())
                .waterCycle(request.getWaterCycle())
                .nextWaterDate(LocalDate.now().plus(request.getWaterCycle(), ChronoUnit.DAYS))
                .build();
    }

    public static PetPlantResponse toPetPlantResponse(PetPlant petPlant, Long nextWaterDay, Long daySince) {
        return PetPlantResponse.builder()
                .id(petPlant.getId())
                .nickname(petPlant.getNickname())
                .imageUrl(petPlant.getImageUrl())
                .location(petPlant.getLocation())
                .flowerpot(petPlant.getFlowerpot())
                .light(petPlant.getLight())
                .wind(petPlant.getWind())
                .birthDate(petPlant.getBirthDate())
                .lastWaterDate(petPlant.getLastWaterDate())
                .waterCycle(petPlant.getWaterCycle())
                .nextWaterDay(nextWaterDay)
                .daySince(daySince)
                .build();
    }
}
