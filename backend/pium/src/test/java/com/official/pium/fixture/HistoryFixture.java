package com.official.pium.fixture;

import com.official.pium.domain.HistoryType;
import com.official.pium.service.dto.HistoryResponse;
import com.official.pium.service.dto.SingleHistoryResponse;
import com.official.pium.service.dto.SingleHistoryResponse.Content;

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
                .data(
                        List.of(
                                SingleHistoryResponse.builder()
                                        .type(HistoryType.LAST_WATER_DATE.getType())
                                        .date(LocalDate.of(2022, 3, 4))
                                        .content(
                                                Content.builder()
                                                        .previous("이전")
                                                        .current("현재")
                                                        .build()
                                        )
                                        .build()
                        )
                )
                .build();
    }
}
