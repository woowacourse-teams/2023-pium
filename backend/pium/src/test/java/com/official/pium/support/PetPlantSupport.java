package com.official.pium.support;

import com.official.pium.domain.DictionaryPlant;
import com.official.pium.domain.Member;
import com.official.pium.domain.PetPlant;
import com.official.pium.domain.WaterCycle;
import com.official.pium.repository.DictionaryPlantRepository;
import com.official.pium.repository.MemberRepository;
import com.official.pium.repository.PetPlantRepository;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PetPlantSupport {

    private final MemberRepository memberRepository;
    private final PetPlantRepository petPlantRepository;
    private final DictionaryPlantRepository dictionaryPlantRepository;

    public PetPlantBuilder builder() {
        return new PetPlantBuilder();
    }

    public final class PetPlantBuilder {

        private Member member;
        private DictionaryPlant dictionaryPlant;

        public PetPlantBuilder member(Member member) {
            this.member = member;
            return this;
        }

        public PetPlantBuilder dictionaryPlant(DictionaryPlant dictionaryPlant) {
            this.dictionaryPlant = dictionaryPlant;
            return this;
        }

        public PetPlant build() {
            return petPlantRepository.save(
                    PetPlant.builder()
                            .dictionaryPlant(dictionaryPlant == null ? dictionaryPlantRepository.save(generateDictionaryPlant()) : dictionaryPlant)
                            .member(member == null ? memberRepository.save(generateMember()) : member)
                            .nickname("testNickName")
                            .imageUrl("testImageUrl")
                            .location("testLocation")
                            .flowerpot("testFlowerpot")
                            .light("testLight")
                            .wind("testWind")
                            .birthDate(LocalDate.now())
                            .nextWaterDate(LocalDate.now())
                            .lastWaterDate(LocalDate.now())
                            .waterCycle(3)
                            .build()
            );
        }

        private DictionaryPlant generateDictionaryPlant() {
            return DictionaryPlant.builder()
                    .name("라벤다")
                    .imageUrl("https://www.costco.co.kr/medias/sys_master/images/hd6/h37/31058517229598.jpg")
                    .familyName("멋진 라벤더")
                    .smell("안남")
                    .poison("없음")
                    .manageLevel("쉬움")
                    .growSpeed("빨리자람")
                    .requireTemp("14도")
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
        }

        private Member generateMember() {
            return Member.builder()
                    .email("pium@gmail.com")
                    .build();
        }
    }
}
