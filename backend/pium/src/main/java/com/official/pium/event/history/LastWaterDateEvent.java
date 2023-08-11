package com.official.pium.event.history;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@Getter
@RequiredArgsConstructor
public class LastWaterDateEvent {

    private final Long petPlantId;
    private final LocalDate currentWaterDate;
}
