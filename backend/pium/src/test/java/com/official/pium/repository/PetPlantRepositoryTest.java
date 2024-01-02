package com.official.pium.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import com.official.pium.RepositoryTest;
import com.official.pium.dictionaryPlant.domain.DictionaryPlant;
import com.official.pium.dictionaryPlant.repository.DictionaryPlantRepository;
import com.official.pium.member.domain.Member;
import com.official.pium.member.repository.MemberRepository;
import com.official.pium.petPlant.domain.PetPlant;
import com.official.pium.petPlant.domain.vo.PetPlantState;
import com.official.pium.petPlant.domain.vo.WaterDetail;
import com.official.pium.petPlant.repository.PetPlantRepository;
import java.time.LocalDate;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class PetPlantRepositoryTest extends RepositoryTest {

    private Member member;
    private DictionaryPlant dictionaryPlant;

    @Autowired
    private PetPlantRepository petPlantRepository;

    @Autowired
    private DictionaryPlantRepository dictionaryPlantRepository;

    @Autowired
    private MemberRepository memberRepository;

    @BeforeEach
    void setUp() {
        member = Member.builder().build();
        memberRepository.save(member);

        dictionaryPlant = DictionaryPlant.builder().build();
        dictionaryPlantRepository.save(dictionaryPlant);
    }

    @Test
    void 반려_식물_저장() {
        PetPlant petPlant = createPetPlant();

        PetPlant savePetPlant = petPlantRepository.save(petPlant);

        assertSoftly(
                softly -> {
                    softly.assertThat(savePetPlant).isNotNull();
                    softly.assertThat(savePetPlant.getId()).isEqualTo(petPlant.getId());
                }
        );
    }

    @Test
    void 반려_식물_조회() {
        PetPlant petPlant = createPetPlant();

        PetPlant savePetPlant = petPlantRepository.save(petPlant);

        assertThat(petPlantRepository.findById(savePetPlant.getId())).isPresent();
    }

    @Test
    void 반려_식물_삭제() {
        PetPlant petPlant = createPetPlant();
        petPlantRepository.save(petPlant);

        petPlantRepository.delete(petPlant);

        assertThat(petPlantRepository.findById(petPlant.getId())).isEmpty();
    }

    private PetPlant createPetPlant() {
        return PetPlant.builder()
                .dictionaryPlant(dictionaryPlant)
                .member(member)
                .nickname("피우미")
                .imageUrl("https://image.com")
                .petPlantState(
                        PetPlantState.builder()
                                .location("베란다")
                                .flowerpot("화분")
                                .light("밝아요")
                                .wind("추워요")
                                .build()
                )
                .birthDate(LocalDate.of(2020, 1, 3))
                .waterDetail(
                        WaterDetail.builder()
                                .nextWaterDate(LocalDate.of(2020, 1, 3))
                                .lastWaterDate(LocalDate.of(2020, 1, 3))
                                .build()
                )
                .waterCycle(3)
                .build();
    }
}
