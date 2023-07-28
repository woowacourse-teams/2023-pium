package com.official.pium.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.official.pium.fixture.PetPlantFixture;
import java.time.LocalDate;
import java.util.List;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.junit.jupiter.params.provider.ValueSource;

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

    @Nested
    class 반려_식물_정보_수정 {

        @Test
        void 성공() {
            PetPlant petPlant = PetPlantFixture.산세베리아;

            petPlant.updatePetPlant("기철이", "책상", "수경 재배", "거의 없음",
                    "통풍이 잘 됨", 10, LocalDate.of(2022, 7, 1), LocalDate.of(2022, 7, 8));

            assertAll(
                    () -> assertThat(petPlant.getNickname()).isEqualTo("기철이"),
                    () -> assertThat(petPlant.getLocation()).isEqualTo("책상"),
                    () -> assertThat(petPlant.getFlowerpot()).isEqualTo("수경 재배"),
                    () -> assertThat(petPlant.getLight()).isEqualTo("거의 없음"),
                    () -> assertThat(petPlant.getWind()).isEqualTo("통풍이 잘 됨"),
                    () -> assertThat(petPlant.getWaterCycle()).isEqualTo(10)
            );
        }

        @ParameterizedTest
        @NullAndEmptySource
        void 닉네임이_없으면_예외_발생(String nickname) {
            PetPlant petPlant = PetPlantFixture.산세베리아;

            assertThatThrownBy(() -> petPlant.updatePetPlant(nickname, "책상", "수경 재배", "거의 없음",
                    "통풍이 잘 됨", 10, LocalDate.of(2022, 7, 1), LocalDate.of(2022, 7, 8)))
                    .isInstanceOf(IllegalArgumentException.class)
                    .hasMessageContaining("반려 식물 속성에는 빈 값 들어올 수 없습니다. value: " + nickname);
        }

        @ParameterizedTest
        @NullAndEmptySource
        void 위치_정보가_없으면_예외_발생(String location) {
            PetPlant petPlant = PetPlantFixture.산세베리아;

            assertThatThrownBy(() -> petPlant.updatePetPlant("기철이", location, "수경 재배", "거의 없음",
                    "통풍이 잘 됨", 10, LocalDate.of(2022, 7, 1), LocalDate.of(2022, 7, 8)))
                    .isInstanceOf(IllegalArgumentException.class)
                    .hasMessageContaining("반려 식물 속성에는 빈 값 들어올 수 없습니다. value: " + location);
        }

        @ParameterizedTest
        @NullAndEmptySource
        void 화분_정보가_없으면_예외_발생(String flowerpot) {
            PetPlant petPlant = PetPlantFixture.산세베리아;

            assertThatThrownBy(() -> petPlant.updatePetPlant("기철이", "책상", flowerpot, "거의 없음",
                    "통풍이 잘 됨", 10, LocalDate.of(2022, 7, 1), LocalDate.of(2022, 7, 8)))
                    .isInstanceOf(IllegalArgumentException.class)
                    .hasMessageContaining("반려 식물 속성에는 빈 값 들어올 수 없습니다. value: " + flowerpot);
        }

        @ParameterizedTest
        @NullAndEmptySource
        void 조도_정보가_없으면_예외_발생(String light) {
            PetPlant petPlant = PetPlantFixture.산세베리아;

            assertThatThrownBy(() -> petPlant.updatePetPlant("기철이", "책상", "수경 재배", light,
                    "통풍이 잘 됨", 10, LocalDate.of(2022, 7, 1), LocalDate.of(2022, 7, 8)))
                    .isInstanceOf(IllegalArgumentException.class)
                    .hasMessageContaining("반려 식물 속성에는 빈 값 들어올 수 없습니다. value: " + light);
        }

        @ParameterizedTest
        @NullAndEmptySource
        void 바람_정보가_없으면_예외_발생(String wind) {
            PetPlant petPlant = PetPlantFixture.산세베리아;

            assertThatThrownBy(() -> petPlant.updatePetPlant("기철이", "책상", "수경 재배", "거의 없음",
                    wind, 10, LocalDate.of(2022, 7, 1), LocalDate.of(2022, 7, 8)))
                    .isInstanceOf(IllegalArgumentException.class)
                    .hasMessageContaining("반려 식물 속성에는 빈 값 들어올 수 없습니다. value: " + wind);
        }

        @ParameterizedTest
        @ValueSource(ints = {-1, 0, 366})
        void 물주기_주기_범위가_잘못되면_예외_발생(int waterCycle) {
            PetPlant petPlant = PetPlantFixture.산세베리아;

            assertThatThrownBy(() -> petPlant.updatePetPlant("기철이", "책상", "수경 재배", "거의 없음",
                    "바람 선선", waterCycle, LocalDate.of(2022, 7, 1), LocalDate.of(2022, 7, 8)))
                    .isInstanceOf(IllegalArgumentException.class)
                    .hasMessageContaining("물주기 주기는 1이상 365이하의 값만 가능합니다. waterCycle: " + waterCycle);
        }

        @Test
        void 입양일_정보가_없으면_예외_발생() {
            PetPlant petPlant = PetPlantFixture.산세베리아;

            assertThatThrownBy(() -> petPlant.updatePetPlant("기철이", "책상", "수경 재배", "거의 없음",
                    "바람이 선선한 곳", 10, null, LocalDate.of(2022, 7, 8)))
                    .isInstanceOf(IllegalArgumentException.class)
                    .hasMessageContaining("반려 식물 날짜 속성은 빈 값이 될 수 없습니다. date: null");
        }

        @Test
        void 마지막_물주기_날짜_정보가_없으면_예외_발생() {
            PetPlant petPlant = PetPlantFixture.산세베리아;

            assertThatThrownBy(() -> petPlant.updatePetPlant("기철이", "책상", "수경 재배", "거의 없음",
                    "바람이 선선한 곳", 10, LocalDate.of(2022, 7, 8), null))
                    .isInstanceOf(IllegalArgumentException.class)
                    .hasMessageContaining("반려 식물 날짜 속성은 빈 값이 될 수 없습니다. date: null");
        }
    }

    @ParameterizedTest
    @ValueSource(ints = {1, 2, 3, 4, 5})
    void N일_지각_미루기(int days) {
        PetPlant 산세베리아 = PetPlant.builder()
                .nickname("크론")
                .imageUrl("https://image2.com")
                .light("자연광이 잘 드는 곳")
                .location("거실")
                .wind("바람 솔솔")
                .flowerpot("정보 없음")
                .waterCycle(7)
                .birthDate(LocalDate.of(2022, 7, 1))
                .lastWaterDate(LocalDate.of(2022, 7, 1))
                .nextWaterDate(LocalDate.now().minusDays(days))
                .build();

        LocalDate newWaterDate = LocalDate.now().plusDays(1);

        산세베리아.changeNextWaterDate(newWaterDate);

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

        테이블야자.changeNextWaterDate(newWaterDate);

        assertThat(테이블야자.getNextWaterDate())
                .isEqualTo(newWaterDate)
                .isNotEqualTo(테이블야자.getNextWaterDate().plusDays(1));
    }

    @ParameterizedTest
    @ValueSource(ints = {1, 2, 3, 4, 5})
    void N일_뒤의_할일_미루기(int days) {
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
                .nextWaterDate(LocalDate.now().plusDays(days))
                .build();

        LocalDate newWaterDate = 라벤더.getNextWaterDate().plusDays(1);

        라벤더.changeNextWaterDate(newWaterDate);

        assertThat(라벤더.getNextWaterDate())
                .isEqualTo(newWaterDate)
                .isNotEqualTo(LocalDate.now().plusDays(1));
    }

    @Test
    void 미루는_날짜가_오늘보다_이전이면_예외_발생() {
        PetPlant 산세베리아 = PetPlantFixture.산세베리아;

        assertThatThrownBy(
                () -> 산세베리아.changeNextWaterDate(LocalDate.now().minusDays(1)))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("오늘보다 이전 날짜로 물주기 날짜를 변경할 수는 없습니다.");
    }

    @Test
    void 물주기() {
        PetPlant 산세베리아 = PetPlantFixture.산세베리아;
        LocalDate newWaterDate = LocalDate.of(2022, 7, 7);
        LocalDate newNextWaterDate = newWaterDate.plusDays(산세베리아.getWaterCycle());

        산세베리아.water(newWaterDate);

        assertThat(산세베리아)
                .extracting(PetPlant::getNextWaterDate, PetPlant::getLastWaterDate)
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
