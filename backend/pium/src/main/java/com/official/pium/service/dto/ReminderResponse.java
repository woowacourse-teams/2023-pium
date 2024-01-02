package com.official.pium.service.dto;

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
public class ReminderResponse {

    private Long petPlantId;
    private String image;
    private String nickName;
    private String dictionaryPlantName;
    private Long dday;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate nextWaterDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate lastWaterDate;

    public static ReminderResponse of(PetPlant petPlant, Long dday) {
        return ReminderResponse.builder()
                .petPlantId(petPlant.getId())
                .image(petPlant.getImageUrl())
                .nickName(petPlant.getNickname())
                .dictionaryPlantName(petPlant.getDictionaryPlant().getClassification().getName())
                .dday(dday)
                .nextWaterDate(petPlant.getWaterDetail().getNextWaterDate())
                .lastWaterDate(petPlant.getWaterDetail().getLastWaterDate())
                .build();
    }
}
