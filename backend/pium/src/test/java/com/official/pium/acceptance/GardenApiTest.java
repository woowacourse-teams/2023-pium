package com.official.pium.acceptance;

import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.hamcrest.Matchers.containsString;

import com.official.pium.AcceptanceTest;
import com.official.pium.dictionaryPlant.domain.DictionaryPlant;
import com.official.pium.member.domain.Member;
import com.official.pium.fixture.GardenFixture;
import com.official.pium.garden.application.dto.GardenCreateRequest;
import com.official.pium.garden.application.dto.SingleGardenResponse;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import java.util.Comparator;
import java.util.List;
import java.util.stream.LongStream;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class GardenApiTest extends AcceptanceTest {

    @Nested
    class 정원_식물_등록_ {

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
                    .assertThat().body("message", containsString("일치하는 세션을 찾을 수 없습니다."));
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

    @Nested
    class 정원_식물_조회_ {

        @Test
        void 필터링없이_요청시_전체_정원_게시글_반환() {
            int page = 0;
            int size = 6;
            generateGardens(6);

            ExtractableResponse<Response> response = RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .queryParam("page", page)
                    .queryParam("size", size)
                    .log().all()
                    .when()
                    .get("/garden")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.OK.value())
                    .extract();

            assertSoftly(softly -> {
                softly.assertThat(response.jsonPath().getInt("page")).isEqualTo(page);
                softly.assertThat(response.jsonPath().getInt("size")).isEqualTo(size);
                softly.assertThat(response.jsonPath().getInt("elementSize")).isEqualTo(6);
            });
        }

        @Test
        void 사전_식물ID로_필터링된_정원_식물_게시글_반환() {
            int page = 0;
            int size = 10;
            generateGardens(5);

            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            LongStream.rangeClosed(1, 5)
                    .forEach(i -> gardenSupport.builder()
                            .dictionaryPlant(dictionaryPlant)
                            .member(memberSupport.builder().kakaoId(i).build())
                            .build());

            ExtractableResponse<Response> response = RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .queryParam("filter", dictionaryPlant.getId())
                    .queryParam("page", page)
                    .queryParam("size", size)
                    .log().all()
                    .when()
                    .get("/garden")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.OK.value())
                    .extract();

            assertSoftly(softly -> {
                softly.assertThat(response.jsonPath().getInt("page")).isEqualTo(page);
                softly.assertThat(response.jsonPath().getInt("size")).isEqualTo(size);
                softly.assertThat(response.jsonPath().getInt("elementSize")).isEqualTo(5);
            });
        }

        @Test
        void 정원_식물_조회시_최신순으로_정렬하여_반환() {
            int page = 0;
            int size = 10;
            generateGardens(5);

            ExtractableResponse<Response> response = RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .queryParam("page", page)
                    .queryParam("size", size)
                    .log().all()
                    .when()
                    .get("/garden")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.OK.value())
                    .extract();

            List<SingleGardenResponse> singleGardenResponses = response.jsonPath()
                    .getList("data", SingleGardenResponse.class);

            assertSoftly(
                    softly -> {
                        softly.assertThat(response.jsonPath().getInt("page")).isEqualTo(page);
                        softly.assertThat(response.jsonPath().getInt("size")).isEqualTo(size);
                        softly.assertThat(singleGardenResponses)
                                .extracting(SingleGardenResponse::getCreatedAt)
                                .isSortedAccordingTo(Comparator.reverseOrder());
                    }
            );
        }

        private void generateGardens(int count) {
            LongStream.rangeClosed(1, count)
                    .forEach(i -> gardenSupport.builder()
                            .member(memberSupport.builder().kakaoId(i).build())
                            .build());
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
