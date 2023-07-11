package com.official.pium.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Getter
@Table(name = "pet_plant")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PetPlant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dictionary_plant_id")
    private DictionaryPlant plant;

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
    @Column(name = "water_cycle", nullable = false)
    private LocalDate nextWaterDate;

    @NotNull
    @Column(name = "last_water_date", nullable = false)
    private LocalDate lastWaterDate;

    @Min(1)
    @Max(365)
    @NotNull
    @Column(name = "water_cycle", nullable = false)
    private Integer waterCycle;
}
