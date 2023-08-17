package com.official.pium.support;

import com.official.pium.domain.Member;
import com.official.pium.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@SuppressWarnings("NonAsciiCharacters")
public class MemberSupport {

    private final MemberRepository memberRepository;

    public MemberBuilder builder() {
        return new MemberBuilder();
    }

    public final class MemberBuilder {

        private Long kakaoId;

        public MemberBuilder kakaoId(Long kakaoId) {
            this.kakaoId = kakaoId;
            return this;
        }

        public Member build() {
            return memberRepository.save(
                    Member.builder()
                            .kakaoId(kakaoId == null ? 12345L : kakaoId)
                            .build()
            );
        }
    }
}
