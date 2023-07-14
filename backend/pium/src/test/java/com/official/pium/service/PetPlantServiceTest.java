package com.official.pium.service;

import com.official.pium.controller.dto.PetPlantRequest;
import com.official.pium.domain.DictionaryPlant;
import com.official.pium.domain.Member;
import com.official.pium.fixture.DictionaryPlantFixture;
import com.official.pium.repository.DictionaryPlantRepository;
import com.official.pium.repository.MemberRepository;
import com.official.pium.repository.PetPlantRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@SpringBootTest
class PetPlantServiceTest {

    private Member member;
    private DictionaryPlant dictionaryPlant;

    @Autowired
    private PetPlantService petPlantService;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PetPlantRepository petPlantRepository;

    @Autowired
    private DictionaryPlantRepository dictionaryPlantRepository;

    @BeforeEach
    void setUp() {
        dictionaryPlant = DictionaryPlantFixture.스투키;
        dictionaryPlantRepository.save(dictionaryPlant);

        member = new Member("guest@gmail.com");
        memberRepository.save(member);
    }

    @Test
    void 반려_식물_등록() {
        PetPlantRequest request = new PetPlantRequest(
                dictionaryPlant.getId(),
                "피우미",
                "베란다",
                "플라스틱 화분",
                3,
                "빛 많이 필요함",
                "바람이 잘 통하는 곳",
                LocalDate.now(),
                LocalDate.now()
        );

        petPlantService.create(request, member);
        assertThat(petPlantRepository.findAll()).isNotEmpty();
    }
}
