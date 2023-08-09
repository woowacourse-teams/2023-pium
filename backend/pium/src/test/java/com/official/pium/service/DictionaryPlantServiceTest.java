package com.official.pium.service;


import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.official.pium.IntegrationTest;
import com.official.pium.domain.DictionaryPlant;
import com.official.pium.mapper.DictionaryPlantMapper;
import com.official.pium.service.dto.DataResponse;
import com.official.pium.service.dto.DictionaryPlantResponse;
import com.official.pium.service.dto.DictionaryPlantSearchResponse;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.NoSuchElementException;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class DictionaryPlantServiceTest extends IntegrationTest {

    @Autowired
    private DictionaryPlantService dictionaryPlantService;

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

        assertAll(
                () -> assertThat(searchResultsContainsParamName.getData()).hasSize(2),
                () -> assertThat(searchResultsContainsParamName.getData().get(0).getId()).isEqualTo(스투키1.getId()),
                () -> assertThat(searchResultsContainsParamName.getData().get(1).getId()).isEqualTo(스투키2.getId())
        );
    }

    @Test
    void 사전식물_검색시_검색명이_포함된_사전식물이_없으면_빈_리스트를_반환() {
        DataResponse<List<DictionaryPlantSearchResponse>> search = dictionaryPlantService.search("스투");

        assertThat(search.getData()).isEmpty();
    }
}
