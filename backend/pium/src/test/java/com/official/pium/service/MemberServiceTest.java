package com.official.pium.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import com.official.pium.config.DatabaseClearExtension;
import com.official.pium.domain.Member;
import com.official.pium.repository.MemberRepository;
import com.official.pium.repository.PetPlantRepository;
import com.official.pium.service.dto.NotificationCheckResponse;
import com.official.pium.service.dto.NotificationSubscribeRequest;
import com.official.pium.support.MemberSupport;
import com.official.pium.support.PetPlantSupport;
import java.util.Optional;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@ExtendWith(DatabaseClearExtension.class)
@SpringBootTest(webEnvironment = WebEnvironment.DEFINED_PORT)
class MemberServiceTest {

    @Autowired
    private MemberService memberService;

    @Autowired
    private MemberSupport memberSupport;

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
        Optional<Member> findMember = memberRepository.findById(member.getId());

        assertThat(findMember).isEmpty();
    }

    @Test
    void 사용자_삭제시_반려식물도_함께_삭제된다() {
        Member saveMember = memberSupport.builder()
                .kakaoId(123451L)
                .build();

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

    @Test
    void 알림_구독_시_사용자의_디바이스_토큰에_값이_존재한다() {
        Member saveMember = memberSupport.builder()
                .kakaoId(123451L)
                .build();

        memberService.subscribeNotification(saveMember, NotificationSubscribeRequest.builder()
                .deviceToken("deviceToken")
                .build());

        assertThat(saveMember.getDeviceToken()).isEqualTo("deviceToken");
    }

    @Test
    void 알림_해지_시_사용자의_디바이스_토큰에_값이_존재한다() {
        Member saveMember = memberSupport.builder()
                .kakaoId(123451L)
                .deviceToken("deviceToken")
                .build();

        memberService.unSubscribeNotification(saveMember);

        assertThat(saveMember.getDeviceToken()).isNull();
    }

    @Test
    void 사용자가_알림_구독중이면_True() {
        Member saveMember = memberSupport.builder()
                .kakaoId(123451L)
                .deviceToken("deviceToken")
                .build();

        NotificationCheckResponse notificationCheckResponse = memberService.checkNotification(saveMember);

        assertThat(notificationCheckResponse.isSubscribe()).isTrue();
    }

    @Test
    void 사용자가_알림_구독중이_아니면_False() {
        Member saveMember = memberSupport.builder()
                .kakaoId(1231451L)
                .deviceToken(null)
                .build();

        NotificationCheckResponse notificationCheckResponse = memberService.checkNotification(saveMember);

        assertThat(notificationCheckResponse.isSubscribe()).isFalse();
    }
}
