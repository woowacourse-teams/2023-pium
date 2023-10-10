package com.official.pium.fixture;

import com.official.pium.service.dto.LoginRequest;

@SuppressWarnings("NonAsciiCharacters")
public class LoginFixture {

    public static class REQUEST {
        public static LoginRequest 로그인_요청 = LoginRequest.builder()
                .code("testCode")
                .deviceToken("testToken")
                .build();
    }
}
