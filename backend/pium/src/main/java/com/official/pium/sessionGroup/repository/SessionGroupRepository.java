package com.official.pium.sessionGroup.repository;

import com.official.pium.sessionGroup.domain.SessionGroup;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionGroupRepository extends JpaRepository<SessionGroup, Long> {

    Optional<SessionGroup> findBySessionIdAndSessionKey(String sessionId, String sessionKey);

    void deleteBySessionValue(String sessionValue);

    boolean existsBySessionIdAndSessionValue(String sessionId, String key);
}
