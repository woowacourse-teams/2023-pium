package com.official.pium.service;

import static org.assertj.core.api.Assertions.assertThat;

import com.official.pium.domain.Member;
import com.official.pium.repository.MemberRepository;
import java.util.Optional;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@SpringBootTest(webEnvironment = WebEnvironment.DEFINED_PORT)
class MemberServiceTest {

    @Autowired
    private MemberService memberService;

    @Autowired
    private MemberRepository memberRepository;

    @Test
    void 회원탈퇴_성공() {
        Member member = Member.builder()
                .kakaoId(1234533333L)
                .build();

        Member saveMember = memberRepository.save(member);

        memberService.withdraw(saveMember);
        Optional<Member> findMember = memberRepository.findByKakaoId(member.getKakaoId());

        assertThat(findMember).isEmpty();
    }
}
