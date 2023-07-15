package com.official.pium.fixture;

import com.official.pium.controller.dto.PetPlantRequest;

import java.time.LocalDate;

@SuppressWarnings("NonAsciiCharacters")
public class PetPlantFixture {

    public static class REQUEST {
        public static PetPlantRequest 피우미_등록_요청 = PetPlantRequest.builder()
                .dictionaryPlantId(1L)
                .nickname("피우미")
                .location("베란다")
                .flowerpot("플라스틱 화분")
                .waterCycle(3)
                .light("빛 많이 필요함")
                .wind("바람이 잘 통하는 곳")
                .birthDate(LocalDate.now())
                .lastWaterDate(LocalDate.now())
                .build();
    }
}
