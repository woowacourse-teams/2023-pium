package com.official.pium.acceptance;

import com.official.pium.AcceptanceTest;
import com.official.pium.domain.DictionaryPlant;
import com.official.pium.domain.Member;
import com.official.pium.domain.PetPlant;
import com.official.pium.service.dto.PetPlantCreateRequest;
import com.official.pium.service.dto.PetPlantResponse;
import com.official.pium.service.dto.PetPlantUpdateRequest;
import com.official.pium.support.DictionaryPlantSupport;
import com.official.pium.support.PetPlantSupport;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import java.time.LocalDate;
import java.util.List;

import static com.official.pium.fixture.PetPlantFixture.REQUEST;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.hamcrest.Matchers.containsString;

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
        void 존재하지_않는_사용자라면_404_반환() {
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            PetPlantCreateRequest request = REQUEST.generatePetPlantCreateRequest(dictionaryPlant.getId());

            RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    .header("Authorization", "invalidMember")
                    .when()
                    .post("/pet-plants")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.NOT_FOUND.value())
                    .assertThat().body("message", containsString("회원을 찾을 수 없습니다."));
        }

        @Test
        void 존재하지_않는_사전_식물을_참조하면_404_반환() {
            PetPlantCreateRequest request = REQUEST.generatePetPlantCreateRequest(3L);

            RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    .header("Authorization", member.getEmail())
                    .when()
                    .post("/pet-plants")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.NOT_FOUND.value())
                    .assertThat().body("message", containsString("사전 식물이 존재하지 않습니다."));
        }

        @Test
        void 등록된_반려_식물_ID_반환() {
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            PetPlantCreateRequest request = REQUEST.generatePetPlantCreateRequest(dictionaryPlant.getId());

            Long 반려_식물_ID = 반려_식물_등록_요청(request);

            ExtractableResponse<Response> response = 반려_식물_단건_조회(반려_식물_ID);

            assertSoftly(softly -> {
                softly.assertThat(response.jsonPath().getString("nickname")).isEqualTo(request.getNickname());
                softly.assertThat(response.jsonPath().getString("location")).isEqualTo(request.getLocation());
                softly.assertThat(response.jsonPath().getString("flowerpot")).isEqualTo(request.getFlowerpot());
                softly.assertThat(response.jsonPath().getString("light")).isEqualTo(request.getLight());
                softly.assertThat(response.jsonPath().getString("wind")).isEqualTo(request.getWind());
                softly.assertThat(response.jsonPath().getInt("waterCycle")).isEqualTo(request.getWaterCycle());
                softly.assertThat(response.jsonPath().getString("birthDate")).isEqualTo(request.getBirthDate().toString());
                softly.assertThat(response.jsonPath().getString("lastWaterDate")).isEqualTo(request.getLastWaterDate().toString());
                softly.assertThat(response.jsonPath().getObject("dictionaryPlant", PetPlantResponse.DictionaryPlantResponse.class).getId()).isEqualTo(request.getDictionaryPlantId());
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

            RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    .header("Authorization", member.getEmail())
                    .when()
                    .post("/pet-plants")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .assertThat().body("message", containsString("마지막 물주기 날짜는 과거 또는 현재의 날짜여야 합니다."));
        }

        @Test
        void 생일이_오늘_이후면_400_반환() {
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

            RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    .header("Authorization", member.getEmail())
                    .when()
                    .post("/pet-plants")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .assertThat().body("message", containsString("입양일은 과거 또는 현재의 날짜여야 합니다."));
        }
    }

    @Nested
    class 반려_식물_단건_조회_시_ {

        @Test
        void 존재하지_않는_사용자라면_404_반환() {
            PetPlant petPlant = petPlantSupport.builder().build();

            RestAssured
                    .given()
                    .log().all()
                    .header("Authorization", "invalidMember")
                    .when()
                    .get("/pet-plants/{id}", petPlant.getId())
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.NOT_FOUND.value())
                    .assertThat().body("message", containsString("회원을 찾을 수 없습니다."));
        }

        @Test
        void 본인의_반려_식물이_아니라면_400_반환() {
            Member other = memberSupport.builder()
                    .email("otherMember@gmail.com")
                    .build();

            PetPlant petPlant = petPlantSupport.builder().build();

            RestAssured
                    .given()
                    .log().all()
                    .header("Authorization", other.getEmail())
                    .when()
                    .get("/pet-plants/{id}", petPlant.getId())
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .assertThat().body("message", containsString("요청 사용자와 반려 식물의 사용자가 일치하지 않습니다."));
        }

        @Test
        void 반려_식물_정보_반환() {
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            PetPlantCreateRequest request = REQUEST.generatePetPlantCreateRequest(dictionaryPlant.getId());

            Long 반려_식물_ID = 반려_식물_등록_요청(request);

            ExtractableResponse<Response> response = 반려_식물_단건_조회(반려_식물_ID);

            assertSoftly(softly -> {
                softly.assertThat(response.jsonPath().getString("nickname")).isEqualTo(request.getNickname());
                softly.assertThat(response.jsonPath().getString("location")).isEqualTo(request.getLocation());
                softly.assertThat(response.jsonPath().getString("flowerpot")).isEqualTo(request.getFlowerpot());
                softly.assertThat(response.jsonPath().getString("light")).isEqualTo(request.getLight());
                softly.assertThat(response.jsonPath().getString("wind")).isEqualTo(request.getWind());
                softly.assertThat(response.jsonPath().getInt("waterCycle")).isEqualTo(request.getWaterCycle());
                softly.assertThat(response.jsonPath().getString("birthDate")).isEqualTo(request.getBirthDate().toString());
                softly.assertThat(response.jsonPath().getString("lastWaterDate")).isEqualTo(request.getLastWaterDate().toString());
                softly.assertThat(response.jsonPath().getObject("dictionaryPlant", PetPlantResponse.DictionaryPlantResponse.class).getId()).isEqualTo(request.getDictionaryPlantId());
            });
        }

        @Test
        void 존재하지_않는_반려_식물이라면_404_반환() {
            RestAssured
                    .given()
                    .log().all()
                    .header("Authorization", member.getEmail())
                    .when()
                    .get("/pet-plants/{id}", 1)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.NOT_FOUND.value())
                    .assertThat().body("message", containsString("일치하는 반려 식물이 존재하지 않습니다."));
        }

        @Test
        void 잘못된_반려_식물_ID_라면_400_반환() {
            long invalidId = -1;

            RestAssured
                    .given()
                    .log().all()
                    .header("Authorization", member.getEmail())
                    .when()
                    .get("/pet-plants/{id}", invalidId)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .assertThat().body("message", containsString("반려 식물 ID는 1이상의 값이어야 합니다."));
        }
    }

    @Nested
    class 반려_식물_전체_조회_시_ {

        @Test
        void 존재하지_않는_사용자라면_404_반환() {
            RestAssured
                    .given()
                    .log().all()
                    .header("Authorization", "invalidMember")
                    .when()
                    .get("/pet-plants")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.NOT_FOUND.value())
                    .assertThat().body("message", containsString("회원을 찾을 수 없습니다."));
        }

        @Test
        void 반려_식물_목록_정보_반환() {
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            PetPlantCreateRequest request = REQUEST.generatePetPlantCreateRequest(dictionaryPlant.getId());
            PetPlantCreateRequest request2 = REQUEST.generatePetPlantCreateRequest(dictionaryPlant.getId());

            Long 반려_식물_ID = 반려_식물_등록_요청(request);
            Long 반려_식물2_ID = 반려_식물_등록_요청(request2);

            ExtractableResponse<Response> response = RestAssured
                    .given()
                    .log().all()
                    .header("Authorization", member.getEmail())
                    .when()
                    .get("/pet-plants")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.OK.value())
                    .extract();

            assertThat(response.jsonPath().getList("data"))
                    .usingRecursiveComparison()
                    .comparingOnlyFields("id")
                    .isEqualTo(List.of(반려_식물_ID, 반려_식물2_ID));
        }

        @Test
        void 반려_식물이_없으면_빈_배열_반환() {
            ExtractableResponse<Response> response = RestAssured
                    .given()
                    .log().all()
                    .header("Authorization", member.getEmail())
                    .when()
                    .get("/pet-plants")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.OK.value())
                    .extract();

            assertThat(response.jsonPath().getList("data"))
                    .isEmpty();
        }
    }

    @Nested
    class 반려_식물_수정_시_ {

        @Test
        void 존재하지_않는_사용자라면_404_반환() {
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            PetPlant petPlant = petPlantSupport.builder()
                    .dictionaryPlant(dictionaryPlant)
                    .build();

            PetPlantUpdateRequest request = REQUEST.피우미_수정_요청;

            RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    .header("Authorization", "invalidMember")
                    .when()
                    .patch("/pet-plants/{id}", petPlant.getId())
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.NOT_FOUND.value())
                    .assertThat().body("message", containsString("회원을 찾을 수 없습니다."));
        }

        @Test
        void 본인의_반려_식물이_아니라면_400_반환() {
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            PetPlant petPlant = petPlantSupport.builder()
                    .member(member)
                    .dictionaryPlant(dictionaryPlant)
                    .build();
            Member other = memberSupport.builder()
                    .email("otherMember@gmail.com")
                    .build();

            PetPlantUpdateRequest request = REQUEST.피우미_수정_요청;

            RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    .header("Authorization", other.getEmail())
                    .when()
                    .patch("/pet-plants/{id}", petPlant.getId())
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .assertThat().body("message", containsString("요청 사용자와 반려 식물의 사용자가 일치하지 않습니다."));
        }

        @Test
        void 수정_요청_정보로_업데이트() {
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            PetPlant petPlant = petPlantSupport.builder()
                    .member(member)
                    .dictionaryPlant(dictionaryPlant)
                    .build();

            PetPlantUpdateRequest request = REQUEST.피우미_수정_요청;

            RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    .header("Authorization", member.getEmail())
                    .when()
                    .patch("/pet-plants/{id}", petPlant.getId())
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.OK.value());

            ExtractableResponse<Response> response = 반려_식물_단건_조회(petPlant.getId());

            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response.jsonPath().getString("nickname")).isEqualTo(request.getNickname());
                softly.assertThat(response.jsonPath().getString("flowerpot")).isEqualTo(request.getFlowerpot());
                softly.assertThat(response.jsonPath().getString("location")).isEqualTo(request.getLocation());
                softly.assertThat(response.jsonPath().getInt("waterCycle")).isEqualTo(request.getWaterCycle());
                softly.assertThat(response.jsonPath().getString("light")).isEqualTo(request.getLight());
                softly.assertThat(response.jsonPath().getString("wind")).isEqualTo(request.getWind());
                softly.assertThat(response.jsonPath().getString("birthDate")).isEqualTo(request.getBirthDate().toString());
                softly.assertThat(response.jsonPath().getString("lastWaterDate")).isEqualTo(request.getLastWaterDate().toString());
            });
        }

        @Test
        void 존재하지_않는_반려_식물이라면_404_반환() {
            PetPlantUpdateRequest request = REQUEST.피우미_수정_요청;

            RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    .header("Authorization", member.getEmail())
                    .when()
                    .patch("/pet-plants/{id}", 1)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.NOT_FOUND.value())
                    .assertThat().body("message", containsString("일치하는 반려 식물이 존재하지 않습니다."));
        }

        @Test
        void 잘못된_반려_식물_ID_라면_400_반환() {
            PetPlantUpdateRequest request = REQUEST.피우미_수정_요청;
            long invalidId = -1;

            RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    .header("Authorization", member.getEmail())
                    .when()
                    .patch("/pet-plants/{id}", invalidId)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .assertThat().body("message", containsString("반려 식물 ID는 1이상의 값이어야 합니다."));
        }
    }

    private ExtractableResponse<Response> 반려_식물_단건_조회(Long petPlantId) {
        return RestAssured
                .given()
                .log().all()
                .header("Authorization", member.getEmail())
                .when()
                .get("/pet-plants/{id}", petPlantId)
                .then()
                .log().all()
                .statusCode(HttpStatus.OK.value())
                .extract();
    }

    private Long 반려_식물_등록_요청(PetPlantCreateRequest request) {
        String petPlantId = RestAssured
                .given()
                .contentType(ContentType.JSON)
                .body(request)
                .log().all()
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
