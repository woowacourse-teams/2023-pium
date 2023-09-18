package com.official.pium.fixture;

import com.official.pium.service.dto.GardenCreateRequest;
import com.official.pium.service.dto.GardenResponse;
import com.official.pium.service.dto.SingleGardenResponse;
import java.time.LocalDateTime;
import java.util.List;

@SuppressWarnings("NonAsciiCharacters")
public class GardenFixture {

    public static class REQUEST {

        public static GardenCreateRequest 정원_게시글_등록_요청 = GardenCreateRequest.builder()
                .petPlantId(1L)
                .content("기영아 무럭무럭 자라라 ~")
                .manageLevel("초보자")
                .build();
    }

    public static class RESPONSE {

        public static GardenResponse 정원_게시글_전체_조회 = GardenResponse.builder()
                .page(0)
                .size(5)
                .elementSize(3L)
                .hasNext(false)
                .data(
                        List.of(
                                SingleGardenResponse.builder()
                                        .id(1L)
                                        .createdAt(LocalDateTime.now())
                                        .updatedAt(LocalDateTime.now())
                                        .dictionaryPlantName("스투키")
                                        .content("스투키 귀엽네요..... .....^-^")
                                        .manageLevel("초보자")
                                        .petPlant(
                                                SingleGardenResponse.PetPlantInfo.builder()
                                                        .imageUrl("imageUrl")
                                                        .nickname("기영이")
                                                        .location("거실")
                                                        .flowerpot("유리")
                                                        .light("일반 조명")
                                                        .wind("바람 안 통해요")
                                                        .daySince(3L)
                                                        .waterCycle(3)
                                                        .build()
                                        )
                                        .build(),
                                SingleGardenResponse.builder()
                                        .id(2L)
                                        .createdAt(LocalDateTime.now().minusDays(1))
                                        .updatedAt(LocalDateTime.now().minusDays(1))
                                        .dictionaryPlantName("장미")
                                        .content("장미 귀엽네요..... .....^-^")
                                        .manageLevel("초보자")
                                        .petPlant(
                                                SingleGardenResponse.PetPlantInfo.builder()
                                                        .imageUrl("imageUrl")
                                                        .nickname("기철이")
                                                        .location("거실")
                                                        .flowerpot("유리")
                                                        .light("일반 조명")
                                                        .wind("바람 안 통해요")
                                                        .daySince(3L)
                                                        .waterCycle(3)
                                                        .build()
                                        )
                                        .build(),
                                SingleGardenResponse.builder()
                                        .id(3L)
                                        .createdAt(LocalDateTime.now().minusDays(2))
                                        .updatedAt(LocalDateTime.now().minusDays(2))
                                        .dictionaryPlantName("스투키")
                                        .content("스투키 귀엽네요..... .....^-^22")
                                        .manageLevel("초보자")
                                        .petPlant(
                                                SingleGardenResponse.PetPlantInfo.builder()
                                                        .imageUrl("imageUrl")
                                                        .nickname("기영이2")
                                                        .location("거실")
                                                        .flowerpot("유리")
                                                        .light("일반 조명")
                                                        .wind("바람 안 통해요")
                                                        .daySince(3L)
                                                        .waterCycle(3)
                                                        .build()
                                        )
                                        .build()
                        )
                )
                .build();

        public static GardenResponse 정원_게시글_필터링_조회 = GardenResponse.builder()
                .page(0)
                .size(5)
                .elementSize(2L)
                .hasNext(false)
                .data(
                        List.of(
                                SingleGardenResponse.builder()
                                        .id(1L)
                                        .createdAt(LocalDateTime.now())
                                        .updatedAt(LocalDateTime.now())
                                        .dictionaryPlantName("스투키")
                                        .content("스투키 귀엽네요..... .....^-^")
                                        .manageLevel("초보자")
                                        .petPlant(
                                                SingleGardenResponse.PetPlantInfo.builder()
                                                        .imageUrl("imageUrl")
                                                        .nickname("기영이")
                                                        .location("거실")
                                                        .flowerpot("유리")
                                                        .light("일반 조명")
                                                        .wind("바람 안 통해요")
                                                        .daySince(3L)
                                                        .waterCycle(3)
                                                        .build()
                                        )
                                        .build(),
                                SingleGardenResponse.builder()
                                        .id(3L)
                                        .createdAt(LocalDateTime.now().minusDays(2))
                                        .updatedAt(LocalDateTime.now().minusDays(2))
                                        .dictionaryPlantName("스투키")
                                        .content("스투키 귀엽네요..... .....^-^22")
                                        .manageLevel("초보자")
                                        .petPlant(
                                                SingleGardenResponse.PetPlantInfo.builder()
                                                        .imageUrl("imageUrl")
                                                        .nickname("기영이2")
                                                        .location("거실")
                                                        .flowerpot("유리")
                                                        .light("일반 조명")
                                                        .wind("바람 안 통해요")
                                                        .daySince(3L)
                                                        .waterCycle(3)
                                                        .build()
                                        )
                                        .build()
                        )
                )
                .build();
    }
}
