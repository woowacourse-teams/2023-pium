package com.official.pium.service.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.official.pium.domain.PetPlant;
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
public class SinglePetPlantResponse {

    private Long id;
    private String nickname;
    private String imageUrl;
    private String dictionaryPlantName;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;

    private Long daySince;

    public static SinglePetPlantResponse of(PetPlant petPlant, Long daySince) {
        return SinglePetPlantResponse.builder()
                .id(petPlant.getId())
                .nickname(petPlant.getNickname())
                .imageUrl(petPlant.getImageUrl())
                .dictionaryPlantName(petPlant.getDictionaryPlant().getClassification().getName())
                .birthDate(petPlant.getBirthDate())
                .daySince(daySince)
                .build();
    }
}
