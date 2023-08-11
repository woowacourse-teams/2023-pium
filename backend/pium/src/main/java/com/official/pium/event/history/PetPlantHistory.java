package com.official.pium.event.history;

import com.official.pium.domain.HistoryType;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PetPlantHistory {
    private final String location;
    private final String flowerpot;
    private final String light;
    private final String wind;
    private final String waterCycle;
    private final String lastWaterDate;

    public List<HistoryEvent> createHistory(Long petPlantId, PetPlantHistory other, LocalDate date) {
        List<HistoryEvent> events = new ArrayList<>();

        if (!location.equals(other.location)) {
            events.add(new HistoryEvent(petPlantId, location, other.location, HistoryType.LOCATION, date));
        }

        if (!flowerpot.equals(other.flowerpot)) {
            events.add(new HistoryEvent(petPlantId, flowerpot, other.flowerpot, HistoryType.FLOWERPOT, date));
        }

        if (!light.equals(other.light)) {
            events.add(new HistoryEvent(petPlantId, light, other.light, HistoryType.LIGHT, date));
        }

        if (!wind.equals(other.wind)) {
            events.add(new HistoryEvent(petPlantId, wind, other.wind, HistoryType.WIND, date));
        }

        if (!waterCycle.equals(other.waterCycle)) {
            events.add(new HistoryEvent(petPlantId, waterCycle, other.waterCycle, HistoryType.WATER_CYCLE, date));
        }

        if (!lastWaterDate.equals(other.lastWaterDate)) {
            events.add(new HistoryEvent(petPlantId, lastWaterDate, other.lastWaterDate, HistoryType.LAST_WATER_DATE, date));
        }

        return events;
    }
}
