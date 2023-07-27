package com.official.pium.controller;

import com.official.pium.UITest;
import com.official.pium.service.HistoryService;
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
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
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
    class 히스토리_ {

        @Test
        void 조회에_성공하면_200을_반환한다() throws Exception {
            HistoryResponse response = 히스토리;
            given(historyService.read(any(), any()))
                    .willReturn(response);

            mockMvc.perform(get("/history?petPlantId=1&page=1&size=4")
                            .contentType(MediaType.APPLICATION_JSON)
                    )
                    .andExpect(status().isOk())
                    .andDo(print());
        }
    }

}
