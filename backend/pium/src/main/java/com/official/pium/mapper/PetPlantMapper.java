package com.official.pium.mapper;

import com.official.pium.domain.DictionaryPlant;
import com.official.pium.domain.Member;
import com.official.pium.domain.PetPlant;
import com.official.pium.event.history.PetPlantHistory;
import com.official.pium.service.dto.PetPlantCreateRequest;
import com.official.pium.service.dto.PetPlantResponse;
import com.official.pium.service.dto.ReminderResponse;
import com.official.pium.service.dto.SinglePetPlantResponse;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class PetPlantMapper {

    public static PetPlant toPetPlant(
            PetPlantCreateRequest request,
            DictionaryPlant dictionaryPlant,
            String imagePath,
            Member member
    ) {
        return PetPlant.builder()
                .dictionaryPlant(dictionaryPlant)
                .member(member)
                .nickname(request.getNickname())
                .imageUrl(imagePath)
                .location(request.getLocation())
                .flowerpot(request.getFlowerpot())
                .light(request.getLight())
                .wind(request.getWind())
                .birthDate(request.getBirthDate())
                .lastWaterDate(request.getLastWaterDate())
                .waterCycle(request.getWaterCycle())
                .nextWaterDate(LocalDate.now().plusDays(request.getWaterCycle()))
                .build();
    }

    public static PetPlantResponse toPetPlantResponse(PetPlant petPlant, Long dday, Long daySince) {
        DictionaryPlant dictionaryPlant = petPlant.getDictionaryPlant();
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
                .dday(dday)
                .nextWaterDate(petPlant.getNextWaterDate())
                .daySince(daySince)
                .dictionaryPlant(PetPlantResponse.DictionaryPlantResponse.builder()
                        .id(dictionaryPlant.getId())
                        .name(dictionaryPlant.getClassification().getName())
                        .build()
                )
                .build();
    }

    public static PetPlantResponse toPetPlantResponse(PetPlant petPlant, Long dday, Long daySince,
                                                      LocalDate secondLastWaterDate) {
        DictionaryPlant dictionaryPlant = petPlant.getDictionaryPlant();
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
                .dday(dday)
                .nextWaterDate(petPlant.getNextWaterDate())
                .daySince(daySince)
                .dictionaryPlant(PetPlantResponse.DictionaryPlantResponse.builder()
                        .id(dictionaryPlant.getId())
                        .name(dictionaryPlant.getClassification().getName())
                        .build()
                )
                .secondLastWaterDate(secondLastWaterDate)
                .build();
    }

    public static SinglePetPlantResponse toSinglePetPlantResponse(PetPlant petPlant, Long daySince) {
        return SinglePetPlantResponse.builder()
                .id(petPlant.getId())
                .nickname(petPlant.getNickname())
                .imageUrl(petPlant.getImageUrl())
                .dictionaryPlantName(petPlant.getDictionaryPlant().getClassification().getName())
                .birthDate(petPlant.getBirthDate())
                .daySince(daySince)
                .build();
    }

    public static ReminderResponse toReminderResponse(PetPlant petPlant, Long dday) {
        return ReminderResponse.builder()
                .petPlantId(petPlant.getId())
                .image(petPlant.getImageUrl())
                .nickName(petPlant.getNickname())
                .dictionaryPlantName(petPlant.getDictionaryPlant().getClassification().getName())
                .dday(dday)
                .nextWaterDate(petPlant.getNextWaterDate())
                .lastWaterDate(petPlant.getLastWaterDate())
                .build();
    }

    public static PetPlantHistory toPetPlantHistory(PetPlant petPlant) {
        return PetPlantHistory.builder()
                .location(petPlant.getLocation())
                .flowerpot(petPlant.getFlowerpot())
                .light(petPlant.getLight())
                .wind(petPlant.getWind())
                .waterCycle(petPlant.getWaterCycle().toString())
                .lastWaterDate(petPlant.getLastWaterDate().toString())
                .build();
    }
}
