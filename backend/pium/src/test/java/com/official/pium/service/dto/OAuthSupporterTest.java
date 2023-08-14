package com.official.pium.service.dto;

import static com.official.pium.service.dto.OAuthSupporter.AUTHORIZATION_HEADER;
import static com.official.pium.service.dto.OAuthSupporter.TOKEN_TYPE;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.content;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.header;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.method;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withBadRequest;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withServerError;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

import com.official.pium.exception.OAuthException.KaKaoMemberInfoRequestException;
import com.official.pium.exception.OAuthException.KakaoServerException;
import com.official.pium.exception.OAuthException.KakaoTokenRequestException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
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
class OAuthSupporterTest {

    @Value("${auth.kakao.token-request-uri}")
    private String TOKEN_REQUEST_URI;

    @Value("${auth.kakao.member-info-request-uri}")
    private String MEMBER_INFO_REQUEST_URI;

    @Autowired
    private OAuthSupporter supporter;

    @Autowired
    private RestTemplate restTemplate;

    private MockRestServiceServer mockServer;

    @BeforeEach
    void setUp() {
        mockServer = MockRestServiceServer.createServer(restTemplate);
    }

    @Test
    void 사용자_정보_조회() {
        String accessToken = "access token";
        Long kakaoId = 12345L;

        String response = String.format("{\"id\":\"%d\"}", kakaoId);

        mockServer.expect(requestTo(MEMBER_INFO_REQUEST_URI))
                .andExpect(content().contentType("application/x-www-form-urlencoded"))
                .andExpect(method(HttpMethod.POST))
                .andExpect(header(AUTHORIZATION_HEADER, TOKEN_TYPE + accessToken))
                .andRespond(withSuccess(response, MediaType.APPLICATION_JSON));

        KaKaoMemberInfoResponse memberInfoResponse = supporter.getMemberInfo(accessToken);

        assertThat(memberInfoResponse.getId()).isEqualTo(kakaoId);
    }

    @ParameterizedTest
    @ValueSource(strings = {"", " "})
    void 잘못된_토큰으로_사용자_정보_조회_요청_시_예외_발생(String accessToken) {
        mockServer.expect(requestTo(MEMBER_INFO_REQUEST_URI))
                .andExpect(content().contentType("application/x-www-form-urlencoded"))
                .andExpect(method(HttpMethod.POST))
                .andExpect(header(AUTHORIZATION_HEADER, TOKEN_TYPE + accessToken))
                .andRespond(withBadRequest());

        assertThatThrownBy(
                () -> supporter.getMemberInfo(accessToken)
        ).isInstanceOf(KaKaoMemberInfoRequestException.class);
    }

    @Test
    void 사용자_정보_조회_요청_중_카카오_서버에_문제_발생_시_예외_발생() {
        mockServer.expect(requestTo(MEMBER_INFO_REQUEST_URI))
                .andExpect(content().contentType("application/x-www-form-urlencoded"))
                .andExpect(method(HttpMethod.POST))
                .andExpect(header(AUTHORIZATION_HEADER, TOKEN_TYPE + "accessToken"))
                .andRespond(withServerError());

        assertThatThrownBy(
                () -> supporter.getMemberInfo("accessToken")
        ).isInstanceOf(KakaoServerException.class);
    }

    @Test
    void 액세스_토큰_조회() {
        String authorizationCode = "authorization code";
        String accessToken = "access token";
        String response = String.format("{\"access_token\":\"%s\"}", accessToken);

        mockServer.expect(requestTo(TOKEN_REQUEST_URI))
                .andExpect(content().contentType("application/x-www-form-urlencoded;charset=utf-8"))
                .andExpect(method(HttpMethod.POST))
                .andRespond(withSuccess(response, MediaType.APPLICATION_JSON));

        KaKaoAccessTokenResponse tokenResponse = supporter.getAccessToken(authorizationCode);

        assertThat(tokenResponse.getAccessToken()).isEqualTo(accessToken);
    }

    @ParameterizedTest
    @ValueSource(strings = {"", " "})
    void 잘못된_인증_코드로_액세스_토큰_요청_시_예외_발생(String authorizationCode) {
        mockServer.expect(requestTo(TOKEN_REQUEST_URI))
                .andExpect(content().contentType("application/x-www-form-urlencoded;charset=utf-8"))
                .andExpect(method(HttpMethod.POST))
                .andRespond(withBadRequest());

        assertThatThrownBy(
                () -> supporter.getAccessToken(authorizationCode)
        ).isInstanceOf(KakaoTokenRequestException.class);
    }

    @Test
    void 액세스_토큰_요청_중_카카오_서버에_문제_발생_시_예외_발생() {
        mockServer.expect(requestTo(TOKEN_REQUEST_URI))
                .andExpect(content().contentType("application/x-www-form-urlencoded;charset=utf-8"))
                .andExpect(method(HttpMethod.POST))
                .andRespond(withServerError());

        assertThatThrownBy(
                () -> supporter.getAccessToken("authorizationCode")
        ).isInstanceOf(KakaoServerException.class);
    }
}
