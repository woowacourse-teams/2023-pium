package com.official.pium.service.dto;

import com.official.pium.domain.Garden;
import com.official.pium.domain.PetPlant;
import com.official.pium.domain.vo.PlantState;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class GardenCreateRequest {

    @NotNull
    @Positive
    private Long petPlantId;

    @NotBlank
    private String content;

    @NotBlank
    private String manageLevel;

    public Garden toGarden(PetPlant petPlant) {
        return Garden.builder()
                .dictionaryPlant(petPlant.getDictionaryPlant())
                .member(petPlant.getMember())
                .nickname(petPlant.getNickname())
                .imageUrl(petPlant.getImageUrl())
                .plantState(
                        PlantState.builder()
                                .location(petPlant.getLocation())
                                .flowerpot(petPlant.getFlowerpot())
                                .light(petPlant.getLight())
                                .wind(petPlant.getWind())
                                .build()
                )
                .daySince(petPlant.calculateDaySince(LocalDate.now()))
                .waterCycle(petPlant.getWaterCycle())
                .content(this.content)
                .manageLevel(this.manageLevel)
                .build();
    }
}
