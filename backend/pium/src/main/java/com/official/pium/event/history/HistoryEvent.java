package com.official.pium.event.history;

import com.official.pium.domain.HistoryType;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;

@Getter
@Validated
@RequiredArgsConstructor
public class HistoryEvent {

    @NotNull
    private final Long petPlantId;

    @NotNull
    private final String previous;

    @NotNull
    private final String current;

    @NotNull
    private final HistoryType historyType;
    
    @NotNull
    private final LocalDate date;
}
