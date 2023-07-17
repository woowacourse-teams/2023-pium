package com.official.pium.controller;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import com.official.pium.fixture.DictionaryPlantFixture.RESPONSE;
import com.official.pium.service.DictionaryPlantService;
import com.official.pium.service.dto.DictionaryPlantResponse;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

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
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("스투키"))
                .andExpect(jsonPath("$.postingPlace").isArray())
                .andExpect(jsonPath("$.waterCycle.spring").value("겉흙이 마르면 촉촉하게"))
                .andDo(print());
    }
}
