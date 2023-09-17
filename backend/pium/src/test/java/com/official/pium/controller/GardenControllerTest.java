package com.official.pium.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.official.pium.UITest;
import com.official.pium.domain.Member;
import com.official.pium.fixture.GardenFixture;
import com.official.pium.fixture.GardenFixture.REQUEST;
import com.official.pium.service.GardenService;
import com.official.pium.service.dto.GardenCreateRequest;
import com.official.pium.service.dto.GardenResponse;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@WebMvcTest(controllers = GardenController.class)
public class GardenControllerTest extends UITest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private GardenService gardenService;

    @Autowired
    private ObjectMapper objectMapper;

    @Nested
    class 정원_식물_등록 {

        @Test
        void 정상_요청시_201_반환() throws Exception {
            willDoNothing().given(gardenService)
                    .create(any(GardenCreateRequest.class), any(Member.class));

            mockMvc.perform(post("/garden")
                            .session(session)
                            .content(objectMapper.writeValueAsString(REQUEST.정원_게시글_등록_요청))
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isCreated())
                    .andDo(print());
        }

        @Test
        void 로그인_없이_요청하면_401_반환() throws Exception {
            willDoNothing().given(gardenService)
                    .create(any(GardenCreateRequest.class), any(Member.class));

            mockMvc.perform(post("/garden")
                            .content(objectMapper.writeValueAsString(REQUEST.정원_게시글_등록_요청))
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isUnauthorized())
                    .andDo(print());
        }

        @Test
        void 잘못된_반려_식물_ID로_요청하면_400_반환() throws Exception {
            GardenCreateRequest request = GardenCreateRequest.builder()
                    .petPlantId(0L)
                    .manageLevel("초보자")
                    .content("초보자도 키우기 쉬워요")
                    .build();

            mockMvc.perform(post("/garden")
                            .session(session)
                            .content(objectMapper.writeValueAsString(request))
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest())
                    .andDo(print());
        }

        @ParameterizedTest
        @ValueSource(strings = {"", " "})
        void 본문_내용을_빈_문자열로_요청하면_400_반환(String content) throws Exception {
            GardenCreateRequest request = GardenCreateRequest.builder()
                    .petPlantId(1L)
                    .manageLevel("초보자")
                    .content(content)
                    .build();

            mockMvc.perform(post("/garden")
                            .session(session)
                            .content(objectMapper.writeValueAsString(request))
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest())
                    .andDo(print());
        }

        @ParameterizedTest
        @ValueSource(strings = {"", " "})
        void 관리_레벨을_빈_문자열로_요청하면_400_반환(String manageLevel) throws Exception {
            GardenCreateRequest request = GardenCreateRequest.builder()
                    .petPlantId(2L)
                    .manageLevel(manageLevel)
                    .content("열심히 키워볼게요...")
                    .build();

            mockMvc.perform(post("/garden")
                            .session(session)
                            .content(objectMapper.writeValueAsString(request))
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest())
                    .andDo(print());
        }
    }

    @Nested
    class 정원_식물_조회 {

        @Test
        void 정상_요청시_200_반환() throws Exception {
            GardenResponse response = GardenFixture.RESPONSE.정원_게시글_전체_조회;
            given(gardenService.readAll(any(Pageable.class), anyList())).willReturn(response);

            mockMvc.perform(get("/garden")
                            .param("page", "1")
                            .param("size", "5")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andDo(print());
        }

        @Test
        void 특정_사전_식물_ID로_요청시_필터링된_게시글_반환() throws Exception {
            GardenResponse response = GardenFixture.RESPONSE.정원_게시글_필터링_조회;
            given(gardenService.readAll(any(Pageable.class), anyList())).willReturn(response);

            mockMvc.perform(get("/garden")
                            .param("page", "1")
                            .param("size", "5")
                            .param("filter", "1")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.elementSize", equalTo(2)))
                    .andExpect(jsonPath("$.data[0].dictionaryPlantName", equalTo("스투키")))
                    .andExpect(jsonPath("$.data[1].dictionaryPlantName", equalTo("스투키")))
                    .andDo(print());
        }
    }
}
