package com.official.pium.support;

import com.official.pium.domain.DictionaryPlant;
import com.official.pium.domain.WaterCycle;
import com.official.pium.domain.vo.CareDetail;
import com.official.pium.domain.vo.Classification;
import com.official.pium.domain.vo.Property;
import com.official.pium.domain.vo.Temperature;
import com.official.pium.repository.DictionaryPlantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@SuppressWarnings("NonAsciiCharacters")
public class DictionaryPlantSupport {

    private final DictionaryPlantRepository dictionaryPlantRepository;

    public DictionaryPlantBuilder builder() {
        return new DictionaryPlantBuilder();
    }

    public final class DictionaryPlantBuilder {

        private String name;

        public DictionaryPlantBuilder name(String name) {
            this.name = name;
            return this;
        }

        public DictionaryPlant build() {
            return dictionaryPlantRepository.save(
                    DictionaryPlant.builder()
                            .classification(Classification.builder()
                                    .name(name == null ? "스투키" : name)
                                    .familyName("선인장")
                                    .build())
                            .imageUrl("https://www.costco.co.kr/medias/sys_master/images/hd6/h37/31058517229598.jpg")
                            .property(Property.builder()
                                    .smell("안남")
                                    .poison("없음")
                                    .manageLevel("어려움")
                                    .growSpeed("빨리자람")
                                    .build())
                            .careDetail(CareDetail.builder()
                                    .temperature(Temperature.builder()
                                            .requireTemp("20도")
                                            .minimumTemp("0도")
                                            .build())
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
                                    )
                                    .build()
                            )
                            .build()
            );
        }
    }
}
