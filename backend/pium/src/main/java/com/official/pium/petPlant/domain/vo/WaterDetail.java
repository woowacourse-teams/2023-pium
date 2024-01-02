package com.official.pium.petPlant.domain.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class WaterDetail {

    @NotNull
    @Column(name = "next_water_date", nullable = false)
    private LocalDate nextWaterDate;

    @NotNull
    @Column(name = "last_water_date", nullable = false)
    private LocalDate lastWaterDate;

    @Builder
    private WaterDetail(LocalDate nextWaterDate, LocalDate lastWaterDate) {
        this.nextWaterDate = nextWaterDate;
        this.lastWaterDate = lastWaterDate;
    }

    public Long calculateDday(LocalDate currentDate) {
        return ChronoUnit.DAYS.between(nextWaterDate, currentDate);
    }

    public void plusNextWaterDate(Integer waterCycle) {
        this.nextWaterDate = lastWaterDate.plusDays(waterCycle);
    }

    public void changeNextWaterDate(LocalDate newWaterDate) {
        if (newWaterDate.isEqual(LocalDate.now()) || newWaterDate.isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("오늘과 그 이전 날짜로 물주기 날짜를 변경할 수는 없습니다. date: " + newWaterDate);
        }
        this.nextWaterDate = newWaterDate;
    }

    public void changeLastWaterDate(LocalDate lastWaterDate) {
        this.lastWaterDate = lastWaterDate;
    }

    public void water(LocalDate newWaterDate, Integer waterCycle) {
        if (newWaterDate.isAfter(LocalDate.now())) {
            throw new IllegalArgumentException("오늘 이후 날짜에 물을 줄 수는 없습니다. date: " + newWaterDate);
        }

        if (newWaterDate.isEqual(lastWaterDate) || newWaterDate.isBefore(lastWaterDate)) {
            throw new IllegalArgumentException("마지막으로 물을 준 날짜와 그 이전 날짜에는 물을 줄 수는 없습니다. date: " + newWaterDate);
        }
        this.nextWaterDate = newWaterDate.plusDays(waterCycle);
        this.lastWaterDate = newWaterDate;
    }

    public boolean isDifferentLastWaterDate(LocalDate lastWaterDate) {
        return !this.lastWaterDate.isEqual(lastWaterDate);
    }
}
