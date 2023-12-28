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

    private static final String EMPTY = "EMPTY";

    private final String location;
    private final String flowerpot;
    private final String light;
    private final String wind;
    private final String waterCycle;
    private final String lastWaterDate;

    @Builder
    private PetPlantHistory(String location, String flowerpot, String light, String wind, String waterCycle,
                            String lastWaterDate) {
        this.location = location;
        this.flowerpot = flowerpot;
        this.light = light;
        this.wind = wind;
        this.waterCycle = waterCycle;
        this.lastWaterDate = lastWaterDate;
    }

    public static PetPlantHistory from(PetPlant petPlant) {
        return PetPlantHistory.builder()
                .location(petPlant.getPetPlantState().getLocation())
                .flowerpot(petPlant.getPetPlantState().getFlowerpot())
                .light(petPlant.getPetPlantState().getLight())
                .wind(petPlant.getPetPlantState().getWind())
                .waterCycle(petPlant.getWaterCycle().toString())
                .lastWaterDate(petPlant.getWaterDate().getLastWaterDate().toString())
                .build();
    }

    public List<HistoryEvent> generateCreateHistoryEvents(Long petPlantId, LocalDate date) {
        List<HistoryEvent> events = new ArrayList<>();
        events.add(HistoryEvent.of(petPlantId, EMPTY, location, HistoryType.LOCATION, date));
        events.add(HistoryEvent.of(petPlantId, EMPTY, flowerpot, HistoryType.FLOWERPOT, date));
        events.add(HistoryEvent.of(petPlantId, EMPTY, light, HistoryType.LIGHT, date));
        events.add(HistoryEvent.of(petPlantId, EMPTY, wind, HistoryType.WIND, date));
        events.add(HistoryEvent.of(petPlantId, EMPTY, waterCycle, HistoryType.WATER_CYCLE, date));
        events.add(HistoryEvent.of(petPlantId, EMPTY, lastWaterDate, HistoryType.LAST_WATER_DATE,
                LocalDate.parse(lastWaterDate)));
        return events;
    }

    public List<HistoryEvent> generateUpdateHistoryEvents(Long petPlantId, PetPlantHistory other, LocalDate date) {
        List<HistoryEvent> events = new ArrayList<>();

        if (!location.equals(other.location)) {
            events.add(HistoryEvent.of(petPlantId, location, other.location, HistoryType.LOCATION, date));
        }

        if (!flowerpot.equals(other.flowerpot)) {
            events.add(HistoryEvent.of(petPlantId, flowerpot, other.flowerpot, HistoryType.FLOWERPOT, date));
        }

        if (!light.equals(other.light)) {
            events.add(HistoryEvent.of(petPlantId, light, other.light, HistoryType.LIGHT, date));
        }

        if (!wind.equals(other.wind)) {
            events.add(HistoryEvent.of(petPlantId, wind, other.wind, HistoryType.WIND, date));
        }

        if (!waterCycle.equals(other.waterCycle)) {
            events.add(HistoryEvent.of(petPlantId, waterCycle, other.waterCycle, HistoryType.WATER_CYCLE, date));
        }

        return events;
    }

    public LastWaterDateEvent generateUpdateLastWaterDateHistoryEvent(Long petPlantId, LocalDate otherLastWaterDate) {
        if (!lastWaterDate.equals(otherLastWaterDate.toString())) {
            return new LastWaterDateEvent(petPlantId, otherLastWaterDate);
        }
        return null;
    }
}
