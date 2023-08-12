package com.official.pium.acceptance;

import com.official.pium.AcceptanceTest;
import com.official.pium.domain.DictionaryPlant;
import com.official.pium.domain.Member;
import com.official.pium.service.dto.PetPlantCreateRequest;
import com.official.pium.service.dto.PetPlantUpdateRequest;
import com.official.pium.service.dto.ReminderCreateRequest;
import com.official.pium.support.DictionaryPlantSupport;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import java.time.LocalDate;
import java.util.List;

import static com.official.pium.fixture.PetPlantFixture.REQUEST.generatePetPlantCreateRequest;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.equalTo;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
public class HistoryApiTest extends AcceptanceTest {

    @Autowired
    protected DictionaryPlantSupport dictionaryPlantSupport;

    @Nested
    class 반려_식물_단건_히스토리_조회_시_ {

        @Test
        void 존재하지_않는_사용자라면_404_반환() {
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            Long 반려_식물_ID = 반려_식물_등록_요청(generatePetPlantCreateRequest(dictionaryPlant.getId()));

            RestAssured
                    .given()
                    .queryParam("petPlantId", 반려_식물_ID)
                    .log().all()
                    .header("Authorization", "invalidMember")
                    .when()
                    .get("/history")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.NOT_FOUND.value())
                    .assertThat().body("message", containsString("회원을 찾을 수 없습니다."));
        }

        @Test
        void 본인의_반려_식물이_아니라면_400_반환() {
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            Long 반려_식물_ID = 반려_식물_등록_요청(generatePetPlantCreateRequest(dictionaryPlant.getId()));
            Member other = memberSupport.builder()
                    .email("otherMember@gmail.com")
                    .build();

            RestAssured
                    .given()
                    .queryParam("petPlantId", 반려_식물_ID)
                    .log().all()
                    .header("Authorization", other.getEmail())
                    .when()
                    .get("/history")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .assertThat().body("message", containsString("요청 사용자와 반려 식물의 사용자가 일치하지 않습니다."));
        }

        @Test
        void 존재하지_않는_반려_식물이라면_404_반환() {
            RestAssured
                    .given()
                    .queryParam("petPlantId", 1)
                    .log().all()
                    .header("Authorization", member.getEmail())
                    .when()
                    .get("/history")
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
                    .queryParam("petPlantId", invalidId)
                    .log().all()
                    .header("Authorization", member.getEmail())
                    .when()
                    .get("/history")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .assertThat().body("message", containsString("반려 식물 ID는 1이상의 값이어야 합니다."));
        }

        @Test
        void 요청_페이지가_1보다_작으면_첫_페이지_반환() {
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            Long 반려_식물_ID = 반려_식물_등록_요청(generatePetPlantCreateRequest(dictionaryPlant.getId()));
            int invalidPage = -1;

            RestAssured
                    .given()
                    .queryParam("petPlantId", 반려_식물_ID)
                    .queryParam("page", invalidPage)
                    .log().all()
                    .header("Authorization", member.getEmail())
                    .when()
                    .get("/history")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.OK.value())
                    .assertThat().body("page", equalTo(0));
        }

        @Test
        void 요청_페이지가_최대값보다_크면_빈_배열_반환() {
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            LocalDate baseDate = LocalDate.of(2023, 1, 3);
            LocalDate lastWaterDate = baseDate.minusDays(10);
            PetPlantCreateRequest petPlantCreateRequest = generatePetPlantRequestByLastWaterDate(
                    dictionaryPlant.getId(), lastWaterDate);

            Long 반려_식물_ID = 반려_식물_등록_요청(petPlantCreateRequest);
            반려_식물_물주기(반려_식물_ID, baseDate.minusDays(8));
            반려_식물_물주기(반려_식물_ID, baseDate.minusDays(5));
            반려_식물_물주기(반려_식물_ID, baseDate.minusDays(3));
            반려_식물_물주기(반려_식물_ID, baseDate);

            ExtractableResponse<Response> response = RestAssured
                    .given()
                    .queryParam("petPlantId", 반려_식물_ID)
                    .queryParam("page", 1000)
                    .queryParam("size", 1)
                    .log().all()
                    .header("Authorization", member.getEmail())
                    .when()
                    .get("/history")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.OK.value())
                    .extract();

            assertSoftly(softly -> {
                softly.assertThat(response.jsonPath().getInt("page")).isEqualTo(1000);
                softly.assertThat(response.jsonPath().getInt("size")).isEqualTo(1);
                softly.assertThat(response.jsonPath().getInt("elementSize")).isEqualTo(10);
                softly.assertThat(response.jsonPath().getBoolean("hasNext")).isFalse();
                softly.assertThat(response.jsonPath().getList("data")).isEmpty();
            });
        }

        @Test
        void 단건_히스토리_정보_반환() {
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            LocalDate lastWaterDate = LocalDate.of(2022, 1, 13);
            LocalDate waterDate = lastWaterDate.plusDays(3);
            PetPlantCreateRequest petPlantCreateRequest = generatePetPlantRequestByLastWaterDate(
                    dictionaryPlant.getId(), lastWaterDate);

            Long 반려_식물_ID = 반려_식물_등록_요청(petPlantCreateRequest);
            반려_식물_물주기(반려_식물_ID, waterDate);

            ExtractableResponse<Response> response = RestAssured
                    .given()
                    .queryParam("petPlantId", 반려_식물_ID)
                    .log().all()
                    .header("Authorization", member.getEmail())
                    .when()
                    .get("/history")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.OK.value())
                    .extract();

            assertSoftly(softly -> {
                softly.assertThat(response.jsonPath().getInt("elementSize")).isEqualTo(7);
                softly.assertThat(response.jsonPath().getList("data"))
                        .usingRecursiveComparison()
                        .comparingOnlyFields("date")
                        .isEqualTo(List.of(waterDate.toString()));
            });
        }

        @Test
        void 단건_히스토리_정보_반환_페이징_요청() {
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            LocalDate lastWaterDate = LocalDate.of(2020, 4, 5);
            LocalDate waterDate = lastWaterDate.plusDays(3);
            PetPlantCreateRequest petPlantCreateRequest = generatePetPlantRequestByLastWaterDate(
                    dictionaryPlant.getId(), lastWaterDate);

            Long 반려_식물_ID = 반려_식물_등록_요청(petPlantCreateRequest);
            반려_식물_물주기(반려_식물_ID, waterDate);

            int pageRequestParam = 0;
            int sizeRequestParam = 1;
            ExtractableResponse<Response> response = RestAssured
                    .given()
                    .queryParam("petPlantId", 반려_식물_ID)
                    .queryParam("page", pageRequestParam)
                    .queryParam("size", sizeRequestParam)
                    .log().all()
                    .header("Authorization", member.getEmail())
                    .when()
                    .get("/history")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.OK.value())
                    .extract();

            assertSoftly(softly -> {
                softly.assertThat(response.jsonPath().getInt("page")).isEqualTo(pageRequestParam);
                softly.assertThat(response.jsonPath().getInt("size")).isEqualTo(sizeRequestParam);
                softly.assertThat(response.jsonPath().getInt("elementSize")).isEqualTo(7);
                softly.assertThat(response.jsonPath().getList("data"))
                        .usingRecursiveComparison()
                        .comparingOnlyFields("date")
                        .isEqualTo(List.of(waterDate.toString()));
            });
        }

        @Test
        void 반려_식물_최초_등록_시_히스토리_생성() {
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            LocalDate registeredDate = LocalDate.of(2020, 4, 5);
            PetPlantCreateRequest petPlantCreateRequest = generatePetPlantRequestByLastWaterDate(
                    dictionaryPlant.getId(), registeredDate);

            Long 반려_식물_ID = 반려_식물_등록_요청(petPlantCreateRequest);
            int pageRequestParam = 0;
            int sizeRequestParam = 10;
            ExtractableResponse<Response> response = RestAssured
                    .given()
                    .queryParam("petPlantId", 반려_식물_ID)
                    .queryParam("page", pageRequestParam)
                    .queryParam("size", sizeRequestParam)
                    .log().all()
                    .header("Authorization", member.getEmail())
                    .when()
                    .get("/history")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.OK.value())
                    .extract();

            assertSoftly(softly -> {
                softly.assertThat(response.jsonPath().getInt("page")).isEqualTo(pageRequestParam);
                softly.assertThat(response.jsonPath().getInt("size")).isEqualTo(sizeRequestParam);
                softly.assertThat(response.jsonPath().getInt("elementSize")).isEqualTo(6);
                softly.assertThat(response.jsonPath().getList("data"))
                        .usingRecursiveComparison()
                        .comparingOnlyFields("date")
                        .isEqualTo(List.of(registeredDate.toString()));
                softly.assertThat(response.jsonPath().getList("data.content"))
                        .usingRecursiveComparison()
                        .comparingOnlyFields("previous")
                        .isEqualTo(List.of("EMPTY"));
            });

            ExtractableResponse<Response> petPlantResponse = 반려_식물_단건_조회(반려_식물_ID);
            List<String> currentResponses = response.jsonPath().getList("data.content.current");
            assertThat(currentResponses).containsExactlyInAnyOrder(
                    petPlantResponse.jsonPath().getString("location"),
                    petPlantResponse.jsonPath().getString("flowerpot"),
                    petPlantResponse.jsonPath().getString("light"),
                    petPlantResponse.jsonPath().getString("wind"),
                    petPlantResponse.jsonPath().getString("waterCycle"),
                    petPlantResponse.jsonPath().getString("lastWaterDate")
            );
        }
    }

    @Nested
    class 반려_식물_수정_후_반려_식물_단건_히스토리_조회_시_ {

        @Test
        void 수정된_정보를_포함한_단건_히스토리_정보_반환() {
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            LocalDate lastWaterDate = LocalDate.of(2022, 1, 13);
            PetPlantCreateRequest petPlantCreateRequest = generatePetPlantRequestByLastWaterDate(
                    dictionaryPlant.getId(), lastWaterDate);
            Long 반려_식물_ID = 반려_식물_등록_요청(petPlantCreateRequest);
            PetPlantUpdateRequest petPlantUpdateRequest = PetPlantUpdateRequest.builder()
                    .nickname("changedValue")
                    .flowerpot("changedValue")
                    .location("changedValue")
                    .waterCycle(123)
                    .light("changedValue")
                    .wind("changedValue")
                    .birthDate(LocalDate.of(1899, 1, 1))
                    .lastWaterDate(petPlantCreateRequest.getLastWaterDate().minusDays(2))
                    .build();
            ExtractableResponse<Response> petPlantResponse = 반려_식물_단건_조회(반려_식물_ID);
            반려_식물_수정_요청(반려_식물_ID, petPlantUpdateRequest);
            ExtractableResponse<Response> response = RestAssured
                    .given()
                    .queryParam("petPlantId", 반려_식물_ID)
                    .queryParam("size", 100)
                    .log().all()
                    .header("Authorization", member.getEmail())
                    .when()
                    .get("/history")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.OK.value())
                    .extract();

            ExtractableResponse<Response> updatedPetPlantResponse = 반려_식물_단건_조회(반려_식물_ID);
            
            assertSoftly(softly -> {
                softly.assertThat(response.jsonPath().getList("data.content.previous"))
                        .contains(
                                petPlantResponse.jsonPath().getString("location"),
                                petPlantResponse.jsonPath().getString("flowerpot"),
                                petPlantResponse.jsonPath().getString("light"),
                                petPlantResponse.jsonPath().getString("wind"),
                                petPlantResponse.jsonPath().getString("waterCycle")
                        );
                softly.assertThat(response.jsonPath().getList("data.content.current"))
                        .contains(
                                updatedPetPlantResponse.jsonPath().getString("location"),
                                updatedPetPlantResponse.jsonPath().getString("flowerpot"),
                                updatedPetPlantResponse.jsonPath().getString("light"),
                                updatedPetPlantResponse.jsonPath().getString("wind"),
                                updatedPetPlantResponse.jsonPath().getString("waterCycle"),
                                updatedPetPlantResponse.jsonPath().getString("lastWaterDate")
                        );
            });
        }
    }

    private void 반려_식물_수정_요청(Long petPlantId, PetPlantUpdateRequest petPlantUpdateRequest) {
        RestAssured
                .given()
                .contentType(ContentType.JSON)
                .body(petPlantUpdateRequest)
                .log().all()
                .header("Authorization", member.getEmail())
                .when()
                .patch("/pet-plants/{petPlantId}", petPlantId)
                .then()
                .log().all()
                .statusCode(HttpStatus.OK.value());
    }

    private void 반려_식물_물주기(Long petPlantId, LocalDate waterDate) {
        ReminderCreateRequest request = ReminderCreateRequest.builder()
                .waterDate(waterDate)
                .build();

        RestAssured
                .given()
                .contentType(ContentType.JSON)
                .body(request)
                .log().all()
                .header("Authorization", member.getEmail())
                .when()
                .post("/reminders/{id}", petPlantId)
                .then()
                .log().all()
                .statusCode(HttpStatus.NO_CONTENT.value());
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

    private PetPlantCreateRequest generatePetPlantRequestByLastWaterDate(long dictionaryPlantId, LocalDate lastWaterDate) {
        return PetPlantCreateRequest.builder()
                .dictionaryPlantId(dictionaryPlantId)
                .nickname("피우미")
                .location("베란다")
                .flowerpot("플라스틱 화분")
                .waterCycle(3)
                .light("빛 많이 필요함")
                .wind("바람이 잘 통하는 곳")
                .birthDate(LocalDate.of(2000, 7, 2))
                .lastWaterDate(lastWaterDate)
                .build();
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
}
