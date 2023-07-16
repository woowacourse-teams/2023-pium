package com.official.pium.support;

import com.official.pium.domain.DictionaryPlant;
import com.official.pium.domain.WaterCycle;
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

        public DictionaryPlant build() {
            return dictionaryPlantRepository.save(
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
                            ).build()
            );
        }
    }
}
