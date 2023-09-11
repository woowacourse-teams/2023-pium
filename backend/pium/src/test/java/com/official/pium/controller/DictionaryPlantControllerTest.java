package com.official.pium.controller;


import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.patch;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.redirectedUrl;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.official.pium.UITest;
import com.official.pium.fixture.DictionaryPlantFixture.REQUEST;
import com.official.pium.fixture.DictionaryPlantFixture.RESPONSE;
import com.official.pium.service.DictionaryPlantService;
import com.official.pium.service.dto.DataResponse;
import com.official.pium.service.dto.DictionaryPlantCreateRequest;
import com.official.pium.service.dto.DictionaryPlantResponse;
import com.official.pium.service.dto.DictionaryPlantSearchResponse;
import com.official.pium.service.dto.DictionaryPlantUpdateRequest;
import java.util.List;
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
@WebMvcTest(controllers = DictionaryPlantController.class)
class DictionaryPlantControllerTest extends UITest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private DictionaryPlantService dictionaryPlantService;

    @Nested
    class 사전_식물_단건_조회_ {

        @Test
        void 정상_요청시_200을_반환() throws Exception {
            DictionaryPlantResponse response = RESPONSE.스투키_단일_조회_응답;

            given(dictionaryPlantService.read(anyLong()))
                    .willReturn(response);

            mockMvc.perform(get("/dictionary-plants/{id}", response.getId())
                            .contentType(MediaType.APPLICATION_JSON_VALUE))
                    .andDo(document("dictionaryPlant/findById/",
                            preprocessRequest(prettyPrint()),
                            preprocessResponse(prettyPrint()),
                            pathParameters(
                                    parameterWithName("id").description("사전 식물 ID")
                            ))
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

            mockMvc.perform(get("/dictionary-plants").param("name", "스투"))
                    .andDo(document("dictionaryPlant/findByName/",
                            preprocessRequest(prettyPrint()),
                            preprocessResponse(prettyPrint()),
                            queryParameters(
                                    parameterWithName("name").description("사전 식물 검색 파라미터")
                            ))
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

    @Nested
    class 사전_식물_생성_ {

        @Test
        void 정상_요청시_201을_반환() throws Exception {
            DictionaryPlantCreateRequest request = REQUEST.사전_식물_생성_요청;

            given(dictionaryPlantService.create(any(DictionaryPlantCreateRequest.class)))
                    .willReturn(1L);

            mockMvc.perform(post("/dictionary-plants")
                            .session(session)
                            .content(objectMapper.writeValueAsString(request))
                            .contentType(MediaType.APPLICATION_JSON))
                    .andDo(document("dictionaryPlant/create/",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint())
                            )
                    )
                    .andExpect(status().isCreated())
                    .andExpect(redirectedUrl("/dictionary-plants/1"))
                    .andDo(print());
        }

        @Test
        void 누락된_정보가있으면_400을_반환() throws Exception {
            DictionaryPlantCreateRequest request = DictionaryPlantCreateRequest.builder().build();

            mockMvc.perform(post("/dictionary-plants")
                            .session(session)
                            .content(objectMapper.writeValueAsString(request))
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest())
                    .andDo(print());
        }
    }

    @Nested
    class 사전_식물_수정_ {

        @Test
        void 정상_요청시_200을_반환() throws Exception {
            willDoNothing().given(dictionaryPlantService);
            DictionaryPlantUpdateRequest request = REQUEST.사전_식물_수정_요청;

            mockMvc.perform(patch("/dictionary-plants/{id}", 1)
                            .session(session)
                            .content(objectMapper.writeValueAsString(request))
                            .contentType(MediaType.APPLICATION_JSON))
                    .andDo(document("dictionaryPlant/update/",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("id").description("사전 식물 ID")
                                    )
                            )
                    )
                    .andExpect(status().isOk())
                    .andDo(print());
        }

        @Test
        void 누락된_정보가있으면_400을_반환() throws Exception {
            DictionaryPlantUpdateRequest request = DictionaryPlantUpdateRequest.builder().build();

            mockMvc.perform(patch("/dictionary-plants/1")
                            .session(session)
                            .content(objectMapper.writeValueAsString(request))
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest())
                    .andDo(print());
        }
    }

    @Nested
    class 사전_식물_삭제_ {

        @Test
        void 정상_요청시_204를_반환() throws Exception {
            willDoNothing().given(dictionaryPlantService);

            mockMvc.perform(delete("/dictionary-plants/{id}", 1L)
                            .session(session))
                    .andDo(document("dictionaryPlant/delete/",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("id").description("사전 식물 ID")
                                    )
                            )
                    )
                    .andExpect(status().isNoContent())
                    .andDo(print());
        }
    }
}
