package com.official.pium.fixture;

import com.official.pium.service.dto.DataResponse;
import com.official.pium.service.dto.ReminderCreateRequest;
import com.official.pium.service.dto.ReminderResponse;
import com.official.pium.service.dto.ReminderUpdateRequest;

import java.time.LocalDate;
import java.util.List;

@SuppressWarnings("NonAsciiCharacters")
public class ReminderFixture {

    public static class REQUEST {

        public static ReminderCreateRequest 리마인더_물주기_요청(LocalDate date) {
            return ReminderCreateRequest.builder()
                    .waterDate(date)
                    .build();
        }

        public static ReminderUpdateRequest 리마인더_미루기_요청(LocalDate date) {
            return ReminderUpdateRequest.builder()
                    .nextWaterDate(date)
                    .build();
        }
    }

    public static class RESPONSE {
        public static DataResponse<List<ReminderResponse>> 리마인더_조회_응답 = DataResponse.<List<ReminderResponse>>builder()
                .data(
                        List.of(
                                ReminderResponse.builder()
                                        .petPlantId(1L)
                                        .nickName("기철이")
                                        .dictionaryPlantName("라벤더")
                                        .image("image.com")
                                        .nextWaterDate(LocalDate.of(2020, 1, 3))
                                        .dday(0L)
                                        .lastWaterDate(LocalDate.of(2020, 1, 3))
                                        .build()
                        )
                )
                .build();
    }
}
