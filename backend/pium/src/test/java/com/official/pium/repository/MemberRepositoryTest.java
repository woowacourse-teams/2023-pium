package com.official.pium.repository;

import com.official.pium.config.JpaAuditingConfig;
import com.official.pium.domain.Member;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@DataJpaTest(includeFilters = @ComponentScan.Filter(
        type = FilterType.ASSIGNABLE_TYPE,
        classes = JpaAuditingConfig.class
))
class MemberRepositoryTest {

    @Autowired
    private MemberRepository memberRepository;

    @Test
    void 사용자_저장() {
        Member member = Member.builder()
                .email("hello@aaa.com")
                .build();

        Member save = memberRepository.save(member);

        assertAll(
                () -> assertThat(save).isNotNull(),
                () -> assertThat(save.getId()).isEqualTo(member.getId())
        );
    }

    @Test
    void 사용자_조회() {
        Member member = Member.builder().email("hello@aaa.com").build();

        Member save = memberRepository.save(member);

        assertThat(memberRepository.findById(save.getId())).isPresent();
    }
}
