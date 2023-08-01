package com.official.pium.acceptance;

import com.official.pium.AcceptanceTest;
import com.official.pium.domain.DictionaryPlant;
import com.official.pium.exception.dto.GlobalExceptionResponse;
import com.official.pium.service.dto.PetPlantCreateRequest;
import com.official.pium.service.dto.PetPlantResponse;
import com.official.pium.support.DictionaryPlantSupport;
import com.official.pium.support.PetPlantSupport;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import java.time.LocalDate;

import static com.official.pium.fixture.PetPlantFixture.REQUEST;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
public class PetPlantApiTest extends AcceptanceTest {

    @Autowired
    protected PetPlantSupport petPlantSupport;
    @Autowired
    protected DictionaryPlantSupport dictionaryPlantSupport;

    @Nested
    class 반려_식물_등록_시_ {

        @Test
        void 존재하지_않는_사용자라면_400_반환() {
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            PetPlantCreateRequest request = REQUEST.반려_식물_등록_요청(dictionaryPlant.getId());

            GlobalExceptionResponse response = RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    // TODO : 로그인 구현 후 token으로 수정해야함.
                    .header("Authorization", "IllegalMember")
                    .when()
                    .post("/pet-plants")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .extract().as(GlobalExceptionResponse.class);

            Assertions.assertThat(response.getMessage())
                    .contains("회원을 찾을 수 없습니다.");
        }

        @Test
        void 등록된_반려_식물_ID_반환() {
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            PetPlantCreateRequest request = REQUEST.반려_식물_등록_요청(dictionaryPlant.getId());

            Long 반려_식물_ID = 반려_식물_등록_요청(request);

            PetPlantResponse response = 반려_식물_단건_조회(반려_식물_ID);

            assertSoftly(softly -> {
                softly.assertThat(response.getNickname()).isEqualTo(request.getNickname());
                softly.assertThat(response.getLocation()).isEqualTo(request.getLocation());
                softly.assertThat(response.getFlowerpot()).isEqualTo(request.getFlowerpot());
                softly.assertThat(response.getLight()).isEqualTo(request.getLight());
                softly.assertThat(response.getWind()).isEqualTo(request.getWind());
                softly.assertThat(response.getWaterCycle()).isEqualTo(request.getWaterCycle());
                softly.assertThat(response.getBirthDate()).isEqualTo(request.getBirthDate());
                softly.assertThat(response.getLastWaterDate()).isEqualTo(request.getLastWaterDate());
                softly.assertThat(response.getDictionaryPlant().getId()).isEqualTo(request.getDictionaryPlantId());
            });
        }

        @Test
        void 마지막으로_물_준_날짜가_오늘_이후면_400_반환() {
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            PetPlantCreateRequest request = PetPlantCreateRequest.builder()
                    .dictionaryPlantId(dictionaryPlant.getId())
                    .nickname("피우미")
                    .location("베란다 앞")
                    .flowerpot("플라스틱 화분")
                    .waterCycle(3)
                    .light("빛 많이")
                    .wind("바람 많이")
                    .birthDate(LocalDate.now())
                    .lastWaterDate(LocalDate.now().plusDays(2))
                    .build();

            GlobalExceptionResponse response = RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    // TODO : 로그인 구현 후 token으로 수정해야함.
                    .header("Authorization", member.getEmail())
                    .when()
                    .post("/pet-plants")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .extract().as(GlobalExceptionResponse.class);

            Assertions.assertThat(response.getMessage())
                    .contains("과거 또는 현재의 날짜여야 합니다.");
        }

        @Test
        void 마지막으로_생일이_오늘_이후면_400_반환() {
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            PetPlantCreateRequest request = PetPlantCreateRequest.builder()
                    .dictionaryPlantId(dictionaryPlant.getId())
                    .nickname("피우미")
                    .location("베란다 앞")
                    .flowerpot("플라스틱 화분")
                    .waterCycle(3)
                    .light("빛 많이")
                    .wind("바람 많이")
                    .birthDate(LocalDate.now().plusDays(2))
                    .lastWaterDate(LocalDate.now())
                    .build();

            GlobalExceptionResponse response = RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    // TODO : 로그인 구현 후 token으로 수정해야함.
                    .header("Authorization", member.getEmail())
                    .when()
                    .post("/pet-plants")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .extract().as(GlobalExceptionResponse.class);

            Assertions.assertThat(response.getMessage())
                    .contains("과거 또는 현재의 날짜여야 합니다.");
        }
    }

    @Nested
    class 반려_식물_조회_시_ {

        @Test
        void 반려_식물_정보_반환() {
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            PetPlantCreateRequest request = REQUEST.반려_식물_등록_요청(dictionaryPlant.getId());

            Long 반려_식물_ID = 반려_식물_등록_요청(request);

            PetPlantResponse response = 반려_식물_단건_조회(반려_식물_ID);

            assertSoftly(softly -> {
                softly.assertThat(response.getNickname()).isEqualTo(request.getNickname());
                softly.assertThat(response.getLocation()).isEqualTo(request.getLocation());
                softly.assertThat(response.getFlowerpot()).isEqualTo(request.getFlowerpot());
                softly.assertThat(response.getLight()).isEqualTo(request.getLight());
                softly.assertThat(response.getWind()).isEqualTo(request.getWind());
                softly.assertThat(response.getWaterCycle()).isEqualTo(request.getWaterCycle());
                softly.assertThat(response.getBirthDate()).isEqualTo(request.getBirthDate());
                softly.assertThat(response.getLastWaterDate()).isEqualTo(request.getLastWaterDate());
                softly.assertThat(response.getDictionaryPlant().getId()).isEqualTo(request.getDictionaryPlantId());
            });
        }

        @Test
        void 존재하지_않는_반려_식물이라면_404_반환() {
            GlobalExceptionResponse response = RestAssured
                    .given()
                    .log().all()
                    .header("Authorization", member.getEmail())
                    .when()
                    .get("/pet-plants/{id}", 1)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.NOT_FOUND.value())
                    .extract().as(GlobalExceptionResponse.class);

            assertThat(response.getMessage())
                    .contains("일치하는 반려 식물이 존재하지 않습니다.");
        }

        @Test
        void 잘못된_반려_식물_ID_라면_400_반환() {
            GlobalExceptionResponse response = RestAssured
                    .given()
                    .log().all()
                    .header("Authorization", member.getEmail())
                    .when()
                    .get("/pet-plants/{id}", -1)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .extract().as(GlobalExceptionResponse.class);

            assertThat(response.getMessage())
                    .contains("반려 식물 ID는 1이상의 값이어야 합니다.");
        }
    }

    private PetPlantResponse 반려_식물_단건_조회(Long petPlantId) {
        return RestAssured
                .given()
                .log().all()
                .header("Authorization", member.getEmail())
                .when()
                .get("/pet-plants/{id}", petPlantId)
                .then()
                .log().all()
                .statusCode(HttpStatus.OK.value())
                .extract().as(PetPlantResponse.class);
    }

    private Long 반려_식물_등록_요청(PetPlantCreateRequest request) {
        String petPlantId = RestAssured
                .given()
                .contentType(ContentType.JSON)
                .body(request)
                .log().all()
                // TODO : 로그인 구현 후 token으로 수정해야함.
                .header("Authorization", member.getEmail())
                .when()
                .post("/pet-plants")
                .then()
                .log().all()
                .statusCode(HttpStatus.CREATED.value())
                .extract().header("Location")
                .replaceAll("/pet-plants/", "");

        return Long.parseLong(petPlantId);
    }
}
