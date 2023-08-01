package com.official.pium.controller;

import com.official.pium.UITest;
import com.official.pium.domain.Member;
import com.official.pium.service.HistoryService;
import com.official.pium.service.dto.HistoryPageRequest;
import com.official.pium.service.dto.HistoryResponse;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static com.official.pium.fixture.HistoryFixture.RESPONSE.히스토리;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@WebMvcTest(controllers = HistoryController.class)
public class HistoryControllerTest extends UITest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private HistoryService historyService;

    @Nested
    class 히스토리_조회_시 {

        @Test
        void 조회에_성공하면_200을_반환한다() throws Exception {
            HistoryResponse response = 히스토리;
            given(historyService.read(anyLong(), any(HistoryPageRequest.class), any(Member.class)))
                    .willReturn(response);

            mockMvc.perform(get("/history?petPlantId=1&page=1&size=4")
                            .contentType(MediaType.APPLICATION_JSON)
                    )
                    .andExpect(status().isOk())
                    .andDo(print());
        }

        @Test
        void petPlantId_값이_존재하지_않으면_400_반환() throws Exception {
            HistoryResponse response = 히스토리;
            given(historyService.read(any(), any(), any()))
                    .willReturn(response);

            mockMvc.perform(get("/history?petPlantId=&page=1&size=4")
                            .contentType(MediaType.APPLICATION_JSON)
                    )
                    .andExpect(status().isBadRequest())
                    .andDo(print());
        }

        @Test
        void petPlantId_값이_1이상이_아니면_400_반환() throws Exception {
            HistoryResponse response = 히스토리;
            given(historyService.read(any(), any(), any()))
                    .willReturn(response);

            mockMvc.perform(get("/history?petPlantId=0&page=1&size=4")
                            .contentType(MediaType.APPLICATION_JSON)
                    )
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.message", equalTo("반려 식물 ID는 1이상의 값이어야 합니다. Value: 0")))
                    .andDo(print());
        }

        @Test
        void page_값이_1이상이_아니면_400_반환() throws Exception {
            HistoryResponse response = 히스토리;
            given(historyService.read(any(), any(), any()))
                    .willReturn(response);

            mockMvc.perform(get("/history?petPlantId=1&page=0&size=4")
                            .contentType(MediaType.APPLICATION_JSON)
                    )
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.message", equalTo("페이지는 1이상의 값이어야 합니다. Value: 0")))
                    .andDo(print());
        }

        @Test
        void size_값이_1이상이_아니면_400_반환() throws Exception {
            HistoryResponse response = 히스토리;
            given(historyService.read(any(), any(), any()))
                    .willReturn(response);

            mockMvc.perform(get("/history?petPlantId=1&page=1&size=0")
                            .contentType(MediaType.APPLICATION_JSON)
                    )
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.message", equalTo("페이지 크기는 1이상의 값이어야 합니다. Value: 0")))
                    .andDo(print());
        }
    }

}
