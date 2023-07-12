package com.official.pium.repository;

import com.official.pium.domain.DictionaryPlant;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@DataJpaTest
class DictionaryPlantRepositoryTest {

    @Autowired
    private DictionaryPlantRepository dictionaryPlantRepository;

    @Test
    void 사전_식물_조회() {
        DictionaryPlant dictionaryPlant = DictionaryPlant.builder().build();
        DictionaryPlant save = dictionaryPlantRepository.save(dictionaryPlant);

        assertThat(dictionaryPlantRepository.findById(save.getId())).isPresent();
    }
}
