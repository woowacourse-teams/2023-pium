package com.official.pium.event.history;

import com.official.pium.domain.HistoryType;
import java.time.LocalDate;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class HistoryEvent {

    private final Long petPlantId;
    private final String previous;
    private final String current;
    private final HistoryType historyType;
    private final LocalDate date;
}
