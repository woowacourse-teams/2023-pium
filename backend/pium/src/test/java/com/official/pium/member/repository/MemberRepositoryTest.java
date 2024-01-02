package com.official.pium.member.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import com.official.pium.RepositoryTest;
import com.official.pium.member.domain.Member;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class MemberRepositoryTest extends RepositoryTest {

    @Autowired
    private MemberRepository memberRepository;

    @Test
    void 사용자_저장() {
        Member member = Member.builder().build();

        Member save = memberRepository.save(member);

        assertSoftly(
                softly -> {
                    softly.assertThat(save).isNotNull();
                    softly.assertThat(save.getId()).isEqualTo(member.getId());
                }
        );
    }

    @Test
    void 사용자_조회() {
        Member member = Member.builder().build();

        Member saveMember = memberRepository.save(member);

        assertThat(memberRepository.findById(saveMember.getId())).isPresent();
    }

    @Test
    void 카카오_회원_ID로_사용자_조회() {
        Member member = Member.builder().kakaoId(12345L).build();

        Member saveMember = memberRepository.save(member);

        assertThat(memberRepository.findByKakaoId(saveMember.getKakaoId())).isPresent();
    }
}
