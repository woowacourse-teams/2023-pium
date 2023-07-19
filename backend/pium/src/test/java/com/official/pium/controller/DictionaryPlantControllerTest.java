package com.official.pium.controller;


import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.official.pium.fixture.DictionaryPlantFixture;
import com.official.pium.fixture.DictionaryPlantFixture.RESPONSE;
import com.official.pium.service.DictionaryPlantService;
import com.official.pium.service.dto.DataResponse;
import com.official.pium.service.dto.DictionaryPlantResponse;
import com.official.pium.service.dto.DictionaryPlantSearchResponse;
import java.util.List;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@WebMvcTest(controllers = DictionaryPlantController.class)
class DictionaryPlantControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private DictionaryPlantService dictionaryPlantService;

    @Test
    void 사전_식물_상세_정보_조회가_성공하면_OK를_반환한다() throws Exception {
        DictionaryPlantResponse response = RESPONSE.스투키_단일_조회_응답;
        given(dictionaryPlantService.read(response.getId()))
                .willReturn(response);

        mockMvc.perform(get("/dictionary-plants/{dictionaryPlantId}", response.getId())
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("스투키"))
                .andExpect(jsonPath("$.postingPlace").isArray())
                .andExpect(jsonPath("$.waterCycle.spring").value("겉흙이 마르면 촉촉하게"))
                .andDo(print());
    }

    @Test
    void 사전_식물_상세_정보를_0이하의_ID값으로_조회하면_BAD_REQUEST를_반환한다() throws Exception {
        mockMvc.perform(get("/dictionary-plants/{dictionaryPlantId}", 0L)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message", equalTo("사전 식물 ID는 1이상의 값이어야 합니다. Value: 0")));
    }

    @Test
    void 사전_식물_검색이_성공하면_OK를_반환한다() throws Exception {
        DataResponse<List<DictionaryPlantSearchResponse>> 식물들 = DictionaryPlantFixture.RESPONSE.식물들;

        given(
                dictionaryPlantService.search(any())
        ).willReturn(식물들);

        mockMvc.perform(get("/dictionary-plants?name=스투키"))
                .andExpect(status().isOk())
                .andDo(print());
    }
}
