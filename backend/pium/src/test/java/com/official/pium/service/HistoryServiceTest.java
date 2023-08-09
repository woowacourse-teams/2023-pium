package com.official.pium.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.official.pium.IntegrationTest;
import com.official.pium.domain.History;
import com.official.pium.domain.Member;
import com.official.pium.domain.PetPlant;
import com.official.pium.service.dto.HistoryResponse;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.time.LocalDate;
import java.util.NoSuchElementException;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class HistoryServiceTest extends IntegrationTest {

    @Autowired
    private HistoryService historyService;

    @Test
    void 반려_식물_단건_히스토리_조회() {
        LocalDate baseDate = LocalDate.of(2022, 7, 1);
        PetPlant petPlant = petPlantSupport.builder().build();
        History history1 = createHistory(petPlant, baseDate);
        History history2 = createHistory(petPlant, baseDate.plusDays(1));
        History history3 = createHistory(petPlant, baseDate.plusDays(2));
        History history4 = createHistory(petPlant, baseDate.plusDays(3));
        HistoryResponse historyResponse1 = historyService.read(petPlant.getId(),
                PageRequest.of(0, 2, Sort.Direction.DESC, "date"), petPlant.getMember());
        HistoryResponse historyResponse2 = historyService.read(petPlant.getId(),
                PageRequest.of(1, 2, Sort.Direction.DESC, "date"), petPlant.getMember());

        SoftAssertions.assertSoftly(
                softly -> {
                    softly.assertThat(historyResponse1.getData().get(0).getDate()).isEqualTo(history4.getDate());
                    softly.assertThat(historyResponse1.getData().get(1).getDate()).isEqualTo(history3.getDate());
                    softly.assertThat(historyResponse1.getPage()).isEqualTo(0);
                    softly.assertThat(historyResponse1.getSize()).isEqualTo(2);
                    softly.assertThat(historyResponse1.getElementSize()).isEqualTo(4L);
                    softly.assertThat(historyResponse1.isHasNext()).isTrue();
                    softly.assertThat(historyResponse2.getData().get(0).getDate()).isEqualTo(history2.getDate());
                    softly.assertThat(historyResponse2.getData().get(1).getDate()).isEqualTo(history1.getDate());
                    softly.assertThat(historyResponse2.getPage()).isEqualTo(1);
                    softly.assertThat(historyResponse2.getSize()).isEqualTo(2);
                    softly.assertThat(historyResponse2.getElementSize()).isEqualTo(4L);
                    softly.assertThat(historyResponse2.isHasNext()).isFalse();
                }
        );
    }

    @Test
    void 반려식물_id에_해당하는_반려식물이_없으면_예외발생() {
        PetPlant petPlant = petPlantSupport.builder().build();

        assertThatThrownBy(
                () -> historyService.read(2L, PageRequest.of(0, 2, Sort.Direction.DESC, "waterDate"),
                        petPlant.getMember())
        ).isInstanceOf(NoSuchElementException.class)
                .hasMessage("일치하는 반려 식물이 존재하지 않습니다. id :" + 2L);
    }

    @Test
    void 반려식물의_소유자와_파라미터의_멤버가_같지_않으면_예외발생() {
        PetPlant petPlant = petPlantSupport.builder().build();
        Member member = memberSupport.builder().build();

        assertThatThrownBy(
                () -> historyService.read(petPlant.getId(), PageRequest.of(0, 2, Sort.Direction.DESC, "waterDate"),
                        member)
        ).isInstanceOf(IllegalArgumentException.class)
                .hasMessage("요청 사용자와 반려 식물의 사용자가 일치하지 않습니다. id :" + member.getId());
    }

    @Test
    void 조회하는_페이지가_마지막_페이지면_hasNext_값이_false() {
        PetPlant petPlant = petPlantSupport.builder().build();
        historySupport.builder().petPlant(petPlant).build();
        historySupport.builder().petPlant(petPlant).build();

        HistoryResponse historyResponse = historyService.read(petPlant.getId(),
                PageRequest.of(0, 2, Sort.Direction.DESC, "date"), petPlant.getMember());

        assertThat(historyResponse.isHasNext()).isFalse();
    }

    private History createHistory(PetPlant petPlant, LocalDate date) {
        return historySupport.builder()
                .petPlant(petPlant)
                .date(date)
                .build();
    }
}
