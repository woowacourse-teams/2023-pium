package com.official.pium.fixture;

import com.official.pium.member.domain.Member;

@SuppressWarnings("NonAsciiCharacters")
public class MemberFixture {

    public static Member 주노 = Member.builder()
            .kakaoId(12345L)
            .build();

    public static Member 그레이 = Member.builder()
            .kakaoId(23456L)
            .build();

    public static Member generateMember() {
        return Member.builder()
                .kakaoId(91232304L)
                .build();
    }
}
