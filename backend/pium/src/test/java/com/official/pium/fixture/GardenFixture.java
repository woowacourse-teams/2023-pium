package com.official.pium.fixture;

import com.official.pium.service.dto.GardenCreateRequest;

public class GardenFixture {

    public static class REQUEST {

        public static GardenCreateRequest 정원_게시글_등록_요청 = GardenCreateRequest.builder()
                .petPlantId(1L)
                .content("기영아 무럭무럭 자라라 ~")
                .manageLevel("초보자")
                .build();
    }
}
