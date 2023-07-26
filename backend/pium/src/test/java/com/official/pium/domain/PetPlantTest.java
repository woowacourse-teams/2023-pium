package com.official.pium.domain;

import com.official.pium.fixture.PetPlantFixture;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class PetPlantTest {

    @ParameterizedTest
    @CsvSource(value = {"2022,7,1,7", "2022,7,3,5", "2022,7,5,3", "2022,7,7,1", "2022,7,8,0"})
    void 물주기_남은_날짜_계산(int year, int month, int day, int nextWaterDay) {
        PetPlant 산세베리아 = PetPlantFixture.산세베리아;

        assertThat(산세베리아.calculateNextWaterDay(LocalDate.of(year, month, day)))
                .isEqualTo(nextWaterDay);
    }

    @Test
    void 물주기_계산시_물주기_날_이후의_날을_입력하면_예외_발생() {
        PetPlant 산세베리아 = PetPlantFixture.산세베리아;

        assertThatThrownBy(() -> 산세베리아.calculateNextWaterDay(LocalDate.of(2022, 7, 10)))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("물주기 남은 날짜는 음수가 될 수 없습니다.");
    }

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
}
