package com.official.pium.member.application;

import com.official.pium.member.domain.Member;
import com.official.pium.member.repository.MemberRepository;
import com.official.pium.member.application.dto.KaKaoAccessTokenResponse;
import com.official.pium.member.application.dto.KakaoMemberResponse;
import com.official.pium.member.application.dto.OAuthProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AuthService {

    private final MemberRepository memberRepository;
    private final OAuthProvider provider;

    @Transactional
    public Member login(String authorizationCode) {
        KaKaoAccessTokenResponse accessTokenResponse = provider.getAccessToken(authorizationCode);
        String accessToken = accessTokenResponse.getAccessToken();

        KakaoMemberResponse kakaoMemberResponse = provider.getMemberInfo(accessToken);
        Long kakaoId = kakaoMemberResponse.getId();

        return memberRepository.findByKakaoId(kakaoId)
                .orElseGet(() -> createMember(kakaoId));
    }

    private Member createMember(Long kakaoId) {
        Member member = Member.builder()
                .kakaoId(kakaoId)
                .build();
        return memberRepository.save(member);
    }
}
