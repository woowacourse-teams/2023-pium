package com.official.pium.petPlant.event.history;

import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class HistoryEvents {

    private final List<HistoryEvent> historyEvents;

    public static HistoryEvents from(List<HistoryEvent> historyEvents) {
        return new HistoryEvents(historyEvents);
    }
}
