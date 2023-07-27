package com.official.pium.acceptance;

import com.official.pium.AcceptanceTest;
import com.official.pium.domain.DictionaryPlant;
import com.official.pium.service.dto.DictionaryPlantResponse;
import com.official.pium.support.DictionaryPlantSupport;
import io.restassured.RestAssured;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import java.util.Arrays;

import static org.assertj.core.api.SoftAssertions.assertSoftly;

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
                    .statusCode(HttpStatus.NOT_FOUND.value());
        }

        @Test
        void 올바르지_않은_ID값으로_조회_시_예외_발생() {

            RestAssured
                    .given().log().all()
                    .when()
                    .get("/dictionary-plants/-1")
                    .then()
                    .statusCode(HttpStatus.BAD_REQUEST.value());
        }
    }
}
