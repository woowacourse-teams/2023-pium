package com.official.pium.fixture;

import static com.official.pium.service.dto.PetPlantResponse.DictionaryPlantResponse;
import static com.official.pium.service.dto.PetPlantResponse.builder;

import com.official.pium.domain.PetPlant;
import com.official.pium.domain.vo.PetPlantState;
import com.official.pium.domain.vo.WaterDetail;
import com.official.pium.service.dto.DataResponse;
import com.official.pium.service.dto.PetPlantCreateRequest;
import com.official.pium.service.dto.PetPlantResponse;
import com.official.pium.service.dto.PetPlantUpdateRequest;
import com.official.pium.service.dto.SinglePetPlantResponse;
import java.time.LocalDate;
import java.util.List;

@SuppressWarnings("NonAsciiCharacters")
public class PetPlantFixture {

    public static PetPlant 산세베리아 = PetPlant.builder()
            .nickname("기영이")
            .imageUrl("https://image.com")
            .petPlantState(
                    PetPlantState.builder()
                            .light("자연광이 잘 드는 곳")
                            .location("창가")
                            .wind("바람이 가끔 부는 곳")
                            .flowerpot("플라스틱")
                            .build()
            )
            .waterCycle(7)
            .birthDate(LocalDate.of(2022, 7, 1))
            .waterDetail(
                    WaterDetail.builder()
                            .lastWaterDate(LocalDate.of(2022, 7, 1))
                            .nextWaterDate(LocalDate.of(2022, 7, 8))
                            .build()
            )
            .build();

    public static class REQUEST {
        public static PetPlantCreateRequest 피우미_등록_요청 = PetPlantCreateRequest.builder()
                .dictionaryPlantId(1L)
                .nickname("피우미")
                .location("베란다")
                .flowerpot("플라스틱 화분")
                .waterCycle(3)
                .light("빛 많이 필요함")
                .wind("바람이 잘 통하는 곳")
                .birthDate(LocalDate.of(2022, 4, 1))
                .lastWaterDate(LocalDate.of(2023, 5, 5))
                .build();

        public static PetPlantUpdateRequest 피우미_수정_요청 = PetPlantUpdateRequest.builder()
                .nickname("피우미 2")
                .location("침대 옆")
                .flowerpot("유리병")
                .waterCycle(10)
                .light("빛 많이 필요함")
                .wind("바람이 잘 통하는 곳")
                .birthDate(LocalDate.of(2020, 1, 3))
                .lastWaterDate(LocalDate.of(2020, 1, 3))
                .build();

        public static PetPlantCreateRequest generatePetPlantCreateRequest(Long dictionaryPlantId) {
            return PetPlantCreateRequest.builder()
                    .dictionaryPlantId(dictionaryPlantId)
                    .nickname("피우미")
                    .location("베란다")
                    .flowerpot("플라스틱 화분")
                    .waterCycle(3)
                    .light("빛 많이 필요함")
                    .wind("바람이 잘 통하는 곳")
                    .birthDate(LocalDate.of(2020, 1, 3))
                    .lastWaterDate(LocalDate.of(2020, 1, 3))
                    .build();
        }

        public static PetPlantUpdateRequest generatePetPlantUpdateRequest(LocalDate lastWaterDate) {
            return PetPlantUpdateRequest.builder()
                    .nickname("피우미 2")
                    .location("침대 옆")
                    .flowerpot("유리병")
                    .waterCycle(10)
                    .light("빛 많이 필요함")
                    .wind("바람이 잘 통하는 곳")
                    .birthDate(LocalDate.now())
                    .lastWaterDate(lastWaterDate)
                    .build();
        }
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
                .birthDate(LocalDate.of(2000, 6, 13))
                .lastWaterDate(LocalDate.of(2020, 1, 3))
                .nextWaterDate(LocalDate.of(2020, 1, 15))
                .waterCycle(3)
                .dday(1L)
                .daySince(1L)
                .dictionaryPlant(DictionaryPlantResponse.builder()
                        .id(1L)
                        .name("스투키")
                        .build())
                .build();

        public static DataResponse<List<SinglePetPlantResponse>> 식물_전체조회_응답 =
                DataResponse.<List<SinglePetPlantResponse>>builder().data(
                        List.of(
                                SinglePetPlantResponse.builder()
                                        .id(1L)
                                        .nickname("엄청 큰 피우미")
                                        .imageUrl("https://image.com")
                                        .dictionaryPlantName("스투키")
                                        .birthDate(LocalDate.of(2020, 6, 16))
                                        .daySince(3L)
                                        .build()
                        )
                ).build();
    }
}
