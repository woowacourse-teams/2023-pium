package com.official.pium.service;

import com.official.pium.domain.Member;
import com.official.pium.repository.MemberRepository;
import com.official.pium.service.dto.OAuthProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final OAuthProvider provider;

    @Transactional
    public void withdraw(Member member) {
        provider.withDraw(member.getKakaoId());
        memberRepository.deleteByKakaoId(member.getKakaoId());
    }
}
