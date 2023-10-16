package com.official.pium.service;

import com.official.pium.domain.SessionGroup;
import com.official.pium.repository.SessionGroupRepository;
import java.time.Clock;
import java.time.LocalDateTime;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SessionGroupService {

    private static final int EXTEND_EXPIRED_DAY = 30;

    private final SessionGroupRepository sessionGroupRepository;
    private final Clock clock;

    public String findBySessionIdAndKey(String sessionId, String key) {
        SessionGroup sessionGroup = sessionGroupRepository.findBySessionIdAndSessionKey(sessionId, key)
                .orElseThrow(() -> new NoSuchElementException("일치하는 세션을 찾을 수 없습니다."));

        LocalDateTime currentTime = LocalDateTime.now(clock);
        validateSession(sessionGroup, currentTime);
        extendsSession(sessionGroup, currentTime);
        return sessionGroup.getSessionValue();
    }

    private void validateSession(SessionGroup sessionGroup, LocalDateTime currentTime) {
        if (sessionGroup.isExpired(currentTime)) {
            sessionGroupRepository.delete(sessionGroup);
            throw new IllegalArgumentException("세션이 만료 되었습니다.");
        }
    }

    private void extendsSession(SessionGroup sessionGroup, LocalDateTime currentTime) {
        if (sessionGroup.canExtends(currentTime)) {
            sessionGroup.extendExpireTime(EXTEND_EXPIRED_DAY);
        }
    }

    @Transactional
    public void add(String sessionId, String key, String value, int expiredTime) {
        sessionGroupRepository.findBySessionIdAndSessionKey(sessionId, key)
                .ifPresent(existsSessionGroup -> {
                    throw new IllegalArgumentException("이미 존재하는 세션입니다. sessionId: " + sessionId);
                });

        SessionGroup sessionGroup = SessionGroup.builder()
                .sessionId(sessionId)
                .sessionKey(key)
                .sessionValue(value)
                .expireTime(LocalDateTime.now().plusMinutes(expiredTime))
                .build();
        sessionGroupRepository.save(sessionGroup);
    }

    @Transactional
    public void delete(String sessionId, String key) {
        SessionGroup sessionGroup = sessionGroupRepository.findBySessionIdAndSessionKey(sessionId, key)
                .orElseThrow(() -> new IllegalArgumentException("일치하는 세션을 찾을 수 없습니다."));

        sessionGroupRepository.delete(sessionGroup);
    }
}
