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
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "garden")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Garden extends BaseEntity {

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
    @Column(name = "day_since", nullable = false)
    private Long daySince;

    @Min(MIN_WATER_CYCLE)
    @Max(MAX_WATER_CYCLE)
    @NotNull
    @Column(name = "water_cycle", nullable = false)
    private Integer waterCycle;

    @NotBlank
    @Size(max = 500)
    @Column(name = "content", nullable = false, length = 500)
    private String content;

    @NotBlank
    @Column(name = "manage_level", nullable = false)
    private String manageLevel;

    @Builder
    public Garden(final DictionaryPlant dictionaryPlant, final Member member, final String nickname,
                  final String imageUrl, final String location,
                  final String flowerpot, final String light, final String wind, final Long daySince,
                  final Integer waterCycle, final String content,
                  final String manageLevel) {
        this.dictionaryPlant = dictionaryPlant;
        this.member = member;
        this.nickname = nickname;
        this.imageUrl = imageUrl;
        this.location = location;
        this.flowerpot = flowerpot;
        this.light = light;
        this.wind = wind;
        this.daySince = daySince;
        this.waterCycle = waterCycle;
        this.content = content;
        this.manageLevel = manageLevel;
    }
}
