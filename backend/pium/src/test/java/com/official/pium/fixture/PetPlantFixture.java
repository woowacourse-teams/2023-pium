package com.official.pium.fixture;

import com.official.pium.service.dto.DataResponse;
import com.official.pium.service.dto.PetPlantRequest;
import com.official.pium.service.dto.PetPlantResponse;
import com.official.pium.service.dto.SinglePetPlantResponse;

import java.time.LocalDate;
import java.util.List;

import static com.official.pium.service.dto.PetPlantResponse.DictionaryPlantResponse;

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
        public static PetPlantResponse 피우미_응답 = PetPlantResponse.builder()
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

        public static DataResponse<SinglePetPlantResponse> 식물_전체조회_응답 =
                new DataResponse<SinglePetPlantResponse>(
                        List.of(
                                SinglePetPlantResponse.builder()
                                        .nickname("엄청 큰 피우미")
                                        .imageUrl("https://imgae.com")
                                        .dictionaryPlantName("스투키")
                                        .birthDate(LocalDate.now())
                                        .daySince(3L)
                                        .build()
                        )
                );
    }
}
