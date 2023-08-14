package com.official.pium.domain;

import java.time.LocalDate;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class HistoryTest {

    @Test
    void 히스토리_정보_수정시_정보가_NULL이면_예외() {
        LocalDate lastWaterDate = LocalDate.of(2022, 3, 4);
        History history = generateHistory(lastWaterDate);

        SoftAssertions.assertSoftly(softly -> {
            softly.assertThatThrownBy(() -> history.updateHistoryContent(null))
                    .isInstanceOf(IllegalArgumentException.class)
                    .hasMessageContaining("히스토리 상세 정보는 null이 될 수 없습니다.");
            softly.assertThatThrownBy(() -> history.updateHistoryContent(HistoryContent.builder().build()))
                    .isInstanceOf(IllegalArgumentException.class)
                    .hasMessageContaining("히스토리 상세 정보는 null이 될 수 없습니다.");
            softly.assertThatThrownBy(() -> history.updateHistoryContent(HistoryContent.builder().current("value").build()))
                    .isInstanceOf(IllegalArgumentException.class)
                    .hasMessageContaining("히스토리 상세 정보는 null이 될 수 없습니다.");
            softly.assertThatThrownBy(() -> history.updateHistoryContent(HistoryContent.builder().previous("value").build()))
                    .isInstanceOf(IllegalArgumentException.class)
                    .hasMessageContaining("히스토리 상세 정보는 null이 될 수 없습니다.");
        });

    }

    private History generateHistory(LocalDate lastWaterDate) {
        return History.builder()
                .date(lastWaterDate)
                .historyCategory(HistoryCategory.builder()
                        .historyType(HistoryType.LAST_WATER_DATE)
                        .build())
                .historyContent(HistoryContent.builder()
                        .previous(lastWaterDate.minusDays(5).toString())
                        .current(lastWaterDate.toString())
                        .build())
                .petPlant(PetPlant.builder()
                        .nickname("기영이")
                        .imageUrl("https://image.com")
                        .light("자연광이 잘 드는 곳")
                        .location("창가")
                        .wind("바람이 가끔 부는 곳")
                        .flowerpot("플라스틱")
                        .waterCycle(5)
                        .birthDate(LocalDate.of(2021, 7, 1))
                        .lastWaterDate(lastWaterDate)
                        .nextWaterDate(lastWaterDate.plusDays(5))
                        .build())
                .build();
    }
}
