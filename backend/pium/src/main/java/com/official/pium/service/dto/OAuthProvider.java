package com.official.pium.service.dto;

import com.official.pium.exception.OAuthException.KaKaoMemberInfoRequestException;
import com.official.pium.exception.OAuthException.KakaoServerException;
import com.official.pium.exception.OAuthException.KakaoTokenRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
public class OAuthProvider {

    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String GRANT_TYPE = "authorization_code";
    public static final String TOKEN_TYPE = "Bearer ";

    @Value("${auth.kakao.token-request-uri}")
    private String tokenRequestUri;

    @Value("${auth.kakao.member-info-request-uri}")
    private String memberInfoRequestUri;

    @Value("${auth.kakao.client-id}")
    private String clientId;

    @Value("${auth.kakao.admin-id}")
    private String adminId;

    @Value("${auth.kakao.redirect-uri}")
    private String redirectUri;

    @Value("${auth.kakao.unlink-uri}")
    private String unLinkUri;

    private final RestTemplate restTemplate;

    public KakaoMemberResponse getMemberInfo(String accessToken) {
        try {
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.set(AUTHORIZATION_HEADER, TOKEN_TYPE + accessToken);
            httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            HttpEntity<Object> request = new HttpEntity<>(httpHeaders);

            return restTemplate.postForEntity(memberInfoRequestUri, request, KakaoMemberResponse.class)
                    .getBody();
        } catch (HttpClientErrorException e) {
            throw new KaKaoMemberInfoRequestException(e.getMessage());
        } catch (HttpServerErrorException e) {
            throw new KakaoServerException(e.getMessage());
        }
    }

    public KaKaoAccessTokenResponse getAccessToken(String authorizationCode) {
        try {
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
            body.add("grant_type", GRANT_TYPE);
            body.add("client_id", clientId);
            body.add("redirect_uri", redirectUri);
            body.add("code", authorizationCode);

            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, httpHeaders);

            return restTemplate.postForEntity(
                    tokenRequestUri, request, KaKaoAccessTokenResponse.class).getBody();
        } catch (HttpClientErrorException e) {
            throw new KakaoTokenRequestException(e.getMessage());
        } catch (HttpServerErrorException e) {
            throw new KakaoServerException(e.getMessage());
        }
    }

    public void withDraw(Long kakaoId) {
        try {
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.set(AUTHORIZATION_HEADER, "KakaoAK " + adminId);
            httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("target_id_type", "user_id");
            body.add("target_id", kakaoId);

            HttpEntity<MultiValueMap<String, Object>> request = new HttpEntity<>(body, httpHeaders);

            restTemplate.postForEntity(unLinkUri, request, KakaoMemberResponse.class);
        } catch (HttpClientErrorException e) {
            throw new KakaoTokenRequestException(e.getMessage());
        } catch (HttpServerErrorException e) {
            throw new KakaoServerException(e.getMessage());
        }
    }
}
