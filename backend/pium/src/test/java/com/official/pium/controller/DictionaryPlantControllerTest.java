package com.official.pium.controller;

import com.official.pium.service.dto.DataResponse;
import com.official.pium.service.dto.DictionaryPlantSearchResponse;
import com.official.pium.fixture.DictionaryPlantFixture;
import com.official.pium.service.DictionaryPlantService;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@WebMvcTest(controllers = DictionaryPlantController.class)
public class DictionaryPlantControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private DictionaryPlantService dictionaryPlantService;

    @Test
    void 검색이_성공하면_OK를_반환한다() throws Exception {
        final DataResponse<List<DictionaryPlantSearchResponse>> 식물들 = DictionaryPlantFixture.RESPONSE.식물들;
        given(
                dictionaryPlantService.search(any())
        ).willReturn(식물들);

        mockMvc.perform(get("/dictionary-plants?name=스투키"))
                .andExpect(status().isOk())
                .andDo(print());
    }
}
