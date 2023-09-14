package com.official.pium.acceptance;

import com.official.pium.AcceptanceTest;
import com.official.pium.domain.Member;
import com.official.pium.fixture.GardenFixture;
import com.official.pium.service.dto.GardenCreateRequest;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

import static org.hamcrest.Matchers.containsString;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
public class GardenApiTest extends AcceptanceTest {

    @Nested
    class 정원_식물_등록_시 {

        @Test
        void 존재하지_않는_사용자라면_401_반환() {
            String invalidSessionId = "invalidSessionId";
            GardenCreateRequest request = GardenFixture.REQUEST.정원_게시글_등록_요청;

            RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    .sessionId(invalidSessionId)
                    .when()
                    .post("/garden")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.UNAUTHORIZED.value())
                    .assertThat().body("message", containsString("로그인이 필요합니다"));
        }

        @Test
        void 존재하지_않는_반려_식물로_요청하면_404_반환() {
            String sessionId = 로그인_요청();
            GardenCreateRequest request = GardenCreateRequest.builder()
                    .content("피움은 나의 즐거움 ~(  ^0^)~")
                    .manageLevel("초보자")
                    .petPlantId(100L)
                    .build();

            RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    .sessionId(sessionId)
                    .when()
                    .post("/garden")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.NOT_FOUND.value())
                    .assertThat().body("message", containsString("반려 식물이 존재하지 않습니다. id:"));
        }

        @Test
        void 정상_요청_시_200_반환() {
            String sessionId = 로그인_요청();
            Member loginMember = memberSupport.builder()
                    .kakaoId(54321L)
                    .build();

            GardenCreateRequest request = GardenFixture.REQUEST.정원_게시글_등록_요청;
            petPlantSupport.builder().member(loginMember).build();

            RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    .sessionId(sessionId)
                    .when()
                    .post("/garden")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.CREATED.value());
        }
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
