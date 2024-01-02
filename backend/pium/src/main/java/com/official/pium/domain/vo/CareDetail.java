package com.official.pium.domain.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CareDetail {

    @Embedded
    private Temperature temperature;

    @Column(name = "require_humidity")
    private String requireHumidity;

    @Column(name = "posting_place")
    private String postingPlace;

    @Column(name = "special_manage_info")
    private String specialManageInfo;

    @Embedded
    private WaterCycle waterCycle;

    @Builder
    private CareDetail(
            Temperature temperature,
            String requireHumidity,
            String postingPlace,
            String specialManageInfo,
            WaterCycle waterCycle
    ) {
        this.temperature = temperature;
        this.requireHumidity = requireHumidity;
        this.postingPlace = postingPlace;
        this.specialManageInfo = specialManageInfo;
        this.waterCycle = waterCycle;
    }
}
