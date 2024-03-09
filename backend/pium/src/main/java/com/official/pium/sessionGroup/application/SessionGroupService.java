package com.official.pium.sessionGroup.application;

import com.official.pium.common.exception.AuthenticationException;
import com.official.pium.sessionGroup.domain.SessionGroup;
import com.official.pium.sessionGroup.repository.SessionGroupRepository;
import java.time.Clock;
import java.time.LocalDateTime;
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

    @Transactional
    public String findOrExtendsBySessionIdAndKey(String sessionId, String key) {
        SessionGroup sessionGroup = sessionGroupRepository.findBySessionIdAndSessionKey(sessionId, key)
                .orElseThrow(() -> new AuthenticationException("일치하는 세션을 찾을 수 없습니다."));

        LocalDateTime currentTime = LocalDateTime.now(clock);
        validateSession(sessionGroup, currentTime);
        extendsSession(sessionGroup, currentTime);
        return sessionGroup.getSessionValue();
    }

    private void validateSession(SessionGroup sessionGroup, LocalDateTime currentTime) throws AuthenticationException {
        if (sessionGroup.isExpired(currentTime)) {
            sessionGroupRepository.delete(sessionGroup);
            throw new AuthenticationException("세션이 만료 되었습니다.");
        }
    }

    private void extendsSession(SessionGroup sessionGroup, LocalDateTime currentTime) {
        if (sessionGroup.canExtends(currentTime)) {
            sessionGroup.extendExpireTime(EXTEND_EXPIRED_DAY);
        }
    }

    @Transactional
    public void add(String sessionId, String key, String value) {
        if (sessionGroupRepository.existsBySessionIdAndSessionValue(sessionId, value)) {
            return;
        }

        SessionGroup sessionGroup = SessionGroup.builder()
                .sessionId(sessionId)
                .sessionKey(key)
                .sessionValue(value)
                .expireTime(LocalDateTime.now().plusDays(EXTEND_EXPIRED_DAY))
                .build();
        sessionGroupRepository.save(sessionGroup);
    }

    @Transactional
    public void delete(String sessionId, String key) {
        SessionGroup sessionGroup = sessionGroupRepository.findBySessionIdAndSessionKey(sessionId, key)
                .orElseThrow(() -> new AuthenticationException("일치하는 세션을 찾을 수 없습니다."));

        sessionGroupRepository.delete(sessionGroup);
    }

    @Transactional
    public void delete(Long kakaoId) {
        sessionGroupRepository.deleteBySessionValue(String.valueOf(kakaoId));
    }
}
