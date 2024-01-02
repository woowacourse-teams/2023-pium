package com.official.pium.petPlant.event.history;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;

@Getter
@Validated
@RequiredArgsConstructor
public class LastWaterDateEvent {

    @NotNull
    private final Long petPlantId;

    @NotNull
    private final LocalDate currentWaterDate;
}
