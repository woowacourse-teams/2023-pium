package com.official.pium.event.history;

import com.official.pium.domain.HistoryType;
import com.official.pium.domain.PetPlant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
public class PetPlantHistory {

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

    public PetPlantHistory(PetPlant petPlant) {
        this.location = petPlant.getLocation();
        this.flowerpot = petPlant.getFlowerpot();
        this.light = petPlant.getLight();
        this.wind = petPlant.getWind();
        this.waterCycle = petPlant.getWaterCycle().toString();
        this.lastWaterDate = petPlant.getLastWaterDate().toString();
    }

    public List<HistoryEvent> generateCreateHistoryEvents(Long petPlantId, PetPlantHistory other, LocalDate date) {
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
