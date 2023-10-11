package com.official.pium.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.cookies.CookieDocumentation.requestCookies;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.official.pium.UITest;
import com.official.pium.domain.Member;
import com.official.pium.service.MemberService;
import com.official.pium.service.dto.NotificationSubscribeRequest;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.web.servlet.MockMvc;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@WebMvcTest(controllers = MemberController.class)
class MemberControllerTest extends UITest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MemberService memberService;

    @Autowired
    private ObjectMapper objectMapper;

    @Nested
    class 회원_탈퇴_ {

        @Test
        void 정상_요청_시_204_반환() throws Exception {
            doNothing().when(memberService).withdraw(any(Member.class));

            mockMvc.perform(delete("/members/withdraw")
                            .session(session)
                            .contentType(MediaType.APPLICATION_JSON_VALUE))
                    .andDo(document("member/withdraw/",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    requestCookies()
                            )
                    )
                    .andExpect(status().isNoContent())
                    .andDo(print());
        }

        @Test
        void 만료된_세션으로_요청_시_401_반환() throws Exception {
            MockHttpSession expiredSession = new MockHttpSession();
            expiredSession.invalidate();

            mockMvc.perform(delete("/members/withdraw")
                            .session(expiredSession)
                            .contentType(MediaType.APPLICATION_JSON_VALUE))
                    .andExpect(status().isUnauthorized())
                    .andExpect(jsonPath("$.message").value("로그인이 필요합니다"))
                    .andDo(print());
        }
    }

    @Nested
    class 사용자_세션_ {

        @Test
        void 유효_상태라면_200_반환() throws Exception {
            mockMvc.perform(get("/members/me")
                            .session(session)
                            .contentType(MediaType.APPLICATION_JSON_VALUE))
                    .andDo(document("member/checkSession/",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    requestCookies()
                            )
                    )
                    .andExpect(status().isOk())
                    .andDo(print());
        }

        @Test
        void 유효하지_않은_상태라면_401_반환() throws Exception {
            MockHttpSession expiredSession = new MockHttpSession();
            expiredSession.invalidate();

            mockMvc.perform(get("/members/me")
                            .session(expiredSession)
                            .contentType(MediaType.APPLICATION_JSON_VALUE))
                    .andExpect(status().isUnauthorized())
                    .andDo(print());
        }
    }

    @Nested
    class 알림_구독_ {

        @Test
        void 확인_정상_요청_시_200_반환() throws Exception {
            mockMvc.perform(get("/members/notification")
                            .session(session)
                            .contentType(MediaType.APPLICATION_JSON_VALUE))
                    .andDo(document("member/checkNotification/",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    requestCookies()
                            )
                    )
                    .andExpect(status().isOk())
                    .andDo(print());
        }

        @Test
        void 등록_정상_요청_시_200_반환() throws Exception {
            doNothing().when(memberService).subscribeNotification(any(Member.class), any());

            mockMvc.perform(post("/members/notification")
                            .session(session)
                            .contentType(MediaType.APPLICATION_JSON_VALUE)
                            .content(objectMapper.writeValueAsString(NotificationSubscribeRequest.builder()
                                    .deviceToken("deviceToken")
                                    .build())))
                    .andDo(document("member/subscribeNotification/",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    requestCookies()
                            )
                    )
                    .andExpect(status().isOk())
                    .andDo(print());
        }

        @Test
        void 삭제_정상_요청_시_204_반환() throws Exception {
            doNothing().when(memberService).unSubscribeNotification(any(Member.class));

            mockMvc.perform(delete("/members/notification")
                            .session(session)
                            .contentType(MediaType.APPLICATION_JSON_VALUE))
                    .andDo(document("member/unSubscribeNotification/",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    requestCookies()
                            )
                    )
                    .andExpect(status().isNoContent())
                    .andDo(print());
        }
    }
}
