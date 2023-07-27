package com.official.pium;

import com.official.pium.config.WebMvcConfigure;
import com.official.pium.domain.Member;
import com.official.pium.repository.MemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

@Import(value = {WebMvcConfigure.class})
public class UITest {

    @MockBean
    private MemberRepository memberRepository;

    @BeforeEach
    void setUp() {
        given(memberRepository.findByEmail(any()))
                .willReturn(
                        Optional.of(Member.builder()
                                .email("pium@gmail.com")
                                .build())
                );
    }
}
