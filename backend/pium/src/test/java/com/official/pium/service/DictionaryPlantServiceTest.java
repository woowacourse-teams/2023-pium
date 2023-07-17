package com.official.pium.service;


import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;

import com.official.pium.IntegrationTest;
import com.official.pium.domain.DictionaryPlant;
import com.official.pium.mapper.DictionaryPlantMapper;
import com.official.pium.service.dto.DictionaryPlantResponse;
import java.util.NoSuchElementException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class DictionaryPlantServiceTest extends IntegrationTest {

    private DictionaryPlant dictionaryPlant;

    @Autowired
    private DictionaryPlantService dictionaryPlantService;

    @BeforeEach
    void setUp() {
        dictionaryPlant = dictionaryPlantSupport.builder().build();
    }

    @Test
    void 사전_식물_상세_정보를_조회한다() {
        DictionaryPlantResponse actual = dictionaryPlantService.read(dictionaryPlant.getId());

        DictionaryPlantResponse expected = DictionaryPlantMapper.toDictionaryPlantResponse(dictionaryPlant);

        assertThat(actual)
                .usingRecursiveComparison()
                .isEqualTo(expected);
    }

    @Test
    void 사전_식물_상세_정보_조회에_실패하면_예외가_발생한다() {
        Long id = 0L;

        assertThatThrownBy(() -> dictionaryPlantService.read(id))
                .isInstanceOf(NoSuchElementException.class)
                .hasMessage("사전 식물이 존재하지 않습니다. id : " + id);
    }
}
