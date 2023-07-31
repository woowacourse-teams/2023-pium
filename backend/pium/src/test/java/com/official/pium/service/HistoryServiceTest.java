package com.official.pium.service;

import com.official.pium.IntegrationTest;
import com.official.pium.domain.PetPlant;
import com.official.pium.mapper.HistoryMapper;
import com.official.pium.service.dto.HistoryPageRequest;
import com.official.pium.service.dto.HistoryResponse;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.NoSuchElementException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

public class HistoryServiceTest extends IntegrationTest {

    @Autowired
    private HistoryService historyService;

    @Test
    void 반려_식물_단건_히스토리_조회() {
        PetPlant petPlant = petPlantSupport.builder().build();
        historySupport.builder().petPlant(petPlant).build();
        historySupport.builder().petPlant(petPlant).build();
        historySupport.builder().petPlant(petPlant).build();
        historySupport.builder().petPlant(petPlant).build();

        Pageable pageable1 = PageRequest.of(0, 2);
        Pageable pageable2 = PageRequest.of(1, 2);
        HistoryResponse historyResponse1 = historyService.read(petPlant.getId(), pageable1, petPlant.getMember());
        HistoryResponse historyResponse2 = historyService.read(petPlant.getId(), pageable2, petPlant.getMember());

        SoftAssertions.assertSoftly(
                softly -> {
                    softly.assertThat(historyResponse1.getPage()).isEqualTo(1);
                    softly.assertThat(historyResponse1.getSize()).isEqualTo(2);
                    softly.assertThat(historyResponse1.getElementSize()).isEqualTo(4L);
                    softly.assertThat(historyResponse1.isHasNext()).isTrue();
                    softly.assertThat(historyResponse2.getPage()).isEqualTo(2);
                    softly.assertThat(historyResponse2.getSize()).isEqualTo(2);
                    softly.assertThat(historyResponse2.getElementSize()).isEqualTo(4L);
                    softly.assertThat(historyResponse2.isHasNext()).isFalse();
                }
        );
    }

    @Test
    void 반려식물_id에_해당하는_반려식물이_없으면_예외발생() {
        PetPlant petPlant = petPlantSupport.builder().build();
        Pageable pageable = PageRequest.of(0, 2);

        assertThatThrownBy(
                () -> historyService.read(2L, historyPageRequest, petPlant.getMember())
        ).isInstanceOf(NoSuchElementException.class)
                .hasMessage("id에 해당하는 반려식물이 없습니다");
    }

    @Test
    void 반려식물의_소유자와_파라미터의_멤버가_같지_않으면_예외발생() {
        PetPlant petPlant = petPlantSupport.builder().build();
        Pageable pageable = PageRequest.of(0, 2);

        assertThatThrownBy(
                () -> historyService.read(petPlant.getId(), historyPageRequest, memberSupport.builder().build())
        ).isInstanceOf(IllegalArgumentException.class)
                .hasMessage("다른 사용자의 반려식물을 조회할 수 없습니다");

    }

    @Test
    void 조회하는_페이지가_마지막_페이지면_hasNext_값이_false() {
        PetPlant petPlant = petPlantSupport.builder().build();
        historySupport.builder().petPlant(petPlant).build();
        historySupport.builder().petPlant(petPlant).build();

        Pageable pageable = PageRequest.of(1, 1);

        HistoryResponse historyResponse = historyService.read(petPlant.getId(), pageable, petPlant.getMember());

        assertThat(historyResponse.isHasNext()).isFalse();
    }
}
