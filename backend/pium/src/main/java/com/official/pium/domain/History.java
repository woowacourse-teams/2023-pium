package com.official.pium.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Getter
@Table(name = "history")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class History extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pet_plant_id", nullable = false)
    private PetPlant petPlant;

    @NotNull
    @Column(name = "water_date", nullable = false)
    private LocalDate waterDate;

    @Builder
    private History(@NotNull PetPlant petPlant, @NotNull LocalDate waterDate) {
        this.petPlant = petPlant;
        this.waterDate = waterDate;
    }
}
