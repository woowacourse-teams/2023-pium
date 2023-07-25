package com.official.pium.service;

import com.official.pium.IntegrationTest;
import com.official.pium.domain.DictionaryPlant;
import com.official.pium.domain.Member;
import com.official.pium.domain.PetPlant;
import com.official.pium.repository.PetPlantRepository;
import com.official.pium.service.dto.DataResponse;
import com.official.pium.service.dto.PetPlantCreateRequest;
import com.official.pium.service.dto.PetPlantResponse;
import com.official.pium.service.dto.SinglePetPlantResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class PetPlantServiceTest extends IntegrationTest {

    private Member member;
    private DictionaryPlant dictionaryPlant;

    @Autowired
    private PetPlantService petPlantService;

    @Autowired
    private PetPlantRepository petPlantRepository;

    @BeforeEach
    void setUp() {
        dictionaryPlant = dictionaryPlantSupport.builder().build();
        member = memberSupport.builder().build();
    }

    @Test
    void 반려_식물_등록() {
        PetPlantCreateRequest request = PetPlantCreateRequest.builder()
                .dictionaryPlantId(dictionaryPlant.getId())
                .nickname("피우미")
                .location("베란다")
                .flowerpot("플라스틱 화분")
                .waterCycle(3)
                .light("빛 많이 필요함")
                .wind("바람이 잘 통하는 곳")
                .birthDate(LocalDate.now())
                .lastWaterDate(LocalDate.now())
                .build();

        PetPlantResponse petPlantResponse = petPlantService.create(request, member);

        assertThat(petPlantRepository.findById(petPlantResponse.getId())).isNotEmpty();
    }

    @Test
    void 존재하지_않는_반려_식물을_조회하면_예외_발생() {
        Long wrongId = -1L;

        assertThatThrownBy(() -> petPlantService.read(wrongId))
                .isInstanceOf(NoSuchElementException.class)
                .hasMessage("일치하는 반려 식물이 존재하지 않습니다. id: " + wrongId);
    }

    @Test
    void 반려_식물_단건_조회() {
        PetPlant petPlant = petPlantSupport.builder().build();

        PetPlantResponse petPlantResponse = petPlantService.read(petPlant.getId());

        assertAll(
                () -> assertThat(petPlantResponse.getId()).isEqualTo(petPlant.getId()),
                () -> assertThat(petPlantResponse.getNickname()).isEqualTo(petPlant.getNickname())
        );
    }

    @Test
    void 반려_식물_전체_조회() {
        petPlantRepository.save(petPlantSupport.builder().member(member).build());

        DataResponse<List<SinglePetPlantResponse>> response = petPlantService.readAll(member);

        List<SinglePetPlantResponse> data = response.getData();
        assertThat(data).isNotEmpty();
    }
}
