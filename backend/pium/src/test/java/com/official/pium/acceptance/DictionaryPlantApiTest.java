package com.official.pium.acceptance;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.hamcrest.Matchers.equalTo;

import com.official.pium.AcceptanceTest;
import com.official.pium.domain.DictionaryPlant;
import com.official.pium.support.DictionaryPlantSupport;
import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import java.util.List;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class DictionaryPlantApiTest extends AcceptanceTest {

    @Autowired
    private DictionaryPlantSupport dictionaryPlantSupport;

    @Nested
    class 사전_식물_단건_조회 {

        @Test
        void 사전_식물_상세정보_조회_시_사전_식물_정보_반환() {
            DictionaryPlant request = dictionaryPlantSupport.builder().build();

            ExtractableResponse<Response> response = RestAssured
                    .given().log().all()
                    .when()
                    .get("/dictionary-plants/{id}", request.getId())
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.OK.value())
                    .extract();

            assertSoftly(softly -> {
                        softly.assertThat(response.jsonPath().getLong("id")).isEqualTo(request.getId());
                        softly.assertThat(response.jsonPath().getString("name")).isEqualTo(request.getName());
                        softly.assertThat(response.jsonPath().getString("image")).isEqualTo(request.getImageUrl());
                        softly.assertThat(response.jsonPath().getString("familyName")).isEqualTo(request.getFamilyName());
                        softly.assertThat(response.jsonPath().getString("smell")).isEqualTo(request.getSmell());
                        softly.assertThat(response.jsonPath().getString("poison")).isEqualTo(request.getPoison());
                        softly.assertThat(response.jsonPath().getString("manageLevel")).isEqualTo(request.getManageLevel());
                        softly.assertThat(response.jsonPath().getString("growSpeed")).isEqualTo(request.getGrowSpeed());
                        softly.assertThat(response.jsonPath().getString("requireTemp")).isEqualTo(request.getRequireTemp());
                        softly.assertThat(response.jsonPath().getString("minimumTemp")).isEqualTo(request.getMinimumTemp());
                        softly.assertThat(response.jsonPath().getString("requireHumidity"))
                                .isEqualTo(request.getRequireHumidity());
                        softly.assertThat(response.jsonPath().getList("postingPlace"))
                                .isEqualTo(List.of(request.getPostingPlace().split(",")));
                        softly.assertThat(response.jsonPath().getString("specialManageInfo"))
                                .isEqualTo(request.getSpecialManageInfo());
                    }
            );
        }

        @Test
        void 존재하지_않는_사전_식물을_조회하면_예외_발생() {
            Long notFoundId = 100L;

            RestAssured
                    .given().log().all()
                    .when()
                    .get("/dictionary-plants/{id}", notFoundId)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.NOT_FOUND.value())
                    .assertThat().body("message", equalTo(String.format("사전 식물이 존재하지 않습니다. id: %d", notFoundId)));
        }

        @Test
        void 올바르지_않은_ID값으로_조회_시_예외_발생() {
            Long inValidId = -1L;

            RestAssured
                    .given().log().all()
                    .when()
                    .get("/dictionary-plants/{id}", inValidId)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .assertThat()
                    .body("message", equalTo(String.format("사전 식물 ID는 1이상의 값이어야 합니다. Value: %d", inValidId)));
        }
    }

    @Nested
    class 사전_식물_이름으로_조회 {

        @Test
        void 일치하는_결과가_존재하면_배열로_결과를_반환() {
            List<DictionaryPlant> 나무들 = List.of(
                    dictionaryPlantSupport.builder().name("주노나무").build(),
                    dictionaryPlantSupport.builder().name("그레이나무").build(),
                    dictionaryPlantSupport.builder().name("참새나무").build(),
                    dictionaryPlantSupport.builder().name("하마드나무").build(),
                    dictionaryPlantSupport.builder().name("조이나무").build(),
                    dictionaryPlantSupport.builder().name("쵸파나무").build(),
                    dictionaryPlantSupport.builder().name("클린나무").build()
            );

            ExtractableResponse<Response> response = RestAssured
                    .given().log().all()
                    .when()
                    .queryParam("name", "나무")
                    .get("/dictionary-plants")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.OK.value())
                    .extract();

            assertThat(response.jsonPath().getList("data"))
                    .usingRecursiveComparison()
                    .ignoringCollectionOrder()
                    .comparingOnlyFields("name")
                    .isEqualTo(나무들);
        }

        @Test
        void 일치하는_결과가_존재하지_않으면_빈_배열_반환() {
            ExtractableResponse<Response> response = RestAssured
                    .given().log().all()
                    .when()
                    .queryParam("name", "개굴")
                    .get("/dictionary-plants")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.OK.value())
                    .extract();

            assertThat(response.jsonPath().getList("data")).isEmpty();
        }

        @Test
        void 조회하는_이름이_공백이면_예외_발생() {
            String inValidParam = " ";

            RestAssured
                    .given().log().all()
                    .when()
                    .queryParam("name", inValidParam)
                    .get("/dictionary-plants")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .assertThat().body("message", equalTo(String.format("검색어는 비어있을 수 없습니다. Value: %s", inValidParam)));
        }
    }
}
