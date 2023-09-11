package com.official.pium.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import com.official.pium.IntegrationTest;
import com.official.pium.domain.DictionaryPlant;
import com.official.pium.domain.History;
import com.official.pium.domain.HistoryType;
import com.official.pium.domain.Member;
import com.official.pium.domain.PetPlant;
import com.official.pium.repository.PetPlantRepository;
import com.official.pium.service.dto.HistoryResponse;
import com.official.pium.service.dto.PetPlantCreateRequest;
import com.official.pium.service.dto.SingleHistoryResponse;
import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class HistoryServiceTest extends IntegrationTest {

    @Autowired
    private HistoryService historyService;

    @Autowired
    private PetPlantService petPlantService;

    @Autowired
    private PetPlantRepository petPlantRepository;

    @BeforeEach
    void setUp() {
        for (HistoryType type : HistoryType.values()) {
            historyCategorySupport.builder()
                    .historyType(type)
                    .build();
        }
    }

    @Test
    void 반려_식물_단건_히스토리_조회() {
        LocalDate baseDate = LocalDate.of(2022, 7, 1);
        PetPlant petPlant = petPlantSupport.builder().build();
        History history1 = createHistory(petPlant, baseDate);
        History history2 = createHistory(petPlant, baseDate.plusDays(1));
        History history3 = createHistory(petPlant, baseDate.plusDays(2));
        History history4 = createHistory(petPlant, baseDate.plusDays(3));
        HistoryResponse historyResponse1 = historyService.read(petPlant.getId(),
                PageRequest.of(0, 2), petPlant.getMember(), List.of("lastWaterDate", "flowerpot"));
        HistoryResponse historyResponse2 = historyService.read(petPlant.getId(),
                PageRequest.of(1, 2), petPlant.getMember(), List.of());

        assertSoftly(
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
                () -> historyService.read(2L, PageRequest.of(0, 2),
                        petPlant.getMember(), List.of())
        ).isInstanceOf(NoSuchElementException.class)
                .hasMessage("일치하는 반려 식물이 존재하지 않습니다. id :" + 2L);
    }

    @Test
    void 반려식물의_소유자와_파라미터의_멤버가_같지_않으면_예외발생() {
        PetPlant petPlant = petPlantSupport.builder().build();
        Member member = memberSupport.builder().build();

        assertThatThrownBy(
                () -> historyService.read(petPlant.getId(), PageRequest.of(0, 2),
                        member, List.of())
        ).isInstanceOf(IllegalArgumentException.class)
                .hasMessage("요청 사용자와 반려 식물의 사용자가 일치하지 않습니다. id :" + member.getId());
    }

    @Test
    void 조회하는_페이지가_마지막_페이지면_hasNext_값이_false() {
        PetPlant petPlant = petPlantSupport.builder().build();
        historySupport.builder().petPlant(petPlant).build();
        historySupport.builder().petPlant(petPlant).build();

        HistoryResponse historyResponse = historyService.read(petPlant.getId(),
                PageRequest.of(0, 2), petPlant.getMember(), List.of());

        assertThat(historyResponse.isHasNext()).isFalse();
    }

    @Test
    void 필터링한_값에_해당하는_히스토리만_조회() {
        DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
        Member member = memberSupport.builder().build();
        petPlantService.create(PetPlantCreateRequest.builder()
                        .dictionaryPlantId(dictionaryPlant.getId())
                        .nickname("test")
                        .location("test")
                        .flowerpot("test")
                        .waterCycle(3)
                        .light("test")
                        .wind("test")
                        .birthDate(LocalDate.now())
                        .lastWaterDate(LocalDate.now())
                        .build(),
                null,
                member
        );

        PetPlant petPlant = petPlantRepository.findAllByMemberId(member.getId()).get(0);
        HistoryResponse historyResponse = historyService.read(petPlant.getId(),
                PageRequest.of(0, 5),
                petPlant.getMember(),
                List.of("lastWaterDate", "wind", "flowerpot")
        );

        assertSoftly(
                softly -> {
                    softly.assertThat(historyResponse.getPage()).isEqualTo(0);
                    softly.assertThat(historyResponse.getSize()).isEqualTo(5);
                    softly.assertThat(historyResponse.getElementSize()).isEqualTo(3L);
                    softly.assertThat(historyResponse.isHasNext()).isFalse();
                    softly.assertThat(historyResponse.getData()
                                    .stream()
                                    .map(SingleHistoryResponse::getType)
                                    .toList()).contains("lastWaterDate", "wind", "flowerpot")
                            .doesNotContain("waterCycle", "light", "location");
                }
        );
    }

    private History createHistory(PetPlant petPlant, LocalDate date) {
        return historySupport.builder()
                .petPlant(petPlant)
                .date(date)
                .build();
    }
}
