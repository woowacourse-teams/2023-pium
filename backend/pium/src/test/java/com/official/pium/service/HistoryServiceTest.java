package com.official.pium.service;

import com.official.pium.IntegrationTest;
import com.official.pium.domain.History;
import com.official.pium.domain.PetPlant;
import com.official.pium.repository.HistoryRepository;
import com.official.pium.service.dto.HistoryResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

public class HistoryServiceTest extends IntegrationTest {

    PetPlant petPlant;
    History history1;
    History history2;
    History history3;
    History history4;

    @Autowired
    private HistoryService historyService;

    @Autowired
    private HistoryRepository historyRepository;

    @BeforeEach
    void setUp() {
        petPlant = petPlantSupport.builder().build();
        history1 = historySupport.builder().petPlant(petPlant).build();
        history2 = historySupport.builder().petPlant(petPlant).build();
        history3 = historySupport.builder().petPlant(petPlant).build();
        history4 = historySupport.builder().petPlant(petPlant).build();
    }

    @Test
    void 반려_식물_단건_히스토리_조회() {
        historyRepository.save(history1);
        historyRepository.save(history2);
        historyRepository.save(history3);
        historyRepository.save(history4);

        Pageable pageable1 = PageRequest.of(0, 2);
        Pageable pageable2 = PageRequest.of(1, 2);
        HistoryResponse historyResponse1 = historyService.read(petPlant.getId(), pageable1);
        HistoryResponse historyResponse2 = historyService.read(petPlant.getId(), pageable2);

        assertAll(
                () -> assertThat(historyResponse1.getPage()).isEqualTo(1),
                () -> assertThat(historyResponse1.getSize()).isEqualTo(2),
                () -> assertThat(historyResponse1.getElementSize()).isEqualTo(4L),
                () -> assertThat(historyResponse1.isHasNext()).isTrue(),
                () -> assertThat(historyResponse2.getPage()).isEqualTo(2),
                () -> assertThat(historyResponse2.getSize()).isEqualTo(2),
                () -> assertThat(historyResponse2.getElementSize()).isEqualTo(4L),
                () -> assertThat(historyResponse2.isHasNext()).isFalse()
        );

    }
}
