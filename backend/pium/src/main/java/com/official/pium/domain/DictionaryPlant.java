package com.official.pium.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "dictionary_plant")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DictionaryPlant extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "family_name")
    private String familyName;

    @Column(name = "smell")
    private String smell;

    @Column(name = "poison")
    private String poison;

    @Column(name = "manage_level")
    private String manageLevel;

    @Column(name = "grow_speed")
    private String growSpeed;

    @Column(name = "require_temp")
    private String requireTemp;

    @Column(name = "minimum_temp")
    private String minimumTemp;

    @Column(name = "require_humidity")
    private String requireHumidity;

    @Column(name = "posting_place")
    private String postingPlace;

    @Column(name = "special_manage_info")
    private String specialManageInfo;

    @Embedded
    private WaterCycle waterCycle;

    @Builder
    private DictionaryPlant(String name, String imageUrl, String familyName, String smell, String poison, String manageLevel, String growSpeed, String requireTemp, String minimumTemp, String requireHumidity, String postingPlace, String specialManageInfo, WaterCycle waterCycle) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.familyName = familyName;
        this.smell = smell;
        this.poison = poison;
        this.manageLevel = manageLevel;
        this.growSpeed = growSpeed;
        this.requireTemp = requireTemp;
        this.minimumTemp = minimumTemp;
        this.requireHumidity = requireHumidity;
        this.postingPlace = postingPlace;
        this.specialManageInfo = specialManageInfo;
        this.waterCycle = waterCycle;
    }
}
