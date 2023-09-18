package com.official.pium.mapper;

import com.official.pium.domain.Garden;
import com.official.pium.domain.PetPlant;
import com.official.pium.service.dto.GardenCreateRequest;
import com.official.pium.service.dto.GardenResponse;
import com.official.pium.service.dto.SingleGardenResponse;
import java.time.LocalDate;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

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

    public static GardenResponse toGardenResponse(Page<Garden> gardens) {
        return GardenResponse.builder()
                .page(gardens.getPageable().getPageNumber())
                .size(gardens.getSize())
                .elementSize(gardens.getTotalElements())
                .hasNext(gardens.hasNext())
                .data(gardens.getContent().stream()
                        .map(GardenMapper::toSingleGardenResponse)
                        .collect(Collectors.toList())
                ).build();
    }

    private static SingleGardenResponse toSingleGardenResponse(Garden garden) {
        return SingleGardenResponse.builder()
                .id(garden.getId())
                .createdAt(garden.getCreatedAt())
                .updatedAt(garden.getUpdatedAt())
                .dictionaryPlantName(garden.getDictionaryPlant().getName())
                .content(garden.getContent())
                .manageLevel(garden.getManageLevel())
                .petPlant(toPetPlantInfo(garden))
                .build();
    }

    private static SingleGardenResponse.PetPlantInfo toPetPlantInfo(Garden garden) {
        return SingleGardenResponse.PetPlantInfo.builder()
                .imageUrl(garden.getImageUrl())
                .nickname(garden.getNickname())
                .location(garden.getLocation())
                .flowerpot(garden.getFlowerpot())
                .light(garden.getLight())
                .wind(garden.getWind())
                .daySince(garden.getDaySince())
                .waterCycle(garden.getWaterCycle())
                .build();
    }
}
