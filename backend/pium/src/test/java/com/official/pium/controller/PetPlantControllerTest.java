package com.official.pium.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.official.pium.service.PetPlantService;
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
import static org.mockito.BDDMockito.any;
import static org.mockito.BDDMockito.doNothing;
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
            doNothing().when(petPlantService).create(any(), any());
            mockMvc.perform(post("/pet-plant")
                            .content(objectMapper.writeValueAsString(피우미_등록_요청))
                            .contentType(MediaType.APPLICATION_JSON_VALUE))
                    .andExpect(MockMvcResultMatchers.status().isCreated())
                    .andExpect(redirectedUrl("/"))
                    .andDo(print());
        }
    }
}
