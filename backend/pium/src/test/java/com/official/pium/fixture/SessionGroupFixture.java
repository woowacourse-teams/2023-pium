package com.official.pium.fixture;

import com.official.pium.sessionGroup.domain.SessionGroup;
import java.time.LocalDateTime;

@SuppressWarnings("NonAsciiCharacters")
public class SessionGroupFixture {

    public static SessionGroup 세션_그룹_만료일_2023_10_16 = SessionGroup.builder()
            .sessionId("12345")
            .sessionKey("KAKAO")
            .sessionValue("210231414")
            .expireTime(LocalDateTime.of(2023, 10, 16, 0, 0))
            .build();
}
