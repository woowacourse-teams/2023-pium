package com.official.pium.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.mockito.BDDMockito.given;

import com.official.pium.IntegrationTest;
import com.official.pium.domain.SessionGroup;
import com.official.pium.exception.AuthenticationException;
import com.official.pium.repository.SessionGroupRepository;
import java.time.Clock;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.UUID;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.SpyBean;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class SessionGroupServiceTest extends IntegrationTest {

    @Autowired
    private SessionGroupService sessionGroupService;

    @Autowired
    private SessionGroupRepository sessionGroupRepository;

    @SpyBean
    private Clock clock;

    @Nested
    class 세션_그룹을_조회할_때 {

        @Test
        void 정상적으로_조회한다() {
            SessionGroup sessionGroup = sessionGroupSupport.builder()
                    .sessionId("1234")
                    .sessionKey("KAKAO")
                    .sessionValue("12441")
                    .build();

            String sessionValue = sessionGroupService.findBySessionIdAndKey(
                    sessionGroup.getSessionId(),
                    sessionGroup.getSessionKey()
            );

            assertThat(sessionValue).isEqualTo(sessionGroup.getSessionValue());
        }

        @Test
        void 존재하지_않는_세션_KEY와_세션_ID로_조회하면_예외_발생() {
            assertThatThrownBy(() -> sessionGroupService.findBySessionIdAndKey(" ", " "))
                    .isInstanceOf(AuthenticationException.class)
                    .hasMessage("일치하는 세션을 찾을 수 없습니다.");
        }

        @Test
        void 만료된_세션이면_세션을_삭제하고_예외를_발생시킨다() {
            String sessionId = "1234";
            String sessionKey = "KAKAO";
            sessionGroupSupport.builder()
                    .sessionId(sessionId)
                    .sessionKey(sessionKey)
                    .sessionValue("21354142")
                    .expireTime(LocalDateTime.of(2022, 10, 16, 0, 0))
                    .build();

            assertSoftly(softly -> {
                softly.assertThatThrownBy(() -> sessionGroupService.findBySessionIdAndKey(sessionId, sessionKey))
                        .isInstanceOf(AuthenticationException.class)
                        .hasMessage("세션이 만료 되었습니다.");
                softly.assertThatThrownBy(() -> sessionGroupService.findBySessionIdAndKey(sessionId, sessionKey))
                        .isInstanceOf(AuthenticationException.class)
                        .hasMessage("일치하는 세션을 찾을 수 없습니다.");
            });
        }

        @Test
        void 세션_만료_기간이_일주일_이내이면_세션을_30일_연장한다() {
            given(clock.instant()).willReturn(Instant.parse("2023-10-15T00:00:00Z"));
            LocalDateTime today = LocalDateTime.now(clock);
            LocalDateTime expireTime = today.plusDays(5);
            String sessionId = "1234";
            String sessionKey = "KAKAO";
            sessionGroupSupport.builder()
                    .sessionId(sessionId)
                    .sessionKey(sessionKey)
                    .sessionValue("21354142")
                    .expireTime(expireTime)
                    .build();

            sessionGroupService.findBySessionIdAndKey(sessionId, sessionKey);
            SessionGroup sessionGroup = sessionGroupRepository.findBySessionIdAndSessionKey(sessionId, sessionKey)
                    .get();

            assertThat(sessionGroup.getExpireTime()).isEqualTo(expireTime.plusDays(30));
        }

        @Test
        void 세션_만료_기간이_일주일_보다_많이_남았으면_세션을_연장하지_않는다() {
            given(clock.instant()).willReturn(Instant.parse("2023-10-15T00:00:00Z"));
            LocalDateTime today = LocalDateTime.now(clock);
            LocalDateTime expireTime = today.plusDays(8);
            String sessionId = "1234";
            String sessionKey = "KAKAO";
            sessionGroupSupport.builder()
                    .sessionId(sessionId)
                    .sessionKey(sessionKey)
                    .sessionValue("21354142")
                    .expireTime(expireTime)
                    .build();

            sessionGroupService.findBySessionIdAndKey(sessionId, sessionKey);
            SessionGroup sessionGroup = sessionGroupRepository.findBySessionIdAndSessionKey(sessionId, sessionKey)
                    .get();

            assertThat(sessionGroup.getExpireTime()).isEqualTo(expireTime);
        }
    }

    @Nested
    class 세션_그룹을_추가할_때 {

        @Test
        void 정상적으로_추가한다() {
            String sessionId = UUID.randomUUID().toString();
            String sessionKey = "KAKAO_ID";
            String sessionValue = "1203214";

            sessionGroupService.add(sessionId, sessionKey, sessionValue);

            assertThat(sessionGroupRepository.findBySessionIdAndSessionKey(sessionId, sessionKey)).isPresent();
        }

        @Test
        void 동일한_세션_그룹이_존재하면_예외가_발생한다() {
            SessionGroup sessionGroup = sessionGroupSupport.builder().build();

            assertThatThrownBy(() -> sessionGroupService.add(
                    sessionGroup.getSessionId(),
                    sessionGroup.getSessionKey(),
                    sessionGroup.getSessionValue()
            ))
                    .isInstanceOf(AuthenticationException.class)
                    .hasMessage("이미 존재하는 세션입니다. sessionId: " + sessionGroup.getSessionId());
        }
    }

    @Nested
    class 세션_그룹을_삭제할_때 {

        @Test
        void 정상적으로_삭제한다() {
            SessionGroup sessionGroup = sessionGroupSupport.builder().build();

            sessionGroupService.delete(sessionGroup.getSessionId(), sessionGroup.getSessionKey());

            assertThat(sessionGroupRepository.findBySessionIdAndSessionKey(
                    sessionGroup.getSessionId(),
                    sessionGroup.getSessionKey()))
                    .isEmpty();
        }

        @Test
        void 존재하지_않는_세션이면_예외가_발생한다() {
            assertThatThrownBy(() -> sessionGroupService.delete(" ", " "))
                    .isInstanceOf(AuthenticationException.class)
                    .hasMessage("일치하는 세션을 찾을 수 없습니다.");
        }
    }
}
