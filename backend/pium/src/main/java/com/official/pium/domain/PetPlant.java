package com.official.pium.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Objects;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.proxy.HibernateProxy;

@Entity
@Getter
@Table(name = "pet_plant")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PetPlant extends BaseEntity {

    private static final int MIN_WATER_CYCLE = 1;
    private static final int MAX_WATER_CYCLE = 365;

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

    @Min(MIN_WATER_CYCLE)
    @Max(MAX_WATER_CYCLE)
    @NotNull
    @Column(name = "water_cycle", nullable = false)
    private Integer waterCycle;

    @Builder
    private PetPlant(DictionaryPlant dictionaryPlant, Member member, String nickname, String imageUrl, String location,
                     String flowerpot, String light, String wind, @NotNull LocalDate birthDate,
                     @NotNull LocalDate nextWaterDate, @NotNull LocalDate lastWaterDate, @NotNull Integer waterCycle) {
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

    public Long calculateDaySince(LocalDate currentDate) {
        if (currentDate.isBefore(birthDate)) {
            throw new IllegalArgumentException("함께한 날은 음수가 될 수 없습니다. Date: " + currentDate);
        }
        return ChronoUnit.DAYS.between(birthDate, currentDate) + 1;
    }

    /**
     * - 0 : 오늘 할 일 - 음수 : 할 일 - 양수 : 지각
     */
    public Long calculateDday(LocalDate currentDate) {
        return ChronoUnit.DAYS.between(nextWaterDate, currentDate);
    }

    public void updatePetPlant(
            String nickname, String location, String flowerpot, String light,
            String wind, Integer waterCycle, LocalDate birthDate, LocalDate lastWaterDate, String imageUrl
    ) {
        validateEmptyValue(nickname);
        validateEmptyValue(location);
        validateEmptyValue(flowerpot);
        validateEmptyValue(light);
        validateEmptyValue(wind);
        validateWaterCycle(waterCycle);
        validateLocalDate(birthDate);
        validateLocalDate(lastWaterDate);
        validateImageUrl(imageUrl);
        if (!Objects.equals(waterCycle, this.waterCycle)) {
            this.nextWaterDate = lastWaterDate.plusDays(waterCycle);
        }
        this.nickname = nickname;
        this.location = location;
        this.flowerpot = flowerpot;
        this.light = light;
        this.wind = wind;
        this.waterCycle = waterCycle;
        this.birthDate = birthDate;
        this.lastWaterDate = lastWaterDate;
        this.imageUrl = imageUrl;
    }

    private void validateEmptyValue(String value) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("반려 식물 속성에는 빈 값 들어올 수 없습니다. value: " + value);
        }
    }

    private void validateWaterCycle(Integer waterCycle) {
        if (waterCycle < MIN_WATER_CYCLE || waterCycle > MAX_WATER_CYCLE) {
            throw new IllegalArgumentException("물주기 주기는 1이상 365이하의 값만 가능합니다. waterCycle: " + waterCycle);
        }
    }

    private void validateLocalDate(LocalDate localDate) {
        if (localDate == null) {
            throw new IllegalArgumentException("반려 식물 날짜 속성은 빈 값이 될 수 없습니다. date: null");
        }
    }

    private void validateImageUrl(String imageUrl) {
        if (imageUrl == null) {
            throw new IllegalArgumentException("반려 식물 이미지 URL은 빈 값이 될 수 없습니다. date: null");
        }
    }

    public void water(LocalDate newWaterDate) {
        if (newWaterDate.isAfter(LocalDate.now())) {
            throw new IllegalArgumentException("오늘 이후 날짜에 물을 줄 수는 없습니다. date: " + newWaterDate);
        }

        if (newWaterDate.isEqual(lastWaterDate) || newWaterDate.isBefore(lastWaterDate)) {
            throw new IllegalArgumentException("마지막으로 물을 준 날짜와 그 이전 날짜에는 물을 줄 수는 없습니다. date: " + newWaterDate);
        }
        this.nextWaterDate = newWaterDate.plusDays(waterCycle);
        this.lastWaterDate = newWaterDate;
    }

    public void changeNextWaterDate(LocalDate newWaterDate) {
        if (newWaterDate.isEqual(LocalDate.now()) || newWaterDate.isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("오늘과 그 이전 날짜로 물주기 날짜를 변경할 수는 없습니다. date: " + newWaterDate);
        }
        this.nextWaterDate = newWaterDate;
    }

    public boolean isNotOwnerOf(Member member) {
        return !Objects.equals(this.member, member);
    }

    public boolean isDifferentLastWaterDate(LocalDate lastWaterDate) {
        return !this.lastWaterDate.isEqual(lastWaterDate);
    }

    @Override
    public final boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null) {
            return false;
        }
        Class<?> oEffectiveClass =
                o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass()
                        : o.getClass();
        Class<?> thisEffectiveClass =
                this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer()
                        .getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) {
            return false;
        }
        PetPlant petPlant = (PetPlant) o;
        return getId() != null && Objects.equals(getId(), petPlant.getId());
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer()
                .getPersistentClass().hashCode() : getClass().hashCode();
    }
}
