package com.official.pium.controller;


import static com.official.pium.fixture.ReminderFixture.REQUEST.리마인더_물주기_요청;
import static com.official.pium.fixture.ReminderFixture.REQUEST.리마인더_미루기_요청;
import static com.official.pium.fixture.ReminderFixture.RESPONSE.리마인더_조회_응답;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.official.pium.UITest;
import com.official.pium.domain.Member;
import com.official.pium.service.ReminderService;
import com.official.pium.service.dto.ReminderCreateRequest;
import com.official.pium.service.dto.ReminderUpdateRequest;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@WebMvcTest(controllers = ReminderController.class)
class ReminderControllerTest extends UITest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ReminderService reminderService;

    @Autowired
    private ObjectMapper objectMapper;

    @Nested
    class 리마인더_물주기_ {

        @Test
        void 정상_요청시_204를_반환() throws Exception {
            willDoNothing().given(reminderService)
                    .water(any(ReminderCreateRequest.class), anyLong(), any(Member.class));

            mockMvc.perform(post("/reminders/{id}", 1L)
                            .header("Authorization", "pium@gmail.com")
                            .content(objectMapper.writeValueAsString(리마인더_물주기_요청))
                            .contentType(MediaType.APPLICATION_JSON_VALUE))
                    .andDo(document("reminder/water/",
                            preprocessRequest(prettyPrint()),
                            preprocessResponse(prettyPrint()))
                    )
                    .andExpect(status().isNoContent())
                    .andDo(print());
        }

        @Test
        void 잘못된_ID로_요청시_400_반환() throws Exception {
            Long wrongId = -1L;

            mockMvc.perform(post("/reminders/{id}", wrongId)
                            .header("Authorization", "pium@gmail.com")
                            .content(objectMapper.writeValueAsString(리마인더_물주기_요청))
                            .contentType(MediaType.APPLICATION_JSON_VALUE))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.message").value("반려 식물 ID는 1이상의 값이어야 합니다. Value: " + wrongId))
                    .andDo(print());
        }
    }

    @Nested
    class 리마인더_미루기_ {

        @Test
        void 정상_요청시_204_반환() throws Exception {
            willDoNothing().given(reminderService)
                    .updateNextWaterDate(any(ReminderUpdateRequest.class), anyLong(), any(Member.class));

            mockMvc.perform(patch("/reminders/{id}", 1L)
                            .header("Authorization", "pium@gmail.com")
                            .content(objectMapper.writeValueAsString(리마인더_미루기_요청))
                            .contentType(MediaType.APPLICATION_JSON_VALUE))
                    .andDo(document("reminder/delay/",
                            preprocessRequest(prettyPrint()),
                            preprocessResponse(prettyPrint()))
                    )
                    .andExpect(status().isNoContent())
                    .andDo(print());
        }

        @Test
        void 잘못된_ID로_미루면_400_반환() throws Exception {
            Long wrongId = 0L;

            mockMvc.perform(patch("/reminders/{id}", wrongId)
                            .header("Authorization", "pium@gmail.com")
                            .content(objectMapper.writeValueAsString(리마인더_미루기_요청))
                            .contentType(MediaType.APPLICATION_JSON_VALUE))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.message").value("반려 식물 ID는 1이상의 값이어야 합니다. Value: " + wrongId))
                    .andDo(print());
        }
    }

    @Nested
    class 리마인더_전체_조회_ {

        @Test
        void 정상_요청시_200_반환() throws Exception {
            given(reminderService.readAll(any(Member.class)))
                    .willReturn(리마인더_조회_응답);

            mockMvc.perform(get("/reminders")
                            .header("Authorization", "pium@gmail.com")
                            .contentType(MediaType.APPLICATION_JSON_VALUE))
                    .andDo(document("reminder/findAll/",
                            preprocessRequest(prettyPrint()),
                            preprocessResponse(prettyPrint()))
                    )
                    .andExpect(status().isOk())
                    .andDo(print());
        }
    }
}
