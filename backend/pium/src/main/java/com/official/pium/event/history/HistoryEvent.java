package com.official.pium.event.history;

import com.official.pium.domain.HistoryType;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class HistoryEvent {

    private final Long petPlantId;
    private final String previous;
    private final String current;
    private final HistoryType historyType;
    private final LocalDate date;

    public static HistoryEvent of(Long petPlantId, String previous, String current, HistoryType historyType, LocalDate date) {
        return new HistoryEvent(
                petPlantId,
                previous,
                current,
                historyType,
                date
        );
    }

    public static HistoryEvent of(Long petPlantId, LocalDate previous, LocalDate current, HistoryType historyType, LocalDate date) {
        return new HistoryEvent(
                petPlantId,
                previous.toString(),
                current.toString(),
                historyType,
                date
        );
    }
}
