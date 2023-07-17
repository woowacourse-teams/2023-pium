package com.official.pium.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.official.pium.service.PetPlantService;
import com.official.pium.service.dto.PetPlantResponse;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static com.official.pium.fixture.PetPlantFixture.REQUEST.피우미_등록_요청;
import static com.official.pium.fixture.PetPlantFixture.RESPONSE;
import static org.mockito.BDDMockito.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.redirectedUrl;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@WebMvcTest(controllers = PetPlantController.class)
class PetPlantControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private PetPlantService petPlantService;


    @Nested
    class 반려_식물이 {

        @Test
        void 등록되면_CREATED를_반환한다() throws Exception {
            PetPlantResponse response = RESPONSE.피우미_응답;
            given(petPlantService.create(any(), any()))
                    .willReturn(response);

            mockMvc.perform(post("/pet-plants")
                            .content(objectMapper.writeValueAsString(피우미_등록_요청))
                            .contentType(MediaType.APPLICATION_JSON_VALUE))
                    .andExpect(MockMvcResultMatchers.status().isCreated())
                    .andExpect(redirectedUrl("/pet-plants/" + response.getId()))
                    .andDo(print());
        }

        @Test
        void 전부_조회하면_OK를_반환한다() throws Exception {
            given(petPlantService.readAll(any()))
                    .willReturn(RESPONSE.식물_전체조회_응답);

            mockMvc.perform(get("/pet-plants"))
                    .andExpect(MockMvcResultMatchers.status().isOk())
                    .andDo(print());
        }
    }
}
