package com.official.pium.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import com.official.pium.domain.Member;
import com.official.pium.repository.MemberRepository;
import com.official.pium.repository.PetPlantRepository;
import com.official.pium.support.PetPlantSupport;
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

    @Autowired
    private PetPlantSupport petPlantSupport;

    @Autowired
    private PetPlantRepository petPlantRepository;

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

    @Test
    void 사용자_삭제시_반려식물도_함께_삭제된다() {
        Member member = Member.builder()
                .kakaoId(123451L)
                .build();
        Member saveMember = memberRepository.save(member);

        Long petPlant1 = petPlantSupport.builder().member(saveMember).build().getId();
        Long petPlant2 = petPlantSupport.builder().member(saveMember).build().getId();
        Long petPlant3 = petPlantSupport.builder().member(saveMember).build().getId();

        memberService.withdraw(saveMember);

        assertSoftly(softly -> {
            softly.assertThat(petPlantRepository.findById(petPlant1)).isEmpty();
            softly.assertThat(petPlantRepository.findById(petPlant2)).isEmpty();
            softly.assertThat(petPlantRepository.findById(petPlant3)).isEmpty();
        });
    }
}
