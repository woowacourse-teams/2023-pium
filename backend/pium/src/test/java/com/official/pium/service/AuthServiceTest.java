package com.official.pium.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.method;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

import com.official.pium.domain.Member;
import com.official.pium.repository.MemberRepository;
import java.util.Optional;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestTemplate;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@SpringBootTest
class AuthServiceTest {

    @Value("${auth.kakao.token-request-uri}")
    private String TOKEN_REQUEST_URI;

    @Value("${auth.kakao.member-info-request-uri}")
    private String MEMBER_INFO_REQUEST_URI;

    @Autowired
    private RestTemplate restTemplate;

    private MockRestServiceServer mockServer;

    @Autowired
    private AuthService authService;

    @Autowired
    private MemberRepository memberRepository;

    @ParameterizedTest
    @CsvSource({"token1,12345,code1", "token2,1234534,code2", "token3,1234534,code3"})
    void 로그인(String accessToken, Long kakaoId, String authorizationCode) {
        mockServer = MockRestServiceServer.createServer(restTemplate);

        String tokenResponse = String.format("{\"access_token\":\"%s\"}", accessToken);
        String MemberInfoResponse = String.format("{\"id\":\"%d\"}", kakaoId);

        mockServer.expect(requestTo(TOKEN_REQUEST_URI))
                .andExpect(method(HttpMethod.POST))
                .andRespond(withSuccess(tokenResponse, MediaType.APPLICATION_JSON));

        mockServer.expect(requestTo(MEMBER_INFO_REQUEST_URI))
                .andExpect(method(HttpMethod.POST))
                .andRespond(withSuccess(MemberInfoResponse, MediaType.APPLICATION_JSON));

        Member loginMember = authService.login(authorizationCode);

        assertThat(loginMember.getKakaoId()).isEqualTo(kakaoId);
    }

    @Test
    void 회원탈퇴() {
        Member member = Member.builder().kakaoId(1234533333L).build();
        Member saveMember = memberRepository.save(member);

        authService.withdraw(saveMember);
        Optional<Member> findMember = memberRepository.findByKakaoId(member.getKakaoId());

        assertThat(findMember.isEmpty()).isTrue();
    }
}
