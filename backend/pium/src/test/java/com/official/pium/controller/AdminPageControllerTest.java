package com.official.pium.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.official.pium.UITest;
import com.official.pium.admin.controller.AdminPageController;
import com.official.pium.admin.repository.RegistrationRepository;
import com.official.pium.admin.service.AdminService;
import com.official.pium.fixture.DictionaryPlantFixture.REQUEST;
import com.official.pium.repository.DictionaryPlantRepository;
import com.official.pium.service.PetPlantService;
import com.official.pium.service.dto.AdminLoginRequest;
import com.official.pium.service.dto.DictionaryPlantUpdateRequest;
import java.util.Optional;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static com.official.pium.fixture.DictionaryPlantFixture.스투키;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.redirectedUrl;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@WebMvcTest(controllers = AdminPageController.class)
class AdminPageControllerTest extends UITest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private DictionaryPlantRepository dictionaryPlantRepository;

    @MockBean
    private RegistrationRepository registrationRepository;

    @MockBean
    private AdminService adminService;

    @Nested
    class 페이지_정상_호출_ {

        @Test
        void 어드민_페이지() throws Exception {
            mockMvc.perform(get("/admin")
                            .session(session))
                    .andExpect(status().isOk())
                    .andExpect(view().name("admin/index"))
                    .andDo(print());
        }

        @Test
        void 로그인_페이지() throws Exception {
            mockMvc.perform(get("/admin/login")
                            .session(session))
                    .andExpect(status().isOk())
                    .andExpect(view().name("admin/login"))
                    .andDo(print());
        }

        @Test
        void 사전식물_목록_페이지() throws Exception {
            given(dictionaryPlantRepository.findAll(any(Pageable.class)))
                    .willReturn(Page.empty());

            mockMvc.perform(get("/admin/dict")
                            .session(session))
                    .andExpect(status().isOk())
                    .andExpect(view().name("admin/dict/list"))
                    .andDo(print());
        }

        @Test
        void 사전식물_상세_페이지() throws Exception {
            given(dictionaryPlantRepository.findById(anyLong()))
                    .willReturn(Optional.ofNullable(스투키));

            mockMvc.perform(get("/admin/dict/1")
                            .session(session))
                    .andExpect(status().isOk())
                    .andExpect(view().name("admin/dict/plant"))
                    .andDo(print());
        }

        @Test
        void 사전식물_생성_페이지() throws Exception {
            mockMvc.perform(get("/admin/dict/create")
                            .session(session))
                    .andExpect(status().isOk())
                    .andExpect(view().name("admin/dict/create"))
                    .andDo(print());
        }

        @Test
        void 사전식물_수정_페이지() throws Exception {
            given(dictionaryPlantRepository.findById(anyLong()))
                    .willReturn(Optional.ofNullable(스투키));

            DictionaryPlantUpdateRequest request = REQUEST.사전_식물_수정_요청;

            mockMvc.perform(get("/admin/dict/1/update")
                            .session(session)
                            .content(objectMapper.writeValueAsString(request))
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andExpect(view().name("admin/dict/update"))
                    .andDo(print());
        }

        @Test
        void 사전식물_요청_목록_페이지() throws Exception {
            given(registrationRepository.findAll(any(Pageable.class)))
                    .willReturn(Page.empty());

            mockMvc.perform(get("/admin/dict/requests")
                            .session(session)
                    )
                    .andExpect(status().isOk())
                    .andExpect(view().name("admin/dict/requests"))
                    .andDo(print());
        }
    }

    @Test
    void 로그인_정상_요청시_302_반환() throws Exception {
        willDoNothing().given(adminService);

        AdminLoginRequest request = AdminLoginRequest.builder()
                .account(admin.getAccount())
                .password(admin.getPassword())
                .secondPassword(admin.getSecondPassword())
                .build();

        mockMvc.perform(post("/admin/login")
                        .session(session)
                        .content(objectMapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("/admin"))
                .andDo(print());
    }

    @Test
    void 로그아웃_정상_수행_시_200_반환() throws Exception {
        mockMvc.perform(post("/admin/logout")
                        .session(session))
                .andExpect(status().isOk())
                .andDo(print());

        assertThat(session.isInvalid()).isTrue();
    }
}
