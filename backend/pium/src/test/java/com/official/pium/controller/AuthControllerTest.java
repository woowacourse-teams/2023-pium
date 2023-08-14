package com.official.pium.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.official.pium.UITest;
import com.official.pium.domain.Member;
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

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@WebMvcTest(controllers = AuthController.class)
class AuthControllerTest extends UITest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthService authService;

    @Nested
    class 로그인_ {

        @Test
        void 정상_요청_시_200_반환() throws Exception {
            given(authService.login(anyString())).willReturn(Member.builder()
                    .kakaoId(12345L)
                    .build());

            mockMvc.perform(get("/login")
                            .param("code", "authorization code")
                            .contentType(MediaType.APPLICATION_JSON_VALUE))
                    .andExpect(status().isOk())
                    .andDo(print());
        }

        @ParameterizedTest
        @ValueSource(strings = {"", " "})
        void 잘못된_인증_코드로_요청_시_400_반환(String code) throws Exception {
            mockMvc.perform(get("/login")
                            .param("code", code)
                            .contentType(MediaType.APPLICATION_JSON_VALUE))
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
                            .contentType(MediaType.APPLICATION_JSON_VALUE))
                    .andExpect(status().isOk())
                    .andDo(print());
        }

        @Test
        void 세션_정보_없이_요청_시_401_반환() throws Exception {
            mockMvc.perform(post("/logout")
                            .contentType(MediaType.APPLICATION_JSON_VALUE))
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
                            .contentType(MediaType.APPLICATION_JSON_VALUE))
                    .andExpect(status().isUnauthorized())
                    .andExpect(jsonPath("$.message").value("로그인이 필요합니다"))
                    .andDo(print());
        }
    }

    @Nested
    class 회원_탈퇴_ {

        @Test
        void 정상_요청_시_204_반환() throws Exception {
            doNothing().when(authService).withdraw(any(Member.class));

            mockMvc.perform(delete("/withdraw")
                            .session(session)
                            .contentType(MediaType.APPLICATION_JSON_VALUE))
                    .andExpect(status().isNoContent())
                    .andDo(print());
        }

        @Test
        void 만료된_세션으로_요청_시_401_반환() throws Exception {
            MockHttpSession expiredSession = new MockHttpSession();
            expiredSession.invalidate();

            mockMvc.perform(delete("/withdraw")
                            .session(expiredSession)
                            .contentType(MediaType.APPLICATION_JSON_VALUE))
                    .andExpect(status().isUnauthorized())
                    .andExpect(jsonPath("$.message").value("로그인이 필요합니다"))
                    .andDo(print());
        }
    }
}
