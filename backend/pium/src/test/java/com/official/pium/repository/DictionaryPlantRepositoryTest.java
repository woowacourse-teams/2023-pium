package com.official.pium.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.official.pium.RepositoryTest;
import com.official.pium.domain.DictionaryPlant;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class DictionaryPlantRepositoryTest extends RepositoryTest {

    @Autowired
    private DictionaryPlantRepository dictionaryPlantRepository;

    @Test
    void 사전_식물_조회() {
        DictionaryPlant dictionaryPlant = DictionaryPlant.builder().build();
        DictionaryPlant save = dictionaryPlantRepository.save(dictionaryPlant);

        assertThat(dictionaryPlantRepository.findById(save.getId())).isPresent();
    }
}
