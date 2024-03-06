package com.official.pium.garden.application.dto;

import com.official.pium.garden.domain.Garden;
import com.official.pium.garden.domain.vo.GardenPlantState;
import com.official.pium.petPlant.domain.PetPlant;
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
                .gardenPlantState(
                        GardenPlantState.builder()
                                .location(petPlant.getPetPlantState().getLocation())
                                .flowerpot(petPlant.getPetPlantState().getFlowerpot())
                                .light(petPlant.getPetPlantState().getLight())
                                .wind(petPlant.getPetPlantState().getWind())
                                .build()
                )
                .daySince(petPlant.calculateDaySince(LocalDate.now()))
                .waterCycle(petPlant.getWaterCycle())
                .content(this.content)
                .manageLevel(this.manageLevel)
                .build();
    }
}
