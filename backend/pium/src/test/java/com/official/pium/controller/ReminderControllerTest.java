package com.official.pium.controller;


import static com.official.pium.fixture.ReminderFixture.REQUEST.리마인더_물주기_요청;
import static com.official.pium.fixture.ReminderFixture.REQUEST.리마인더_미루기_요청;
import static com.official.pium.fixture.ReminderFixture.RESPONSE.리마인더_조회_응답;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.official.pium.UITest;
import com.official.pium.service.ReminderService;
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
    class 리마인더_ {

        @Test
        void 정상적인_물주기_요청_시_204를_반환() throws Exception {
            willDoNothing().given(reminderService)
                    .water(any(), anyLong(), any());

            mockMvc.perform(post("/reminders/{id}", 1L)
                            .content(objectMapper.writeValueAsString(리마인더_물주기_요청))
                            .contentType(MediaType.APPLICATION_JSON_VALUE))
                    .andExpect(status().isNoContent())
                    .andDo(print());
        }

        @Test
        void 잘못된_ID로_물주기_요청_시_400_반환() throws Exception {
            Long wrongId = -1L;

            mockMvc.perform(post("/reminders/{id}", wrongId)
                            .content(objectMapper.writeValueAsString(리마인더_물주기_요청))
                            .contentType(MediaType.APPLICATION_JSON_VALUE))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.message").value("반려 식물 ID는 1이상의 값이어야 합니다. Value: " + wrongId))
                    .andDo(print());
        }

        @Test
        void 정상적인_미루기_요청_시_204_반환() throws Exception {
            mockMvc.perform(patch("/reminders/{id}", 1L)
                            .content(objectMapper.writeValueAsString(리마인더_미루기_요청))
                            .contentType(MediaType.APPLICATION_JSON_VALUE))
                    .andExpect(status().isNoContent())
                    .andDo(print());
        }

        @Test
        void 잘못된_ID로_미루면_400_반환() throws Exception {
            Long wrongId = 0L;

            mockMvc.perform(patch("/reminders/{id}", wrongId)
                            .content(objectMapper.writeValueAsString(리마인더_미루기_요청))
                            .contentType(MediaType.APPLICATION_JSON_VALUE))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.message").value("반려 식물 ID는 1이상의 값이어야 합니다. Value: " + wrongId))
                    .andDo(print());
        }

        @Test
        void 전체_조회_시_200_반환() throws Exception {
            given(reminderService.readAll(any()))
                    .willReturn(리마인더_조회_응답);

            mockMvc.perform(get("/reminders")
                            .contentType(MediaType.APPLICATION_JSON_VALUE))
                    .andExpect(status().isOk())
                    .andDo(print());
        }
    }
}
