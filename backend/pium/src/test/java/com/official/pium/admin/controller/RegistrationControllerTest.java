package com.official.pium.admin.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.official.pium.UITest;
import com.official.pium.admin.dto.RegistrationRequest;
import com.official.pium.admin.dto.RegistrationResponse;
import com.official.pium.admin.service.RegistrationService;
import com.official.pium.domain.Admin;
import com.official.pium.fixture.FileFixture;
import com.official.pium.service.dto.DataResponse;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import java.nio.charset.StandardCharsets;
import java.util.List;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@WebMvcTest(controllers = RegistrationController.class)
class RegistrationControllerTest extends UITest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RegistrationService registrationService;

    @Autowired
    private ObjectMapper objectMapper;

    @Nested
    class 등록_ {

        @Test
        void 정상_등록_시_201_반환() throws Exception {
            RegistrationRequest registrationRequest = RegistrationRequest.builder()
                    .name("장미")
                    .build();

            MockMultipartFile request = new MockMultipartFile(
                    "request",
                    "",
                    "application/json",
                    objectMapper.writeValueAsBytes(registrationRequest)
            );
            MockMultipartFile multipartFile = (MockMultipartFile) FileFixture.generateMultiPartFile();

            mockMvc.perform(multipart(HttpMethod.POST, "/dictionary-registrations")
                            .file(request)
                            .file(multipartFile)
                            .session(session)
                            .contentType(MediaType.MULTIPART_FORM_DATA)
                            .contentType(MediaType.APPLICATION_JSON)
                            .characterEncoding(StandardCharsets.UTF_8))
                    .andExpect(status().isCreated())
                    .andDo(print());
        }

        @Test
        void 사진_없이_이름만_정상_등록_시_201_반환() throws Exception {
            RegistrationRequest registrationRequest = RegistrationRequest.builder()
                    .name("장미")
                    .build();

            MockMultipartFile request = new MockMultipartFile(
                    "request",
                    "",
                    "application/json",
                    objectMapper.writeValueAsBytes(registrationRequest)
            );

            mockMvc.perform(multipart(HttpMethod.POST, "/dictionary-registrations")
                            .file(request)
                            .session(session)
                            .contentType(MediaType.MULTIPART_FORM_DATA)
                            .contentType(MediaType.APPLICATION_JSON)
                            .characterEncoding(StandardCharsets.UTF_8))
                    .andExpect(status().isCreated())
                    .andDo(print());
        }

        @Test
        void 이름_없이_사진만_정상_등록_시_201_반환() throws Exception {
            MockMultipartFile multipartFile = (MockMultipartFile) FileFixture.generateMultiPartFile();

            mockMvc.perform(multipart(HttpMethod.POST, "/dictionary-registrations")
                            .file(multipartFile)
                            .session(session)
                            .contentType(MediaType.MULTIPART_FORM_DATA)
                            .contentType(MediaType.APPLICATION_JSON)
                            .characterEncoding(StandardCharsets.UTF_8))
                    .andExpect(status().isCreated())
                    .andDo(print());
        }
    }

    @Nested
    class 조회_ {

        @Test
        void 정상_조회_시_200_반환() throws Exception {
            RegistrationResponse registration = RegistrationResponse.builder()
                    .name("장미")
                    .imageUrl("이미지")
                    .build();
            List<RegistrationResponse> responses = List.of(registration);
            DataResponse<List<RegistrationResponse>> dataResponse = DataResponse.<List<RegistrationResponse>>builder()
                    .data(responses)
                    .build();
            given(registrationService.read(any(Admin.class)))
                    .willReturn(dataResponse);

            mockMvc.perform(get("/dictionary-registrations")
                            .session(session))
                    .andExpect(status().isOk());
        }
    }

    @Nested
    class 삭제_ {

        @Test
        void 정상_삭제시_204_반환() throws Exception {
            mockMvc.perform(delete("/dictionary-registrations/1")
                            .session(session))
                    .andExpect(status().isNoContent());
        }

        @Test
        void 잘못된_ID로_삭제하면_400을_반환() throws Exception {
            Long wrongId = -1L;

            mockMvc.perform(delete("/dictionary-registrations/{id}", wrongId)
                            .session(session))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.message")
                            .value(containsString("삭제 요청 ID는 1이상의 값이어야 합니다.")));
        }
    }

}
