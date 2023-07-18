package com.official.pium.service;

import com.official.pium.IntegrationTest;
import com.official.pium.domain.DictionaryPlant;
import com.official.pium.service.dto.DataResponse;
import com.official.pium.service.dto.DictionaryPlantSearchResponse;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
public class DictionaryPlantServiceTest extends IntegrationTest {

    @Autowired
    DictionaryPlantService dictionaryPlantService;

    @Test
    void 사전식물_검색시_검색명이_포함된_사전식물을_반환한다() {
        DictionaryPlant 스투키1 = dictionaryPlantSupport.builder().build();
        DictionaryPlant 스투키2 = dictionaryPlantSupport.builder().build();

        DataResponse<List<DictionaryPlantSearchResponse>> searchResultsContainsParamName = dictionaryPlantService.search("스투");

        assertAll(
                () -> assertThat(searchResultsContainsParamName.getData()).hasSize(2),
                () -> assertThat(searchResultsContainsParamName.getData().get(0).getId()).isEqualTo(스투키1.getId()),
                () -> assertThat(searchResultsContainsParamName.getData().get(1).getId()).isEqualTo(스투키2.getId())
        );
    }

    @Test
    void 사전식물_검색시_검색명이_포함된_사전식물이_없으면_빈_리스트를_반환한다() {
        DataResponse<List<DictionaryPlantSearchResponse>> search = dictionaryPlantService.search("스투");

        assertThat(search.getData()).isEmpty();
    }
}
