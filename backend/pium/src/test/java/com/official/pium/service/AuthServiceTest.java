package com.official.pium.service;

import static com.official.pium.fixture.LoginFixture.REQUEST.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.official.pium.domain.Member;
import com.official.pium.fixture.LoginFixture;
import com.official.pium.fixture.LoginFixture.REQUEST;
import com.official.pium.repository.MemberRepository;
import com.official.pium.service.dto.LoginRequest;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.transaction.annotation.Transactional;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@Transactional
@SpringBootTest(webEnvironment = WebEnvironment.DEFINED_PORT)
class AuthServiceTest {

    @Autowired
    private AuthService authService;

    @Autowired
    private MemberRepository memberRepository;

    @Test
    void 로그인_성공() {
        Member loginMember = authService.login(로그인_요청);

        assertThat(loginMember.getKakaoId()).isNotNull();
    }
}
