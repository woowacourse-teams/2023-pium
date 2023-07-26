package com.official.pium.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Entity
@Getter
@Table(name = "pet_plant")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PetPlant extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dictionary_plant_id")
    private DictionaryPlant dictionaryPlant;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @NotBlank
    @Column(name = "nickname", nullable = false)
    private String nickname;

    @NotBlank
    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    @NotBlank
    @Column(name = "location", nullable = false)
    private String location;

    @NotBlank
    @Column(name = "flowerpot", nullable = false)
    private String flowerpot;

    @NotBlank
    @Column(name = "light", nullable = false)
    private String light;

    @NotBlank
    @Column(name = "wind", nullable = false)
    private String wind;

    @NotNull
    @Column(name = "birth_date", nullable = false)
    private LocalDate birthDate;

    @NotNull
    @Column(name = "next_water_date", nullable = false)
    private LocalDate nextWaterDate;

    @NotNull
    @Column(name = "last_water_date", nullable = false)
    private LocalDate lastWaterDate;

    @Min(1)
    @Max(365)
    @NotNull
    @Column(name = "water_cycle", nullable = false)
    private Integer waterCycle;

    @Builder
    private PetPlant(DictionaryPlant dictionaryPlant, Member member, String nickname, String imageUrl, String location, String flowerpot, String light, String wind, @NotNull LocalDate birthDate, @NotNull LocalDate nextWaterDate, @NotNull LocalDate lastWaterDate, @NotNull Integer waterCycle) {
        this.dictionaryPlant = dictionaryPlant;
        this.member = member;
        this.nickname = nickname;
        this.imageUrl = imageUrl;
        this.location = location;
        this.flowerpot = flowerpot;
        this.light = light;
        this.wind = wind;
        this.birthDate = birthDate;
        this.nextWaterDate = nextWaterDate;
        this.lastWaterDate = lastWaterDate;
        this.waterCycle = waterCycle;
    }

    public Long calculateNextWaterDay(LocalDate baseDate) {
        if (baseDate.isAfter(nextWaterDate)) {
            throw new IllegalArgumentException("물주기 남은 날짜는 음수가 될 수 없습니다. Date: " + baseDate);
        }
        return ChronoUnit.DAYS.between(baseDate, nextWaterDate);
    }

    public Long calculateDaySince(LocalDate currentDate) {
        if (currentDate.isBefore(birthDate)) {
            throw new IllegalArgumentException("함께한 날은 음수가 될 수 없습니다. Date: " + currentDate);
        }
        return ChronoUnit.DAYS.between(birthDate, currentDate) + 1;
    }

    /**
     * - 0 : 오늘 할 일
     * - 음수 : 할 일
     * - 양수 : 지각
     */
    public Long calculateDDay(LocalDate currentDate) {
        return ChronoUnit.DAYS.between(nextWaterDate, currentDate);
    }
}
