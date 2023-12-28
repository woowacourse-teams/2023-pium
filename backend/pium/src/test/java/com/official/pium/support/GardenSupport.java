package com.official.pium.support;

import com.official.pium.domain.DictionaryPlant;
import com.official.pium.domain.Garden;
import com.official.pium.domain.Member;
import com.official.pium.domain.vo.PlantState;
import com.official.pium.fixture.DictionaryPlantFixture;
import com.official.pium.fixture.MemberFixture;
import com.official.pium.repository.DictionaryPlantRepository;
import com.official.pium.repository.GardenRepository;
import com.official.pium.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@SuppressWarnings("NonAsciiCharacters")
public class GardenSupport {

    private final GardenRepository gardenRepository;
    private final DictionaryPlantRepository dictionaryPlantRepository;
    private final MemberRepository memberRepository;

    public GardenBuilder builder() {
        return new GardenBuilder();
    }

    public final class GardenBuilder {

        private Member member;
        private DictionaryPlant dictionaryPlant;

        public GardenBuilder member(Member member) {
            this.member = member;
            return this;
        }

        public GardenBuilder dictionaryPlant(DictionaryPlant dictionaryPlant) {
            this.dictionaryPlant = dictionaryPlant;
            return this;
        }

        public Garden build() {
            return gardenRepository.save(
                    Garden.builder()
                            .dictionaryPlant(dictionaryPlant == null ? dictionaryPlantRepository.save(
                                    DictionaryPlantFixture.generateDictionaryPlant()) : dictionaryPlant)
                            .member(member == null ? memberRepository.save(MemberFixture.generateMember()) : member)
                            .nickname("기영")
                            .imageUrl("imageUrl")
                            .plantState(
                                    PlantState.builder()
                                            .location("거실")
                                            .flowerpot("토분")
                                            .light("일반 조명")
                                            .wind("바람이 잘 안 통해요")
                                            .build()
                            )
                            .daySince(100L)
                            .waterCycle(3)
                            .content("기영이가 많이 아픈 것 같습니다.")
                            .manageLevel("초보자")
                            .build()
            );
        }
    }
}
