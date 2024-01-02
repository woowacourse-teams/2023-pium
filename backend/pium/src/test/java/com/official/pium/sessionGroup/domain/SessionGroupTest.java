package com.official.pium.sessionGroup.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.official.pium.fixture.SessionGroupFixture;
import java.time.LocalDateTime;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class SessionGroupTest {

    @Test
    void 만료된_세션은_TRUE를_반환한다() {
        SessionGroup sessionGroup = SessionGroupFixture.세션_그룹_만료일_2023_10_16;
        LocalDateTime currentTime = LocalDateTime.of(2023, 10, 17, 0, 0);

        assertThat(sessionGroup.isExpired(currentTime)).isTrue();
    }

    @Test
    void 만료되지_않은_세션은_FALSE를_반환한다() {
        SessionGroup sessionGroup = SessionGroupFixture.세션_그룹_만료일_2023_10_16;
        LocalDateTime currentTime = LocalDateTime.of(2023, 10, 15, 23, 59);

        assertThat(sessionGroup.isExpired(currentTime)).isFalse();
    }

    @Test
    void 세션_만료일_7일_이내이면_세션_연장_가능_여부는_TRUE를_반환한다() {
        SessionGroup sessionGroup = SessionGroupFixture.세션_그룹_만료일_2023_10_16;
        LocalDateTime currentTime = LocalDateTime.of(2023, 10, 9, 0, 1);

        assertThat(sessionGroup.canExtends(currentTime)).isTrue();
    }

    @Test
    void 세션_만료일_7일_이내가_아니면_세션_연장_가능_여부는_FALSE를_반환한다() {
        SessionGroup sessionGroup = SessionGroupFixture.세션_그룹_만료일_2023_10_16;
        LocalDateTime currentTime = LocalDateTime.of(2023, 10, 9, 0, 0);

        assertThat(sessionGroup.canExtends(currentTime)).isFalse();
    }

    @Test
    void 세션_만료_일을_연장한다() {
        int extendDay = 10;
        LocalDateTime currentTime = LocalDateTime.of(2023, 10, 10, 0, 0);
        SessionGroup sessionGroup = SessionGroup.builder().expireTime(currentTime).build();

        sessionGroup.extendExpireTime(extendDay);

        assertThat(sessionGroup.getExpireTime()).isEqualTo(currentTime.plusDays(extendDay));
    }

    @ParameterizedTest
    @ValueSource(ints = {0, -1})
    void 세션_만료_일이_1보다_작으면_예외가_발생한다(int extendDay) {
        LocalDateTime currentTime = LocalDateTime.of(2023, 10, 10, 0, 0);
        SessionGroup sessionGroup = SessionGroup.builder().expireTime(currentTime).build();

        assertThatThrownBy(() -> sessionGroup.extendExpireTime(extendDay))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("세션 연장 가능 일수는 음수가 될 수 없습니다.");
    }
}
