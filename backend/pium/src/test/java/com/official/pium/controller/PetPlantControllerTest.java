package com.official.pium.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.official.pium.UITest;
import com.official.pium.service.PetPlantService;
import com.official.pium.service.dto.DataResponse;
import com.official.pium.service.dto.PetPlantResponse;
import com.official.pium.service.dto.SinglePetPlantResponse;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.nio.charset.StandardCharsets;
import java.util.List;

import static com.official.pium.fixture.PetPlantFixture.REQUEST.피우미_등록_요청;
import static com.official.pium.fixture.PetPlantFixture.RESPONSE;
import static org.hamcrest.Matchers.containsString;
import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@WebMvcTest(controllers = PetPlantController.class)
class PetPlantControllerTest extends UITest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PetPlantService petPlantService;

    @Autowired
    private ObjectMapper objectMapper;

    @Nested
    class 반려_식물_ {

        @Test
        void 등록하면_201을_반환() throws Exception {
            PetPlantResponse response = RESPONSE.피우미_응답;
            given(petPlantService.create(any(), any()))
                    .willReturn(response);

            mockMvc.perform(post("/pet-plants")
                            .content(objectMapper.writeValueAsString(피우미_등록_요청))
                            .contentType(MediaType.APPLICATION_JSON_VALUE))
                    .andExpect(status().isCreated())
                    .andExpect(redirectedUrl("/pet-plants/" + response.getId()))
                    .andDo(print());
        }

        @Test
        void 조회하면_200을_반환() throws Exception {
            given(petPlantService.read(anyLong()))
                    .willReturn(RESPONSE.피우미_응답);

            mockMvc.perform(get("/pet-plants/{id}", 1L)
                            .contentType(MediaType.APPLICATION_JSON)
                            .characterEncoding(StandardCharsets.UTF_8))
                    .andExpect(status().isOk())
                    .andDo(print());
        }

        @Test
        void 잘못된_ID로_조회하면_400을_반환() throws Exception {
            mockMvc.perform(get("/pet-plants/{id}", -1L)
                            .contentType(MediaType.APPLICATION_JSON)
                            .characterEncoding(StandardCharsets.UTF_8))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.message").value(containsString("반려 식물 ID는 1이상의 값이어야 합니다.")))
                    .andDo(print());
        }

        @Test
        void 전체_조회하면_200을_반환() throws Exception {
            DataResponse<List<SinglePetPlantResponse>> response = RESPONSE.식물_전체조회_응답;
            given(petPlantService.readAll(any()))
                    .willReturn(RESPONSE.식물_전체조회_응답);

            mockMvc.perform(get("/pet-plants"))
                    .andExpect(status().isOk())
                    .andDo(print());
        }
    }
}
