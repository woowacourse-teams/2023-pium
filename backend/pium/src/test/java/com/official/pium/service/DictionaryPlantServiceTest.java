package com.official.pium.service;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import com.official.pium.IntegrationTest;
import com.official.pium.domain.Admin;
import com.official.pium.domain.DictionaryPlant;
import com.official.pium.fixture.DictionaryPlantFixture.REQUEST;
import com.official.pium.mapper.DictionaryPlantMapper;
import com.official.pium.repository.DictionaryPlantRepository;
import com.official.pium.repository.PetPlantRepository;
import com.official.pium.service.dto.DataResponse;
import com.official.pium.service.dto.DictionaryPlantResponse;
import com.official.pium.service.dto.DictionaryPlantSearchResponse;
import com.official.pium.service.dto.DictionaryPlantUpdateRequest;
import java.util.List;
import java.util.NoSuchElementException;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class DictionaryPlantServiceTest extends IntegrationTest {

    @Autowired
    private DictionaryPlantService dictionaryPlantService;

    @Autowired
    private PetPlantRepository petPlantRepository;

    @Autowired
    private DictionaryPlantRepository dictionaryPlantRepository;

    @Test
    void 사전_식물_상세_정보_조회() {
        DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
        DictionaryPlantResponse actual = dictionaryPlantService.read(dictionaryPlant.getId());

        DictionaryPlantResponse expected = DictionaryPlantMapper.toDictionaryPlantResponse(dictionaryPlant);

        assertThat(actual)
                .usingRecursiveComparison()
                .isEqualTo(expected);
    }

    @Test
    void 사전_식물_상세_정보_조회에_실패하면_예외_발생() {
        Long id = 0L;

        assertThatThrownBy(() -> dictionaryPlantService.read(id))
                .isInstanceOf(NoSuchElementException.class)
                .hasMessage("사전 식물이 존재하지 않습니다. id: " + id);
    }

    @Test
    void 사전식물_검색시_검색명이_포함된_사전식물을_반환() {
        DictionaryPlant 스투키1 = dictionaryPlantSupport.builder().build();
        DictionaryPlant 스투키2 = dictionaryPlantSupport.builder().build();

        DataResponse<List<DictionaryPlantSearchResponse>> searchResultsContainsParamName = dictionaryPlantService.search(
                "스투");

        assertSoftly(
                softly -> {
                    softly.assertThat(searchResultsContainsParamName.getData()).hasSize(2);
                    softly.assertThat(searchResultsContainsParamName.getData().get(0).getId()).isEqualTo(스투키1.getId());
                    softly.assertThat(searchResultsContainsParamName.getData().get(1).getId()).isEqualTo(스투키2.getId());
                }
        );
    }

    @Test
    void 사전식물_검색시_검색명이_포함된_사전식물이_없으면_빈_리스트를_반환() {
        DataResponse<List<DictionaryPlantSearchResponse>> search = dictionaryPlantService.search("스투");

        assertThat(search.getData()).isEmpty();
    }

    @Test
    void 사전_식물_정보_수정() {
        DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
        Long dictionaryPlantId = dictionaryPlant.getId();
        DictionaryPlantUpdateRequest updateRequest = REQUEST.사전_식물_수정_요청;

        dictionaryPlantService.update(new Admin(), dictionaryPlantId, updateRequest);

        assertSoftly(softly -> {
            softly.assertThat(dictionaryPlant.getName()).isEqualTo(updateRequest.getName());
            softly.assertThat(dictionaryPlant.getImageUrl()).isEqualTo(updateRequest.getImageUrl());
            softly.assertThat(dictionaryPlant.getFamilyName()).isEqualTo(updateRequest.getFamilyName());
            softly.assertThat(dictionaryPlant.getSmell()).isEqualTo(updateRequest.getSmell());
            softly.assertThat(dictionaryPlant.getPoison()).isEqualTo(updateRequest.getPoison());
            softly.assertThat(dictionaryPlant.getManageLevel()).isEqualTo(updateRequest.getManageLevel());
            softly.assertThat(dictionaryPlant.getGrowSpeed()).isEqualTo(updateRequest.getGrowSpeed());
            softly.assertThat(dictionaryPlant.getRequireTemp()).isEqualTo(updateRequest.getRequireTemp());
            softly.assertThat(dictionaryPlant.getMinimumTemp()).isEqualTo(updateRequest.getMinimumTemp());
            softly.assertThat(dictionaryPlant.getRequireHumidity()).isEqualTo(updateRequest.getRequireHumidity());
            softly.assertThat(dictionaryPlant.getPostingPlace()).isEqualTo(updateRequest.getPostingPlace());
            softly.assertThat(dictionaryPlant.getSpecialManageInfo()).isEqualTo(updateRequest.getSpecialManageInfo());
            softly.assertThat(dictionaryPlant.getWaterCycle().getSpring()).isEqualTo(updateRequest.getSpring());
            softly.assertThat(dictionaryPlant.getWaterCycle().getSummer()).isEqualTo(updateRequest.getSummer());
            softly.assertThat(dictionaryPlant.getWaterCycle().getAutumn()).isEqualTo(updateRequest.getAutumn());
            softly.assertThat(dictionaryPlant.getWaterCycle().getWinter()).isEqualTo(updateRequest.getWinter());
        });
    }

    @Test
    void 사전_식물_삭제() {
        DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
        Long dictionaryPlantId = dictionaryPlant.getId();
        dictionaryPlantService.delete(new Admin(), dictionaryPlantId);

        assertThat(dictionaryPlantRepository.findById(dictionaryPlantId)).isEmpty();
    }

    @Test
    void 사전_식물_삭제_시_참조하는_반려_식물이_존재하면_예외_발생() {
        DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
        Long dictionaryPlantId = dictionaryPlant.getId();
        petPlantSupport.builder().dictionaryPlant(dictionaryPlant).build();

        assertThatThrownBy(() ->
                        dictionaryPlantService.delete(new Admin(), dictionaryPlantId)
                ).isInstanceOf(IllegalArgumentException.class)
                .hasMessage("해당 개체를 참조하는 반려 식물이 존재합니다 id: " + dictionaryPlantId);
    }
}
