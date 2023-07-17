package com.official.pium.fixture;

import static com.official.pium.service.dto.PetPlantResponse.DictionaryPlantResponse;
import static com.official.pium.service.dto.PetPlantResponse.builder;

import com.official.pium.domain.PetPlant;
import com.official.pium.service.dto.PetPlantRequest;
import com.official.pium.service.dto.PetPlantResponse;
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

    public static class RESPONSE {
        public static PetPlantResponse 피우미_응답 = builder()
                .id(1L)
                .nickname("피우미")
                .imageUrl("https://image.com")
                .location("베란다")
                .flowerpot("플라스틱 화분")
                .light("빛 많이 필요함")
                .wind("바람이 잘 통하는 곳")
                .birthDate(LocalDate.now())
                .lastWaterDate(LocalDate.now())
                .waterCycle(3)
                .nextWaterDay(1L)
                .daySince(1L)
                .dictionaryPlant(DictionaryPlantResponse.builder()
                        .id(1L)
                        .name("스투키")
                        .build())
                .build();
    }

    public static PetPlant 산세베리아 = PetPlant.builder()
            .nickname("기영이")
            .imageUrl("image.url")
            .light("자연광이 잘 드는 곳")
            .location("창가")
            .wind("바람이 가끔 부는 곳")
            .flowerpot("플라스틱")
            .waterCycle(7)
            .birthDate(LocalDate.of(2022, 7, 1))
            .lastWaterDate(LocalDate.of(2022, 7, 1))
            .nextWaterDate(LocalDate.of(2022, 7, 8))
            .build();
}
