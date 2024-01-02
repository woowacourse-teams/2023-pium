package com.official.pium.admin.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class AdminTest {

    @Test
    void isValidate_메소드는_계정_비밀번호_2차비밀번호가_일치하면_True() {
        //given
        Admin admin = new Admin("account", "pw", "pw2");
        //when & then
        assertThat(admin.isValidate("account", "pw", "pw2"))
                .isTrue();
    }

    @ParameterizedTest
    @CsvSource(value = {"account:pw:pw1", "account:pa:pw2", "acnt:pw:pw2"}, delimiter = ':')
    void isValidate_메소드는_계정_비밀번호_2차비밀번호_중_일치하지_않는값이_있다면_False(String account, String password, String secondPassword) {
        //given
        Admin admin = new Admin("account", "pw", "pw2");

        //when & then
        assertThat(admin.isValidate(account, password, secondPassword))
                .isFalse();
    }
}
