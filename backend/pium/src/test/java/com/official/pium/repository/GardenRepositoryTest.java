package com.official.pium.repository;

import static org.assertj.core.api.SoftAssertions.assertSoftly;

import com.official.pium.RepositoryTest;
import com.official.pium.domain.DictionaryPlant;
import com.official.pium.domain.Garden;
import com.official.pium.domain.Member;
import com.official.pium.domain.PetPlant;
import java.time.LocalDate;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
public class GardenRepositoryTest extends RepositoryTest {

    private Member member;
    private DictionaryPlant dictionaryPlant;
    private PetPlant petPlant;

    @Autowired
    private GardenRepository gardenRepository;

    @Autowired
    private PetPlantRepository petPlantRepository;

    @Autowired
    private DictionaryPlantRepository dictionaryPlantRepository;

    @Autowired
    private MemberRepository memberRepository;

    @BeforeEach
    void setUp() {
        member = memberRepository.save(Member.builder().build());
        dictionaryPlant = dictionaryPlantRepository.save(DictionaryPlant.builder().build());
        petPlant = petPlantRepository.save(createPetPlant());
    }

    @Test
    void 모두의_정원_게시글_저장() {
        Garden garden = createGarden();
        Garden saveGarden = gardenRepository.save(garden);

        assertSoftly(
                softly -> {
                    softly.assertThat(saveGarden).isNotNull();
                    softly.assertThat(saveGarden.getId()).isEqualTo(garden.getId());
                }
        );
    }

    private Garden createGarden() {
        return Garden.builder()
                .dictionaryPlant(petPlant.getDictionaryPlant())
                .member(petPlant.getMember())
                .nickname(petPlant.getNickname())
                .imageUrl(petPlant.getImageUrl())
                .location(petPlant.getLocation())
                .flowerpot(petPlant.getFlowerpot())
                .light(petPlant.getLight())
                .wind(petPlant.getWind())
                .daySince(petPlant.calculateDaySince(LocalDate.now()))
                .waterCycle(petPlant.getWaterCycle())
                .content("기영이가 아프네요..")
                .manageLevel("초보자")
                .build();
    }

    private PetPlant createPetPlant() {
        return PetPlant.builder()
                .dictionaryPlant(dictionaryPlant)
                .member(member)
                .nickname("피우미")
                .imageUrl("https://image.com")
                .location("베란다")
                .flowerpot("화분")
                .light("밝아요")
                .wind("추워요")
                .birthDate(LocalDate.of(2020, 1, 3))
                .nextWaterDate(LocalDate.of(2020, 1, 3))
                .lastWaterDate(LocalDate.of(2020, 1, 3))
                .waterCycle(3)
                .build();
    }
}
