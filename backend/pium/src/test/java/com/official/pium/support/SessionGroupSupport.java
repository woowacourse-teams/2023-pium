package com.official.pium.support;

import com.official.pium.domain.SessionGroup;
import com.official.pium.repository.SessionGroupRepository;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SessionGroupSupport {

    private final SessionGroupRepository sessionGroupRepository;

    public SessionGroupBuilder builder() {
        return new SessionGroupBuilder();
    }

    public final class SessionGroupBuilder {
        private String sessionId;
        private String sessionKey;
        private String sessionValue;
        private LocalDateTime expireTime;

        public SessionGroupBuilder sessionId(String sessionId) {
            this.sessionId = sessionId;
            return this;
        }

        public SessionGroupBuilder sessionKey(String sessionKey) {
            this.sessionKey = sessionKey;
            return this;
        }

        public SessionGroupBuilder sessionValue(String sessionValue) {
            this.sessionValue = sessionValue;
            return this;
        }

        public SessionGroupBuilder expireTime(LocalDateTime expireTime) {
            this.expireTime = expireTime;
            return this;
        }

        public SessionGroup build() {
            return sessionGroupRepository.save(
                    SessionGroup.builder()
                            .sessionId(sessionId == null ? UUID.randomUUID().toString() : sessionId)
                            .sessionKey(sessionKey == null ? UUID.randomUUID().toString() : sessionKey)
                            .sessionValue(sessionValue == null ? UUID.randomUUID().toString() : sessionValue)
                            .expireTime(expireTime == null ? LocalDateTime.now().plusDays(30) : expireTime)
                            .build()
            );
        }
    }
}
