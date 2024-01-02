package com.official.pium.repository;

import com.official.pium.RepositoryTest;
import com.official.pium.sessionGroup.domain.SessionGroup;
import com.official.pium.sessionGroup.repository.SessionGroupRepository;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class SessionGroupRepositoryTest extends RepositoryTest {

    @Autowired
    private SessionGroupRepository sessionGroupRepository;

    @Test
    void 세션ID와_KEY값을_가진_객체_생성() {
        SessionGroup sessionGroup = SessionGroup.builder()
                .sessionId(UUID.randomUUID().toString())
                .sessionKey("KAKAO_ID")
                .sessionValue("1234546426")
                .expireTime(LocalDateTime.now().plusMinutes(30))
                .build();

        SessionGroup savedSessionGroup = sessionGroupRepository.save(sessionGroup);

        assertThat(savedSessionGroup.getId()).isPositive();
    }

    @Test
    void 세션_그룹_객체_조회() {
        SessionGroup sessionGroup = SessionGroup.builder()
                .sessionId(UUID.randomUUID().toString())
                .sessionKey("KAKAO_ID")
                .sessionValue("1234546426")
                .expireTime(LocalDateTime.now().plusMinutes(30))
                .build();
        SessionGroup savedSessionGroup = sessionGroupRepository.save(sessionGroup);

        assertThat(sessionGroupRepository.findById(savedSessionGroup.getId())).isPresent();
    }

    @Test
    void 존재하는_세션_ID와_세션_KEY를_이용해_객체_조회() {
        SessionGroup sessionGroup = SessionGroup.builder()
                .sessionId(UUID.randomUUID().toString())
                .sessionKey("KAKAO_ID")
                .sessionValue("1234546426")
                .expireTime(LocalDateTime.now().plusMinutes(30))
                .build();
        SessionGroup savedSessionGroup = sessionGroupRepository.save(sessionGroup);

        assertThat(sessionGroupRepository.findBySessionIdAndSessionKey(
                savedSessionGroup.getSessionId(),
                savedSessionGroup.getSessionKey()
        )).isPresent();
    }

    @Test
    void 존재하지_않는_세션_ID와_세션_KEY를_이용해_객체_조회() {
        assertThat(sessionGroupRepository.findBySessionIdAndSessionKey("", "")).isEmpty();
    }

    @Test
    void 세션_그룹_객체_삭제() {
        SessionGroup sessionGroup = SessionGroup.builder()
                .sessionId(UUID.randomUUID().toString())
                .sessionKey("KAKAO_ID")
                .sessionValue("1234546426")
                .expireTime(LocalDateTime.now().plusMinutes(30))
                .build();
        SessionGroup savedSessionGroup = sessionGroupRepository.save(sessionGroup);

        sessionGroupRepository.delete(savedSessionGroup);

        assertThat(sessionGroupRepository.findById(savedSessionGroup.getId())).isEmpty();
    }

    @Test
    void 기존_세션이_존재하면_True() {
        SessionGroup sessionGroup = SessionGroup.builder()
                .sessionId("UUID.randomUUID().toString()")
                .sessionKey("KAKAO_ID")
                .sessionValue("1234546426")
                .expireTime(LocalDateTime.now().plusDays(30))
                .build();
        SessionGroup savedSessionGroup = sessionGroupRepository.save(sessionGroup);

        boolean existsBySessionIdAndSessionValue = sessionGroupRepository.existsBySessionIdAndSessionValue(
                savedSessionGroup.getSessionId(),
                savedSessionGroup.getSessionValue()
        );

        assertThat(existsBySessionIdAndSessionValue).isTrue();
    }

    @Test
    void 기존_세션이_존재하지않으면_False() {
        boolean existsBySessionIdAndSessionKey = sessionGroupRepository.existsBySessionIdAndSessionValue(
                "id", "sessionValue"
        );

        assertThat(existsBySessionIdAndSessionKey).isFalse();
    }
}
