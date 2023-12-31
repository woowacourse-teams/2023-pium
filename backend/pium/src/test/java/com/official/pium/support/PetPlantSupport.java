package com.official.pium.support;

import com.official.pium.dictionaryPlant.domain.DictionaryPlant;
import com.official.pium.dictionaryPlant.repository.DictionaryPlantRepository;
import com.official.pium.fixture.DictionaryPlantFixture;
import com.official.pium.fixture.MemberFixture;
import com.official.pium.member.domain.Member;
import com.official.pium.member.repository.MemberRepository;
import com.official.pium.petPlant.domain.PetPlant;
import com.official.pium.petPlant.domain.vo.PetPlantState;
import com.official.pium.petPlant.domain.vo.WaterDetail;
import com.official.pium.petPlant.repository.PetPlantRepository;
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
        private LocalDate lastWaterDate;
        private String imageUrl;

        public PetPlantBuilder member(Member member) {
            this.member = member;
            return this;
        }

        public PetPlantBuilder dictionaryPlant(DictionaryPlant dictionaryPlant) {
            this.dictionaryPlant = dictionaryPlant;
            return this;
        }

        public PetPlantBuilder lastWaterDate(LocalDate lastWaterDate) {
            this.lastWaterDate = lastWaterDate;
            return this;
        }

        public PetPlantBuilder imageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
            return this;
        }

        public PetPlant build() {
            return petPlantRepository.save(
                    PetPlant.builder()
                            .dictionaryPlant(dictionaryPlant == null ? dictionaryPlantRepository.save(
                                    DictionaryPlantFixture.generateDictionaryPlant()) : dictionaryPlant)
                            .member(member == null ? memberRepository.save(MemberFixture.generateMember()) : member)
                            .nickname("testNickName")
                            .imageUrl(imageUrl == null ? "https://static.pium.life/test/test.jpg" : imageUrl)
                            .petPlantState(
                                    PetPlantState.builder()
                                            .location("testLocation")
                                            .flowerpot("testFlowerpot")
                                            .light("testLight")
                                            .wind("testWind")
                                            .build()
                            )
                            .birthDate(LocalDate.of(2000, 6, 14))
                            .waterDetail(
                                    WaterDetail.builder()
                                            .nextWaterDate(LocalDate.of(2020, 2, 3))
                                            .lastWaterDate(LocalDate.of(2022, 3, 4))
                                            .build()
                            )
                            .waterCycle(3)
                            .build()
            );
        }
    }
}
