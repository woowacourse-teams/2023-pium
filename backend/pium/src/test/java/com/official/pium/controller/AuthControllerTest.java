package com.official.pium.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.official.pium.UITest;
import com.official.pium.domain.Member;
import com.official.pium.fixture.LoginFixture;
import com.official.pium.service.AuthService;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.web.servlet.MockMvc;

import static com.official.pium.fixture.LoginFixture.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.http.MediaType.*;
import static org.springframework.restdocs.cookies.CookieDocumentation.requestCookies;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@WebMvcTest(controllers = AuthController.class)
class AuthControllerTest extends UITest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthService authService;

    @Autowired
    private ObjectMapper objectMapper;

    @Nested
    class 로그인_ {

        @Test
        void 정상_요청_시_200_반환() throws Exception {
            given(authService.login(any())).willReturn(Member.builder()
                    .kakaoId(12345L)
                    .build());

            mockMvc.perform(post("/login")
                            .content(objectMapper.writeValueAsString(REQUEST.로그인_요청))
                            .contentType(APPLICATION_JSON_VALUE))
                    .andDo(document("auth/login.html/",
                            preprocessRequest(prettyPrint()),
                            preprocessResponse(prettyPrint()))
                    )
                    .andExpect(status().isOk())
                    .andDo(print());
        }

        @ParameterizedTest
        @ValueSource(strings = {"", " "})
        void 잘못된_인증_코드로_요청_시_400_반환(String code) throws Exception {
            mockMvc.perform(post("/login")
                            .contentType(APPLICATION_JSON_VALUE))
                    .andExpect(status().isBadRequest())
                    .andDo(print());
        }
    }

    @Nested
    class 로그아웃_ {

        @Test
        void 정상_요청_시_200_반환() throws Exception {
            mockMvc.perform(post("/logout")
                            .session(session)
                            .contentType(APPLICATION_JSON_VALUE))
                    .andDo(document("auth/logout/",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    requestCookies()
                            )
                    )
                    .andExpect(status().isOk())
                    .andDo(print());
        }

        @Test
        void 세션_정보_없이_요청_시_401_반환() throws Exception {
            mockMvc.perform(post("/logout")
                            .contentType(APPLICATION_JSON_VALUE))
                    .andExpect(status().isUnauthorized())
                    .andExpect(jsonPath("$.message").value("로그인이 필요합니다"))
                    .andDo(print());
        }

        @Test
        void 만료된_세션으로_요청_시_401_반환() throws Exception {
            MockHttpSession expiredSession = new MockHttpSession();
            expiredSession.invalidate();

            mockMvc.perform(post("/logout")
                            .session(expiredSession)
                            .contentType(APPLICATION_JSON_VALUE))
                    .andExpect(status().isUnauthorized())
                    .andExpect(jsonPath("$.message").value("로그인이 필요합니다"))
                    .andDo(print());
        }
    }
}
