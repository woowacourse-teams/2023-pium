package com.official.pium.event.history;

import com.official.pium.domain.HistoryType;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
public class PetPlantHistory {

    private static final String EMPTY = "EMPTY";

    private final String location;
    private final String flowerpot;
    private final String light;
    private final String wind;
    private final String waterCycle;
    private final String lastWaterDate;

    @Builder
    private PetPlantHistory(String location, String flowerpot, String light, String wind, String waterCycle, String lastWaterDate) {
        this.location = location;
        this.flowerpot = flowerpot;
        this.light = light;
        this.wind = wind;
        this.waterCycle = waterCycle;
        this.lastWaterDate = lastWaterDate;
    }

    public List<HistoryEvent> generateCreateHistoryEvents(Long petPlantId, LocalDate date) {
        List<HistoryEvent> events = new ArrayList<>();
        events.add(new HistoryEvent(petPlantId, EMPTY, location, HistoryType.LOCATION, date));
        events.add(new HistoryEvent(petPlantId, EMPTY, flowerpot, HistoryType.FLOWERPOT, date));
        events.add(new HistoryEvent(petPlantId, EMPTY, light, HistoryType.LIGHT, date));
        events.add(new HistoryEvent(petPlantId, EMPTY, wind, HistoryType.WIND, date));
        events.add(new HistoryEvent(petPlantId, EMPTY, waterCycle, HistoryType.WATER_CYCLE, date));
        events.add(new HistoryEvent(petPlantId, EMPTY, lastWaterDate, HistoryType.LAST_WATER_DATE, LocalDate.parse(lastWaterDate)));
        return events;
    }
}
