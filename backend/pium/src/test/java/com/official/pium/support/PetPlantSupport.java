package com.official.pium.support;

import com.official.pium.domain.DictionaryPlant;
import com.official.pium.domain.Member;
import com.official.pium.domain.PetPlant;
import com.official.pium.fixture.DictionaryPlantFixture;
import com.official.pium.fixture.MemberFixture;
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
                            .dictionaryPlant(dictionaryPlant == null ? dictionaryPlantRepository.save(
                                    DictionaryPlantFixture.generateDictionaryPlant()) : dictionaryPlant)
                            .member(member == null ? memberRepository.save(MemberFixture.generateMember()) : member)
                            .nickname("testNickName")
                            .imageUrl("testImageUrl")
                            .location("testLocation")
                            .flowerpot("testFlowerpot")
                            .light("testLight")
                            .wind("testWind")
                            .birthDate(LocalDate.of(2000, 6, 14))
                            .nextWaterDate(LocalDate.of(2020, 2, 3))
                            .lastWaterDate(LocalDate.of(2022, 3, 4))
                            .waterCycle(3)
                            .build()
            );
        }
    }
}
