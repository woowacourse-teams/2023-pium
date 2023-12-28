package com.official.pium.service.dto;

import com.official.pium.domain.DictionaryPlant;
import com.official.pium.domain.PetPlant;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class PetPlantResponse {

    private Long id;
    private String nickname;
    private String imageUrl;
    private String location;
    private String flowerpot;
    private String light;
    private String wind;
    private Integer waterCycle;
    private Long daySince;
    private Long dday;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate lastWaterDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate secondLastWaterDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate nextWaterDate;

    private DictionaryPlantResponse dictionaryPlant;

    public static PetPlantResponse of(PetPlant petPlant, Long dday, Long daySince) {
        DictionaryPlant dictionaryPlant = petPlant.getDictionaryPlant();
        return PetPlantResponse.builder()
                .id(petPlant.getId())
                .nickname(petPlant.getNickname())
                .imageUrl(petPlant.getImageUrl())
                .location(petPlant.getPetPlantState().getLocation())
                .flowerpot(petPlant.getPetPlantState().getFlowerpot())
                .light(petPlant.getPetPlantState().getLight())
                .wind(petPlant.getPetPlantState().getWind())
                .birthDate(petPlant.getBirthDate())
                .lastWaterDate(petPlant.getWaterDate().getLastWaterDate())
                .waterCycle(petPlant.getWaterCycle())
                .dday(dday)
                .nextWaterDate(petPlant.getWaterDate().getNextWaterDate())
                .daySince(daySince)
                .dictionaryPlant(PetPlantResponse.DictionaryPlantResponse.builder()
                        .id(dictionaryPlant.getId())
                        .name(dictionaryPlant.getClassification().getName())
                        .build()
                )
                .build();
    }

    public static PetPlantResponse of(PetPlant petPlant, Long dday, Long daySince,
                                      LocalDate secondLastWaterDate) {
        DictionaryPlant dictionaryPlant = petPlant.getDictionaryPlant();
        return PetPlantResponse.builder()
                .id(petPlant.getId())
                .nickname(petPlant.getNickname())
                .imageUrl(petPlant.getImageUrl())
                .location(petPlant.getPetPlantState().getLocation())
                .flowerpot(petPlant.getPetPlantState().getFlowerpot())
                .light(petPlant.getPetPlantState().getLight())
                .wind(petPlant.getPetPlantState().getWind())
                .birthDate(petPlant.getBirthDate())
                .lastWaterDate(petPlant.getWaterDate().getLastWaterDate())
                .waterCycle(petPlant.getWaterCycle())
                .dday(dday)
                .nextWaterDate(petPlant.getWaterDate().getNextWaterDate())
                .daySince(daySince)
                .dictionaryPlant(PetPlantResponse.DictionaryPlantResponse.builder()
                        .id(dictionaryPlant.getId())
                        .name(dictionaryPlant.getClassification().getName())
                        .build()
                )
                .secondLastWaterDate(secondLastWaterDate)
                .build();
    }

    @Getter
    @NoArgsConstructor
    public static class DictionaryPlantResponse {

        private Long id;
        private String name;

        @Builder
        private DictionaryPlantResponse(Long id, String name) {
            this.id = id;
            this.name = name;
        }
    }
}
