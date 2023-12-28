package com.official.pium.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.official.pium.domain.vo.PetPlantState;
import com.official.pium.domain.vo.WaterDate;
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
            softly.assertThatThrownBy(
                            () -> history.updateHistoryContent(HistoryContent.builder().current("value").build()))
                    .isInstanceOf(IllegalArgumentException.class)
                    .hasMessageContaining("히스토리 상세 정보는 null이 될 수 없습니다.");
            softly.assertThatThrownBy(
                            () -> history.updateHistoryContent(HistoryContent.builder().previous("value").build()))
                    .isInstanceOf(IllegalArgumentException.class)
                    .hasMessageContaining("히스토리 상세 정보는 null이 될 수 없습니다.");
        });
    }

    @Test
    void 히스토리_날짜_업데이트() {
        History history = generateHistory(LocalDate.of(2022, 3, 5));
        LocalDate newDate = LocalDate.of(2022, 6, 14);

        history.updateDate(newDate);

        assertThat(history.getDate()).isEqualTo(newDate);
    }

    @Test
    void 히스토리_날짜는_오늘_이후_이면_예외_발생() {
        History history = generateHistory(LocalDate.of(2022, 3, 5));
        LocalDate newDate = LocalDate.now().plusDays(1);

        assertThatThrownBy(() -> history.updateDate(newDate))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("히스토리 날짜는 오늘 이후일 수 없습니다. newDate: " + newDate);
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
                        .petPlantState(
                                PetPlantState.builder()
                                        .light("자연광이 잘 드는 곳")
                                        .location("창가")
                                        .wind("바람이 가끔 부는 곳")
                                        .flowerpot("플라스틱")
                                        .build()
                        )
                        .waterCycle(5)
                        .birthDate(LocalDate.of(2021, 7, 1))
                        .waterDate(
                                WaterDate.builder()
                                        .lastWaterDate(lastWaterDate)
                                        .nextWaterDate(lastWaterDate.plusDays(5))
                                        .build()
                        )
                        .build())
                .build();
    }
}
