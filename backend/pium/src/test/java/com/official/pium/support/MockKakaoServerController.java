package com.official.pium.support;

import com.official.pium.member.application.dto.KaKaoAccessTokenResponse;
import com.official.pium.member.application.dto.KakaoMemberResponse;
import java.util.Arrays;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MockKakaoServerController {

    @Value("${auth.kakao.client-id}")
    private String clientId;

    @Value("${auth.kakao.admin-id}")
    private String adminId;

    @PostMapping(path = "/v1/user/unlink", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity<KakaoMemberResponse> withDraw(HttpEntity<String> request) {

        KakaoMemberResponse response = KakaoMemberResponse.builder()
                .id(12356L)
                .build();

        return ResponseEntity.ok(response);
    }

    @PostMapping(path = "/oauth/token", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity<KaKaoAccessTokenResponse> getAccessToken(HttpEntity<String> request) {
        Map<String, String> body = parseValues(request.getBody());

        if (!Objects.equals(body.get("client_id"), clientId) || Objects.isNull(body.get("code"))) {
            return ResponseEntity.badRequest().build();
        }

        KaKaoAccessTokenResponse response = KaKaoAccessTokenResponse.builder()
                .accessToken("access token")
                .build();

        return ResponseEntity.ok(response);
    }

    private Map<String, String> parseValues(String body) {
        return Arrays.stream(body.split("&"))
                .toList().stream()
                .collect(Collectors.toMap(
                        pair -> pair.split("=")[0],
                        pair -> pair.split("=")[1]
                ));
    }

    @PostMapping(path = "/user/me", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity<KakaoMemberResponse> getMemberInfo(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        if (token == null) {
            return ResponseEntity.badRequest().build();
        }

        KakaoMemberResponse response = KakaoMemberResponse.builder()
                .id(54321L)
                .build();

        return ResponseEntity.ok(response);
    }
}
