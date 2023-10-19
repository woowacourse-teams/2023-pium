package com.official.pium;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;

import com.official.pium.config.WebMvcConfigure;
import com.official.pium.domain.Admin;
import com.official.pium.domain.Member;
import com.official.pium.repository.MemberRepository;
import com.official.pium.service.SessionGroupService;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.mock.web.MockHttpSession;

@AutoConfigureRestDocs
@Import(value = {WebMvcConfigure.class})
public class UITest {

    private static final String ADMIN_SESSION_KEY = "PIUM_ADMIN_SESSION_ID";

    @MockBean
    protected MemberRepository memberRepository;

    @MockBean
    protected SessionGroupService sessionGroupService;

    protected MockHttpSession session = new MockHttpSession();

    protected Admin admin;

    @BeforeEach
    void setUp() {
        Member member = Member.builder()
                .kakaoId(12345L)
                .build();

        admin = new Admin("admin", "1234", "12345");

        session.setAttribute(ADMIN_SESSION_KEY, admin);
        given(sessionGroupService.findOrExtendsBySessionIdAndKey(anyString(), anyString()))
                .willReturn("12345");
        given(memberRepository.findByKakaoId(anyLong()))
                .willReturn(Optional.of(member));
    }
}
