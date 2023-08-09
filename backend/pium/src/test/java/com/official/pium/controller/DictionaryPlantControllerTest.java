package com.official.pium.controller;


import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.official.pium.fixture.DictionaryPlantFixture.RESPONSE;
import com.official.pium.repository.MemberRepository;
import com.official.pium.service.DictionaryPlantService;
import com.official.pium.service.dto.DataResponse;
import com.official.pium.service.dto.DictionaryPlantResponse;
import com.official.pium.service.dto.DictionaryPlantSearchResponse;
import java.util.List;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@AutoConfigureRestDocs
@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@WebMvcTest(controllers = DictionaryPlantController.class)
class DictionaryPlantControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private DictionaryPlantService dictionaryPlantService;

    @MockBean
    private MemberRepository memberRepository;

    @Nested
    class 사전_식물_단건_조회_ {

        @Test
        void 정상_요청시_200을_반환() throws Exception {
            DictionaryPlantResponse response = RESPONSE.스투키_단일_조회_응답;
            given(dictionaryPlantService.read(anyLong()))
                    .willReturn(response);

            mockMvc.perform(get("/dictionary-plants/{dictionaryPlantId}", response.getId())
                            .contentType(MediaType.APPLICATION_JSON_VALUE))
                    .andDo(document("dictionaryPlant/findById/",
                            preprocessRequest(prettyPrint()),
                            preprocessResponse(prettyPrint()))
                    )
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.id").value(1))
                    .andExpect(jsonPath("$.name").value("스투키"))
                    .andExpect(jsonPath("$.postingPlace").isArray())
                    .andExpect(jsonPath("$.waterCycle.spring").value("겉흙이 마르면 촉촉하게"))
                    .andDo(print());
        }

        @Test
        void ID값을_0이하의_값으로_조회하면_400을_반환() throws Exception {
            mockMvc.perform(get("/dictionary-plants/{dictionaryPlantId}", 0L)
                            .contentType(MediaType.APPLICATION_JSON_VALUE))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.message", equalTo("사전 식물 ID는 1이상의 값이어야 합니다. Value: 0")));
        }
    }

    @Nested
    class 사전_식물_이름으로_조회_ {

        @Test
        void 정상_요청시_200을_반환() throws Exception {
            DataResponse<List<DictionaryPlantSearchResponse>> response = RESPONSE.스투_검색결과;
            given(dictionaryPlantService.search(anyString()))
                    .willReturn(response);

            mockMvc.perform(get("/dictionary-plants?name=스투"))
                    .andDo(document("dictionaryPlant/findByName/",
                            preprocessRequest(prettyPrint()),
                            preprocessResponse(prettyPrint()))
                    )
                    .andExpect(status().isOk())
                    .andDo(print());
        }

        @Test
        void 이름이_비어있으면_400을_반환() throws Exception {
            mockMvc.perform(get("/dictionary-plants?name="))
                    .andExpect(status().isBadRequest())
                    .andDo(print());
        }
    }
}
