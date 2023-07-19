package com.official.pium.fixture;

import com.official.pium.domain.DictionaryPlant;
import com.official.pium.domain.WaterCycle;
import com.official.pium.service.dto.DataResponse;
import com.official.pium.service.dto.DictionaryPlantResponse;
import com.official.pium.service.dto.DictionaryPlantResponse.WaterCycleResponse;
import com.official.pium.service.dto.DictionaryPlantSearchResponse;

import java.util.List;

@SuppressWarnings("NonAsciiCharacters")
public class DictionaryPlantFixture {

    public static DictionaryPlant 스투키 =
            DictionaryPlant.builder()
                    .name("스투키")
                    .imageUrl("https://www.costco.co.kr/medias/sys_master/images/hd6/h37/31058517229598.jpg")
                    .familyName("선인장")
                    .smell("안남")
                    .poison("없음")
                    .manageLevel("어려움")
                    .growSpeed("빨리자람")
                    .requireTemp("20도")
                    .minimumTemp("0도")
                    .requireHumidity("15%")
                    .postingPlace("베란다 앞")
                    .specialManageInfo("물을 많이 주지않아도 됩니다.")
                    .waterCycle(
                            WaterCycle.builder()
                                    .spring("겉흙이 마르면 촉촉하게")
                                    .summer("겉흙이 마르면 촉촉하게")
                                    .autumn("겉흙이 마르면 촉촉하게")
                                    .winter("겉흙이 마르면 촉촉하게")
                                    .build()
                    ).build();

    public static class RESPONSE {

        public static DictionaryPlantResponse 스투키_단일_조회_응답 =
                DictionaryPlantResponse.builder()
                        .id(1L)
                        .name("스투키")
                        .image("https://www.costco.co.kr/medias/sys_master/images/hd6/h37/31058517229598.jpg")
                        .familyName("선인장")
                        .smell("안남")
                        .poison("없음")
                        .manageLevel("어려움")
                        .growSpeed("빨리자람")
                        .requireTemp("20도")
                        .minimumTemp("0도")
                        .requireHumidity("15%")
                        .postingPlace("베란다 앞")
                        .specialManageInfo("물을 많이 주지않아도 됩니다.")
                        .waterCycle(
                                WaterCycleResponse.builder()
                                        .spring("겉흙이 마르면 촉촉하게")
                                        .summer("겉흙이 마르면 촉촉하게")
                                        .autumn("겉흙이 마르면 촉촉하게")
                                        .winter("겉흙이 마르면 촉촉하게")
                                        .build()
                        ).build();

        public static DataResponse<List<DictionaryPlantSearchResponse>> 스투키_산세베리아_율마_검색결과 =
                DataResponse.<List<DictionaryPlantSearchResponse>>builder()
                        .data(
                                List.of(
                                        DictionaryPlantSearchResponse.builder()
                                                .id(1L)
                                                .name("스투키")
                                                .image("http://image.com")
                                                .build(),
                                        DictionaryPlantSearchResponse.builder()
                                                .id(2L)
                                                .name("산세베리아")
                                                .image("http://image.com")
                                                .build(),
                                        DictionaryPlantSearchResponse.builder()
                                                .id(3L)
                                                .name("율마")
                                                .image("http://image.com")
                                                .build()
                                )
                        )
                        .build();
    }
}
