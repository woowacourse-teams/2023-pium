package com.official.pium.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.official.pium.RepositoryTest;
import com.official.pium.domain.DictionaryPlant;
import com.official.pium.domain.Member;
import com.official.pium.domain.PetPlant;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;

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
        member = Member.builder().email("hello@aaa.com").build();
        memberRepository.save(member);

        dictionaryPlant = DictionaryPlant.builder().build();
        dictionaryPlantRepository.save(dictionaryPlant);
    }

    @Test
    void 반려_식물_저장() {
        PetPlant petPlant = PetPlant.builder()
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

        PetPlant savePetPlant = petPlantRepository.save(petPlant);

        assertAll(
                () -> assertThat(savePetPlant).isNotNull(),
                () -> assertThat(savePetPlant.getId()).isEqualTo(petPlant.getId())
        );
    }

    @Test
    void 반려_식물_조회() {
        PetPlant petPlant = PetPlant.builder()
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

        PetPlant savePetPlant = petPlantRepository.save(petPlant);

        assertThat(petPlantRepository.findById(savePetPlant.getId())).isPresent();
    }
}
