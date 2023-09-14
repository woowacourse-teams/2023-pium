package com.official.pium.mapper;

import com.official.pium.domain.Garden;
import com.official.pium.domain.PetPlant;
import com.official.pium.service.dto.GardenCreateRequest;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class GardenMapper {

    public static Garden toGarden(GardenCreateRequest request, PetPlant petPlant) {
        return Garden.builder()
                .dictionaryPlant(petPlant.getDictionaryPlant())
                .member(petPlant.getMember())
                .nickname(petPlant.getNickname())
                .imageUrl(petPlant.getImageUrl())
                .location(petPlant.getLocation())
                .flowerpot(petPlant.getFlowerpot())
                .light(petPlant.getLight())
                .wind(petPlant.getWind())
                .daySince(petPlant.calculateDaySince(LocalDate.now()))
                .waterCycle(petPlant.getWaterCycle())
                .content(request.getContent())
                .manageLevel(request.getManageLevel())
                .build();
    }
}
