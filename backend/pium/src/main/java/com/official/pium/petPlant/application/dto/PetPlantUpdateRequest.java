package com.official.pium.petPlant.application.dto;

import com.official.pium.petPlant.domain.vo.PetPlantState;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
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
public class PetPlantUpdateRequest {

    @NotBlank(message = "반려 식물 닉네임은 필수 값입니다.")
    private String nickname;

    @NotBlank(message = "화분 정보는 필수 값입니다.")
    private String flowerpot;

    @NotBlank(message = "화분 위치는 필수 값입니다.")
    private String location;

    @NotNull(message = "물주기 주기 값은 필수 값입니다.")
    @Positive(message = "물주기 주기 값은 양수만 가능합니다.")
    private Integer waterCycle;

    @NotBlank(message = "조도 정보는 필수 값입니다.")
    private String light;

    @NotBlank(message = "통풍 정보는 필수 값입니다.")
    private String wind;

    @NotNull(message = "반려 식물 입양일은 필수 값입니다.")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;

    @NotNull(message = "마지막 물주기 날짜는 필수 값입니다.")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate lastWaterDate;

    public PetPlantState toPetPlantState() {
        return PetPlantState.builder()
                .light(this.light)
                .wind(this.wind)
                .location(this.location)
                .flowerpot(this.flowerpot)
                .build();
    }
}
