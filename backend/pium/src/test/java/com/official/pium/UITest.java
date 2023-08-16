package com.official.pium;

import com.official.pium.config.WebMvcConfigure;
import com.official.pium.domain.Member;
import com.official.pium.repository.MemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.mock.web.MockHttpSession;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;

@AutoConfigureRestDocs
@Import(value = {WebMvcConfigure.class})
public class UITest {

    private static final String SESSION_KEY = "KAKAO_ID";

    @MockBean
    private MemberRepository memberRepository;

    protected MockHttpSession session = new MockHttpSession();

    @BeforeEach
    void setUp() {
        Member member = Member.builder()
                .kakaoId(12345L)
                .build();

        session.setAttribute(SESSION_KEY, member.getKakaoId());

        given(memberRepository.findByKakaoId(anyLong()))
                .willReturn(Optional.of(member));
    }
}
