package com.official.pium.mapper;

import com.official.pium.domain.DictionaryPlant;
import com.official.pium.domain.Member;
import com.official.pium.domain.PetPlant;
import com.official.pium.service.dto.PetPlantCreateRequest;
import com.official.pium.service.dto.PetPlantResponse;
import com.official.pium.service.dto.ReminderResponse;
import com.official.pium.service.dto.SinglePetPlantResponse;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class PetPlantMapper {

    public static PetPlant toPetPlant(PetPlantCreateRequest request, DictionaryPlant dictionaryPlant, Member member) {
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

    public static PetPlantResponse toPetPlantResponse(PetPlant petPlant, Long dDay, Long daySince) {
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
                .dDay(dDay)
                .nextWaterDate(petPlant.getNextWaterDate())
                .daySince(daySince)
                .build();
    }

    public static SinglePetPlantResponse toSinglePetPlantResponse(PetPlant petPlant, Long daySince) {
        return SinglePetPlantResponse.builder()
                .id(petPlant.getId())
                .nickname(petPlant.getNickname())
                .imageUrl(petPlant.getImageUrl())
                .dictionaryPlantName(petPlant.getDictionaryPlant().getName())
                .birthDate(petPlant.getBirthDate())
                .daySince(daySince)
                .build();
    }

    public static ReminderResponse toReminderResponse(PetPlant petPlant, Long dDay) {
        return ReminderResponse.builder()
                .petPlantId(petPlant.getId())
                .image(petPlant.getImageUrl())
                .nickName(petPlant.getNickname())
                .dictionaryPlantName(petPlant.getDictionaryPlant().getName())
                .dDay(dDay)
                .nextWaterDate(petPlant.getNextWaterDate())
                .build();
    }
}
