package com.official.pium.support;

import com.official.pium.domain.DictionaryPlant;
import com.official.pium.domain.Member;
import com.official.pium.domain.PetPlant;
import com.official.pium.repository.DictionaryPlantRepository;
import com.official.pium.repository.MemberRepository;
import com.official.pium.repository.PetPlantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

import static com.official.pium.fixture.DictionaryPlantFixture.스투키;
import static com.official.pium.fixture.MemberFixture.주노;

@Component
@RequiredArgsConstructor
@SuppressWarnings("NonAsciiCharacters")
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
                            .dictionaryPlant(dictionaryPlant == null ? dictionaryPlantRepository.save(스투키) : dictionaryPlant)
                            .member(member == null ? memberRepository.save(주노) : member)
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
    }
}
