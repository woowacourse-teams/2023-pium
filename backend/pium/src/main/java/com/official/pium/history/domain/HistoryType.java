package com.official.pium.history.domain;

import java.util.Arrays;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum HistoryType {

    LAST_WATER_DATE("lastWaterDate"),
    WATER_CYCLE("waterCycle"),
    FLOWERPOT("flowerpot"),
    LIGHT("light"),
    WIND("wind"),
    LOCATION("location");

    private final String type;

    public static HistoryType from(String type) {
        return Arrays.stream(values())
                .filter(historyType -> historyType.getType().equalsIgnoreCase(type))
                .findAny()
                .orElseThrow(() -> new IllegalArgumentException("일치하는 히스토리 타입이 없습니다. type: " + type));
    }
}
