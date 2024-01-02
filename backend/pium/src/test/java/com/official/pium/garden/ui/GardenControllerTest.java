package com.official.pium.garden.ui;

import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;
import static org.springframework.restdocs.cookies.CookieDocumentation.requestCookies;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.official.pium.UITest;
import com.official.pium.common.exception.AuthenticationException;
import com.official.pium.fixture.GardenFixture;
import com.official.pium.fixture.GardenFixture.REQUEST;
import com.official.pium.garden.application.GardenService;
import com.official.pium.garden.application.dto.GardenCreateRequest;
import com.official.pium.garden.application.dto.GardenResponse;
import com.official.pium.member.domain.Member;
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
import org.springframework.restdocs.operation.preprocess.Preprocessors;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;

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
                    .andDo(document(
                            "garden/create",
                            Preprocessors.preprocessRequest(Preprocessors.prettyPrint()),
                            Preprocessors.preprocessResponse(Preprocessors.prettyPrint()),
                            requestCookies(),
                            requestFields(
                                    fieldWithPath("petPlantId").type(JsonFieldType.NUMBER).description("반려 식물 ID"),
                                    fieldWithPath("content").type(JsonFieldType.STRING).description("내용"),
                                    fieldWithPath("manageLevel").type(JsonFieldType.STRING).description("관리 레벨")
                            )
                    ))
                    .andExpect(status().isCreated())
                    .andDo(print());
        }

        @Test
        void 로그인_없이_요청하면_401_반환() throws Exception {
            willDoNothing().given(gardenService)
                    .create(any(GardenCreateRequest.class), any(Member.class));
            given(sessionGroupService.findOrExtendsBySessionIdAndKey(any(), anyString()))
                    .willThrow(new AuthenticationException("일치하는 세션을 찾을 수 없습니다."));

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
                            .param("page", "0")
                            .param("size", "5")
                            .param("filter", "1")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andDo(document(
                            "garden/findAll",
                            Preprocessors.preprocessRequest(Preprocessors.prettyPrint()),
                            Preprocessors.preprocessResponse(Preprocessors.prettyPrint()),
                            queryParameters(
                                    parameterWithName("page").description("페이지 번호"),
                                    parameterWithName("size").description("페이지 크기"),
                                    parameterWithName("filter").description("(선택) 사전 식물 ID").optional()
                            ),
                            responseFields(
                                    fieldWithPath("page").description("페이지 번호"),
                                    fieldWithPath("size").description("요청 페이지 크기"),
                                    fieldWithPath("elementSize").description("실제 페이지 크기"),
                                    fieldWithPath("hasNext").description("다음 페이지 존재 여부"),
                                    fieldWithPath("data[].id").description("모두의 정원 게시글 ID"),
                                    fieldWithPath("data[].createdAt").description("모두의 정원 게시글 생성일"),
                                    fieldWithPath("data[].updatedAt").description("모두의 정원 게시글 수정일"),
                                    fieldWithPath("data[].dictionaryPlantName").description("사전 식물 이름"),
                                    fieldWithPath("data[].content").description("사용자가 작성한 내용"),
                                    fieldWithPath("data[].manageLevel").description("사용자가 작성한 관리 레벨"),
                                    fieldWithPath("data[].petPlant.imageUrl").description("반려 식물 이미지"),
                                    fieldWithPath("data[].petPlant.nickname").description("반려 식물 별명"),
                                    fieldWithPath("data[].petPlant.location").description("반려 식물 환경 정보 - 위치"),
                                    fieldWithPath("data[].petPlant.flowerpot").description("반려 식물 환경 정보 - 화분"),
                                    fieldWithPath("data[].petPlant.light").description("반려 식물 환경 정보 - 빛"),
                                    fieldWithPath("data[].petPlant.wind").description("반려 식물 환경 정보 - 바람"),
                                    fieldWithPath("data[].petPlant.daySince").description("반려 식물 환경 정보 - 함께한 일 수"),
                                    fieldWithPath("data[].petPlant.waterCycle").description("반려 식물 환경 정보 - 물주기 주기")
                            )
                    ))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.elementSize", equalTo(2)))
                    .andExpect(jsonPath("$.data[0].dictionaryPlantName", equalTo("스투키")))
                    .andExpect(jsonPath("$.data[1].dictionaryPlantName", equalTo("스투키")))
                    .andDo(print());
        }
    }
}
