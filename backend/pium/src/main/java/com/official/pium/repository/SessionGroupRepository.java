package com.official.pium.repository;

import com.official.pium.domain.SessionGroup;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionGroupRepository extends JpaRepository<SessionGroup, Long> {

    Optional<SessionGroup> findBySessionIdAndSessionKey(String sessionId, String sessionKey);

    void deleteBySessionValue(String sessionValue);

    boolean existsBySessionIdAndSessionKey(String sessionId, String key);
}
