package com.official.pium.fixture;

import com.official.pium.service.dto.HistoryResponse;

import java.time.LocalDate;
import java.util.List;

@SuppressWarnings("NonAsciiCharacters")
public class HistoryFixture {

    public static class RESPONSE {
        public static HistoryResponse 히스토리 = HistoryResponse.builder()
                .page(1)
                .size(2)
                .elementSize(4L)
                .hasNext(true)
                .waterDateList(List.of(LocalDate.now()))
                .build();
    }
}
