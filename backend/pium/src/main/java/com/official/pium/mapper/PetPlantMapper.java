package com.official.pium.mapper;

import com.official.pium.controller.dto.PetPlantRequest;
import com.official.pium.domain.DictionaryPlant;
import com.official.pium.domain.Member;
import com.official.pium.domain.PetPlant;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

public class PetPlantMapper {

    public static PetPlant toEntity(PetPlantRequest request, DictionaryPlant dictionaryPlant, Member member) {
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
}
