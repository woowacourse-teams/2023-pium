package com.official.pium.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.official.pium.fixture.PetPlantFixture;
import java.time.LocalDate;
import java.util.List;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class PetPlantTest {

    @ParameterizedTest
    @CsvSource(value = {"2022,7,1,1", "2022,7,7,7", "2022,8,1,32"})
    void 반려_식물과_함께한_일수_계산(int year, int month, int day, int daySince) {
        PetPlant 산세베리아 = PetPlantFixture.산세베리아;

        assertThat(산세베리아.calculateDaySince(LocalDate.of(year, month, day)))
                .isEqualTo(daySince);
    }

    @Test
    void 함께한_날_계산시_생일_이전의_날을_입력하면_예외가_발생() {
        PetPlant 산세베리아 = PetPlantFixture.산세베리아;

        assertThatThrownBy(() -> 산세베리아.calculateDaySince(LocalDate.of(1999, 7, 10)))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("함께한 날은 음수가 될 수 없습니다.");
    }

    @ParameterizedTest
    @CsvSource(value = {"2022,7,1,-7", "2022,7,8,0", "2022,7,11,3"})
    void dDay를_계산(int year, int month, int day, int dDay) {
        PetPlant 산세베리아 = PetPlantFixture.산세베리아;

        Long result = 산세베리아.calculateDDay(LocalDate.of(year, month, day));

        assertThat(result).isEqualTo(dDay);
    }

    @Test
    void 지각_미루기() {
        PetPlant 산세베리아 = PetPlantFixture.산세베리아;
        LocalDate newWaterDate = LocalDate.now().plusDays(1);

        산세베리아.delay(newWaterDate);

        assertThat(산세베리아.getNextWaterDate())
                .isEqualTo(newWaterDate)
                .isNotEqualTo(산세베리아.getNextWaterDate().plusDays(1));
    }

    @Test
    void 오늘_할일_미루기() {
        PetPlant 테이블야자 = PetPlant.builder()
                .nickname("포비")
                .imageUrl("https://image.com")
                .light("자연광이 잘 드는 곳")
                .location("테라스")
                .wind("바람이 조금 부는 곳")
                .flowerpot("플라스틱")
                .waterCycle(7)
                .birthDate(LocalDate.of(2022, 7, 1))
                .lastWaterDate(LocalDate.of(2022, 7, 1))
                .nextWaterDate(LocalDate.now())
                .build();

        LocalDate newWaterDate = LocalDate.now().plusDays(1);

        테이블야자.delay(newWaterDate);

        assertThat(테이블야자.getNextWaterDate())
                .isEqualTo(newWaterDate)
                .isNotEqualTo(테이블야자.getNextWaterDate().plusDays(1));
    }

    @Test
    void 미래_할일_미루기() {
        PetPlant 라벤더 = PetPlant.builder()
                .nickname("피우미")
                .imageUrl("https://image.com")
                .light("자연광이 잘 드는 곳")
                .location("거실")
                .wind("바람이 많이 불지 않는 곳")
                .flowerpot("유리")
                .waterCycle(7)
                .birthDate(LocalDate.of(2022, 7, 1))
                .lastWaterDate(LocalDate.of(2022, 7, 1))
                .nextWaterDate(LocalDate.now().plusDays(6))
                .build();

        LocalDate newWaterDate = 라벤더.getNextWaterDate().plusDays(1);

        라벤더.delay(newWaterDate);

        assertThat(라벤더.getNextWaterDate())
                .isEqualTo(newWaterDate)
                .isNotEqualTo(LocalDate.now().plusDays(1));
    }

    @Test
    void 미루는_날짜가_오늘보다_이전이면_예외_발생() {
        PetPlant 산세베리아 = PetPlantFixture.산세베리아;

        assertThatThrownBy(
                () -> 산세베리아.delay(LocalDate.now().minusDays(1)))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("오늘보다 이전 날짜로 미룰 수는 없습니다.");
    }

    @Test
    void 물주기() {
        PetPlant 산세베리아 = PetPlantFixture.산세베리아;
        LocalDate newWaterDate = LocalDate.of(2022, 7, 7);
        LocalDate newNextWaterDate = newWaterDate.plusDays(산세베리아.getWaterCycle());

        산세베리아.water(newWaterDate);

        assertThat(산세베리아)
                .extracting("nextWaterDate", "lastWaterDate")
                .isEqualTo(List.of(newNextWaterDate, newWaterDate));
    }

    @Test
    void 오늘_날짜_이후에_물주기를_시도하면_예외_발생() {
        PetPlant 산세베리아 = PetPlantFixture.산세베리아;

        assertThatThrownBy(() -> 산세베리아.water(LocalDate.now().plusDays(1)))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("오늘 이후 날짜에 물을 줄 수는 없습니다.");
    }

    @ParameterizedTest
    @CsvSource(value = {"2022,6,20", "2022,6,25"})
    void 마지막_물_준_날짜보다_이전에_물주기를_시도하면_예외_발생(int year, int month, int day) {
        PetPlant 산세베리아 = PetPlantFixture.산세베리아;

        assertThatThrownBy(() -> 산세베리아.water(LocalDate.of(year, month, day)))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("마지막으로 물을 준 날짜보다 이전 날짜에 물을 줄 수는 없습니다.");
    }
}
