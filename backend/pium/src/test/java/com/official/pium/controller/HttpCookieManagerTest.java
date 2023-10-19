package com.official.pium.controller;

import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class HttpCookieManagerTest {

    @Test
    void JSESSIONID를_가져온다() {
        String requestCookie = "_ga_8SL2D547VW=GS1.1.1697719895.1.1.1697720060.0.0.0; JSESSIONID=F51D50B1C12CE2BC58C6AC6EF8EF0092";
        HttpCookieManager httpCookieManager = new HttpCookieManager(requestCookie);

        String jsessionid = httpCookieManager.getCookie("JSESSIONID");

        assertThat(jsessionid).isEqualTo("F51D50B1C12CE2BC58C6AC6EF8EF0092");
    }

    @Test
    void JSESSIONID를_가져온다2() {
        String requestCookie = "JSESSIONID=F51D50B1C12CE2BC58C6AC6EF8EF0092";
        HttpCookieManager httpCookieManager = new HttpCookieManager(requestCookie);

        String jsessionid = httpCookieManager.getCookie("JSESSIONID");

        assertThat(jsessionid).isEqualTo("F51D50B1C12CE2BC58C6AC6EF8EF0092");
    }

    @Test
    void 일치하는_KEY가_없으면_NULL을_반환한다() {
        String requestCookie = "JSESSIONID=; _ga_8SL2D547VW=GS1.1.1697719895.1.1.1697720060.0.0.0";
        HttpCookieManager httpCookieManager = new HttpCookieManager(requestCookie);

        String jsessionid = httpCookieManager.getCookie("JSESSIONID");

        assertThat(jsessionid).isNull();
    }
}
