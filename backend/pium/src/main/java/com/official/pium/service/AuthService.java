package com.official.pium.service;

import com.official.pium.domain.Member;
import com.official.pium.repository.MemberRepository;
import com.official.pium.service.dto.KaKaoAccessTokenResponse;
import com.official.pium.service.dto.KakaoMemberResponse;
import com.official.pium.service.dto.OAuthProvider;
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
                .orElseGet(() -> memberRepository.save(Member.builder()
                        .kakaoId(kakaoId)
                        .build()));
    }
}
