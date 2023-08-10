package com.official.pium.controller;

import static com.official.pium.fixture.HistoryFixture.RESPONSE.히스토리;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.official.pium.UITest;
import com.official.pium.domain.Member;
import com.official.pium.service.HistoryService;
import com.official.pium.service.dto.HistoryResponse;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@WebMvcTest(controllers = HistoryController.class)
public class HistoryControllerTest extends UITest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private HistoryService historyService;

    @Nested
    class 히스토리_단건_조회_ {

        @Test
        void 정상_요청시_200을_반환한다() throws Exception {
            HistoryResponse response = 히스토리;
            given(historyService.read(anyLong(), any(Pageable.class), any(Member.class)))
                    .willReturn(response);

            mockMvc.perform(get("/history")
                            .header("Authorization", "pium@gmail.com")
                            .param("petPlantId", "1")
                            .param("page", "1")
                            .param("size", "1")
                            .contentType(MediaType.APPLICATION_JSON)
                    )
                    .andDo(document("history/findByPetPlantId/",
                            preprocessRequest(prettyPrint()),
                            preprocessResponse(prettyPrint()),
                            requestHeaders(
                                    headerWithName("Authorization").description("사용자 인증 정보")
                            ),
                            queryParameters(
                                    parameterWithName("petPlantId").description("반려 식물 아이디"),
                                    parameterWithName("page").description("페이지 번호 (0부터 시작)"),
                                    parameterWithName("size").description("페이지 크기")
                            ))
                    )
                    .andExpect(status().isOk())
                    .andDo(print());
        }

        @Test
        void petPlantId_값이_존재하지_않으면_400_반환() throws Exception {
            HistoryResponse response = 히스토리;
            given(historyService.read(anyLong(), any(Pageable.class), any(Member.class)))
                    .willReturn(response);

            mockMvc.perform(get("/history")
                            .header("Authorization", "pium@gmail.com")
                            .param("petPlantId", "")
                            .param("page", "1")
                            .param("size", "1")
                            .contentType(MediaType.APPLICATION_JSON)
                    )
                    .andExpect(status().isBadRequest())
                    .andDo(print());
        }

        @Test
        void petPlantId_값이_1이상이_아니면_400_반환() throws Exception {
            HistoryResponse response = 히스토리;
            given(historyService.read(anyLong(), any(Pageable.class), any(Member.class)))
                    .willReturn(response);

            mockMvc.perform(get("/history")
                            .header("Authorization", "pium@gmail.com")
                            .param("petPlantId", "0")
                            .param("page", "1")
                            .param("size", "1")
                            .contentType(MediaType.APPLICATION_JSON)
                    )
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.message", equalTo("반려 식물 ID는 1이상의 값이어야 합니다. Value: 0")))
                    .andDo(print());
        }
    }
}
