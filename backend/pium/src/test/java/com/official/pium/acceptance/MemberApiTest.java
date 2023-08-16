package com.official.pium.acceptance;

import com.official.pium.AcceptanceTest;
import io.restassured.RestAssured;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
public class MemberApiTest extends AcceptanceTest {

    @Test
    void 회원탈퇴_정상_요청_시_204_반환() {
        String sessionId = 로그인_요청();

        RestAssured.given()
                .log().all()
                .sessionId(sessionId)
                .when()
                .delete("/members/withdraw")
                .then()
                .log().all()
                .statusCode(HttpStatus.NO_CONTENT.value())
                .extract();
    }

    @Test
    void 잘못된_세션ID로_회원탈퇴_요청_시_401_반환() {
        String invalidSessionId = "invalidSessionId";

        RestAssured.given()
                .log().all()
                .sessionId(invalidSessionId)
                .when()
                .delete("/members/withdraw")
                .then()
                .log().all()
                .statusCode(HttpStatus.UNAUTHORIZED.value())
                .extract();
    }

    @Test
    void 회원_세션이_유효하면_200_반환() {
        String sessionId = 로그인_요청();

        RestAssured.given()
                .log().all()
                .sessionId(sessionId)
                .when()
                .get("/members/me")
                .then()
                .log().all()
                .statusCode(HttpStatus.OK.value())
                .extract();
    }

    @Test
    void 회원_세션이_유효하지_않으면_401_반환() {
        String invalidSessionId = "invalidSessionId";

        RestAssured.given()
                .log().all()
                .sessionId(invalidSessionId)
                .when()
                .get("/members/me")
                .then()
                .log().all()
                .statusCode(HttpStatus.UNAUTHORIZED.value())
                .extract();
    }

    private String 로그인_요청() {
        return RestAssured.given()
                .log().all()
                .queryParam("code", "authorizationCode")
                .when()
                .post("/login")
                .then()
                .log().all()
                .statusCode(HttpStatus.OK.value())
                .extract()
                .sessionId();
    }
}
