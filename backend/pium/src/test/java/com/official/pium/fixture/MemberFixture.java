package com.official.pium.fixture;

import com.official.pium.domain.Member;

@SuppressWarnings("NonAsciiCharacters")
public class MemberFixture {

    public static Member 주노 = Member.builder()
            .email("junho5336@gmail.com")
            .build();

    public static Member generateMember() {
        return Member.builder()
                .email("pium@gmail.com")
                .build();
    }
}
