package com.official.pium.acceptance;

import com.official.pium.AcceptanceTest;
import com.official.pium.domain.DictionaryPlant;
import com.official.pium.service.dto.DataResponse;
import com.official.pium.service.dto.DictionaryPlantResponse;
import com.official.pium.support.DictionaryPlantSupport;
import io.restassured.RestAssured;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.hamcrest.Matchers.equalTo;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class DictionaryPlantApiTest extends AcceptanceTest {

    @Autowired
    private DictionaryPlantSupport dictionaryPlantSupport;

    @Nested
    class 사전_식물_단건_조회 {

        @Test
        void 사전_식물_상세정보_조회_시_사전_식물_정보_반환() {

            DictionaryPlant REQUEST = dictionaryPlantSupport.builder().build();

            DictionaryPlantResponse RESPONSE = RestAssured
                    .given().log().all()
                    .when()
                    .get("/dictionary-plants/" + REQUEST.getId())
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.OK.value())
                    .extract().as(DictionaryPlantResponse.class);

            assertSoftly(softly -> {
                        softly.assertThat(RESPONSE.getId()).isEqualTo(REQUEST.getId());
                        softly.assertThat(RESPONSE.getName()).isEqualTo(REQUEST.getName());
                        softly.assertThat(RESPONSE.getImage()).isEqualTo(REQUEST.getImageUrl());
                        softly.assertThat(RESPONSE.getFamilyName()).isEqualTo(REQUEST.getFamilyName());
                        softly.assertThat(RESPONSE.getSmell()).isEqualTo(REQUEST.getSmell());
                        softly.assertThat(RESPONSE.getPoison()).isEqualTo(REQUEST.getPoison());
                        softly.assertThat(RESPONSE.getManageLevel()).isEqualTo(REQUEST.getManageLevel());
                        softly.assertThat(RESPONSE.getGrowSpeed()).isEqualTo(REQUEST.getGrowSpeed());
                        softly.assertThat(RESPONSE.getRequireTemp()).isEqualTo(REQUEST.getRequireTemp());
                        softly.assertThat(RESPONSE.getMinimumTemp()).isEqualTo(REQUEST.getMinimumTemp());
                        softly.assertThat(RESPONSE.getRequireHumidity()).isEqualTo(REQUEST.getRequireHumidity());
                        softly.assertThat(RESPONSE.getPostingPlace()).isEqualTo(Arrays.asList(REQUEST.getPostingPlace().split(",")));
                        softly.assertThat(RESPONSE.getSpecialManageInfo()).isEqualTo(REQUEST.getSpecialManageInfo());
                    }
            );
        }

        @Test
        void 존재하지_않는_사전_식물을_조회하면_예외_발생() {

            RestAssured
                    .given().log().all()
                    .when()
                    .get("/dictionary-plants/100")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.NOT_FOUND.value())
                    .assertThat().body("message", equalTo("사전 식물이 존재하지 않습니다. id: 100"));
        }

        @Test
        void 올바르지_않은_ID값으로_조회_시_예외_발생() {

            RestAssured
                    .given().log().all()
                    .when()
                    .get("/dictionary-plants/-1")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .assertThat().body("message", equalTo("사전 식물 ID는 1이상의 값이어야 합니다. Value: -1"));
        }
    }

    @Nested
    class 사전_식물_이름으로_조회 {

        List<DictionaryPlant> 나무들 = List.of(
                dictionaryPlantSupport.builder().name("주노나무").build(),
                dictionaryPlantSupport.builder().name("그레이나무").build(),
                dictionaryPlantSupport.builder().name("참새나무").build(),
                dictionaryPlantSupport.builder().name("하마드나무").build(),
                dictionaryPlantSupport.builder().name("조이나무").build(),
                dictionaryPlantSupport.builder().name("쵸파나무").build(),
                dictionaryPlantSupport.builder().name("클린나무").build()
        );

        @Test
        void 일치하는_결과가_존재하면_배열로_결과를_반환() {

            DataResponse response = RestAssured
                    .given().log().all()
                    .when()
                    .queryParam("name", "나무")
                    .get("/dictionary-plants")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.OK.value())
                    .extract().as(DataResponse.class);

            Assertions.assertThat(response.getData())
                    .usingRecursiveComparison()
                    .ignoringCollectionOrder()
                    .comparingOnlyFields("name")
                    .isEqualTo(나무들);
        }

        @Test
        void 일치하는_결과가_존재하지_않으면_빈_배열_반환() {

            DataResponse response = RestAssured
                    .given().log().all()
                    .when()
                    .queryParam("name", "개굴")
                    .get("/dictionary-plants")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.OK.value())
                    .extract().as(DataResponse.class);

            Assertions.assertThat(response.getData())
                    .isEqualTo(Collections.emptyList());
        }

        @Test
        void 조회하는_이름이_공백이면_예외_발생() {

            RestAssured
                    .given().log().all()
                    .when()
                    .queryParam("name", " ")
                    .get("/dictionary-plants")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .assertThat().body("message", equalTo("검색어는 비어있을 수 없습니다. Value:  "));
        }
    }
}
