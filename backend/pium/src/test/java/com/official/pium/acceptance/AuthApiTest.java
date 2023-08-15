package com.official.pium.acceptance;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import com.official.pium.AcceptanceTest;
import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
public class AuthApiTest extends AcceptanceTest {

    @Test
    void 로그인_정상_요청_시_200_반환() {
        ExtractableResponse<Response> response = RestAssured
                .given()
                .log().all()
                .queryParam("code", "authorizationCode")
                .when()
                .get("/login")
                .then()
                .log().all()
                .statusCode(HttpStatus.OK.value())
                .extract();

        assertThat(response.sessionId()).isNotBlank();
    }

    @Test
    void 로그아웃_정상_요청_시_200_반환() {
        String sessionId = 로그인_요청();

        RestAssured.given()
                .log().all()
                .sessionId(sessionId)
                .when()
                .post("/logout")
                .then()
                .log().all()
                .statusCode(HttpStatus.OK.value())
                .extract();
    }

    @Test
    void 잘못된_세션ID로_로그아웃_요청_시_401_반환() {
        String invalidSessionId = "invalidSessionId";

        RestAssured.given()
                .log().all()
                .sessionId(invalidSessionId)
                .when()
                .post("/logout")
                .then()
                .log().all()
                .statusCode(HttpStatus.UNAUTHORIZED.value())
                .extract();
    }

    @Test
    void 회원탈퇴() {
        String sessionId = 로그인_요청();

        RestAssured.given()
                .log().all()
                .sessionId(sessionId)
                .when()
                .delete("/withdraw")
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
                .delete("/withdraw")
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
                .get("/login")
                .then()
                .log().all()
                .statusCode(HttpStatus.OK.value())
                .extract()
                .sessionId();
    }
}
