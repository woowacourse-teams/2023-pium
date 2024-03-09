package com.official.pium.acceptance;

import static com.official.pium.fixture.PetPlantFixture.REQUEST.generatePetPlantCreateRequest;
import static com.official.pium.fixture.ReminderFixture.REQUEST.리마인더_물주기_요청;
import static com.official.pium.fixture.ReminderFixture.REQUEST.리마인더_미루기_요청;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsString;

import com.official.pium.AcceptanceTest;
import com.official.pium.dictionaryPlant.domain.DictionaryPlant;
import com.official.pium.petPlant.application.dto.PetPlantCreateRequest;
import com.official.pium.petPlant.application.dto.ReminderCreateRequest;
import com.official.pium.petPlant.application.dto.ReminderUpdateRequest;
import com.official.pium.petPlant.domain.PetPlant;
import io.restassured.RestAssured;
import io.restassured.builder.MultiPartSpecBuilder;
import io.restassured.http.ContentType;
import io.restassured.mapper.ObjectMapperType;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import io.restassured.specification.MultiPartSpecification;
import java.time.LocalDate;
import java.util.List;
import org.assertj.core.api.Assertions;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class ReminderApiTest extends AcceptanceTest {

    @Nested
    class 리마인더_조회_시_ {

        @Test
        void 존재하지_않는_사용자라면_401_반환() {
            String invalidSessionId = "invalidSessionId";

            RestAssured
                    .given()
                    .log().all().sessionId(invalidSessionId)
                    .when()
                    .get("/reminders")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.UNAUTHORIZED.value())
                    .assertThat().body("message", containsString("일치하는 세션을 찾을 수 없습니다."));
        }

        @Test
        void 리마인더_목록을_반환() {
            String sessionId = 로그인_요청();
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            Long 반려_식물_ID = 반려_식물_등록_요청(generatePetPlantCreateRequest(dictionaryPlant.getId()));
            Long 반려_식물2_ID = 반려_식물_등록_요청(generatePetPlantCreateRequest(dictionaryPlant.getId()));
            Long 반려_식물3_ID = 반려_식물_등록_요청(generatePetPlantCreateRequest(dictionaryPlant.getId()));

            ExtractableResponse<Response> response = RestAssured
                    .given()
                    .log().all()
                    .sessionId(sessionId)
                    .when()
                    .get("/reminders")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.OK.value())
                    .extract();

            Assertions.assertThat(response.jsonPath().getList("data"))
                    .usingRecursiveComparison()
                    .comparingOnlyFields("petPlantId")
                    .isEqualTo(List.of(반려_식물_ID, 반려_식물2_ID, 반려_식물3_ID));
        }

        @Test
        void 반려_식물이_없으면_빈_배열_반환() {
            String sessionId = 로그인_요청();
            ExtractableResponse<Response> response = RestAssured
                    .given()
                    .log().all()
                    .sessionId(sessionId)
                    .when()
                    .get("/reminders")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.OK.value())
                    .extract();

            Assertions.assertThat(response.jsonPath().getList("data"))
                    .isEmpty();
        }
    }

    @Nested
    class 물주기_수행_시_ {

        @Test
        void 존재하지_않는_사용자라면_401_반환() {
            String invalidSessionId = "invalidSessionId";

            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            PetPlantCreateRequest petPlantCreateRequest = generatePetPlantCreateRequest(dictionaryPlant.getId());
            Long 반려_식물_ID = 반려_식물_등록_요청(petPlantCreateRequest);
            ReminderCreateRequest request = 리마인더_물주기_요청(petPlantCreateRequest.getLastWaterDate().plusDays(1));

            RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    .sessionId(invalidSessionId)
                    .when()
                    .post("/reminders/{petPlantId}", 반려_식물_ID)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.UNAUTHORIZED.value())
                    .assertThat().body("message", containsString("일치하는 세션을 찾을 수 없습니다."));
        }

        @Test
        void 본인의_반려_식물이_아니라면_400_반환() {
            String sessionId = 로그인_요청();

            PetPlant petPlant = petPlantSupport.builder().build();
            ReminderCreateRequest request = 리마인더_물주기_요청(petPlant.getWaterDetail().getLastWaterDate().plusDays(1));

            RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    .sessionId(sessionId)
                    .when()
                    .post("/reminders/{petPlantId}", petPlant.getId())
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .assertThat().body("message", containsString("요청 사용자와 반려 식물의 사용자가 일치하지 않습니다."));
        }

        @Test
        void 존재하지_않는_반려_식물이라면_404_반환() {
            String sessionId = 로그인_요청();
            ReminderCreateRequest request = 리마인더_물주기_요청(LocalDate.of(2023, 1, 1));

            RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    .sessionId(sessionId)
                    .when()
                    .post("/reminders/{petPlantId}", 1)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.NOT_FOUND.value())
                    .assertThat().body("message", containsString("일치하는 반려 식물이 존재하지 않습니다."));
        }

        @Test
        void 잘못된_반려_식물_ID_라면_400_반환() {
            String sessionId = 로그인_요청();
            ReminderCreateRequest request = 리마인더_물주기_요청(LocalDate.of(2022, 3, 1));
            long invalidId = -1;

            RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    .sessionId(sessionId)
                    .when()
                    .post("/reminders/{id}", invalidId)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .assertThat().body("message", containsString("반려 식물 ID는 1이상의 값이어야 합니다."));
        }

        @Test
        void 반려_식물의_물주기_정보_수정() {
            String sessionId = 로그인_요청();
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            PetPlantCreateRequest petPlantCreateRequest = generatePetPlantRequestByLastWaterDate(
                    dictionaryPlant.getId(),
                    LocalDate.of(2023, 6, 16)
            );

            Long 반려_식물_ID = 반려_식물_등록_요청(petPlantCreateRequest);

            ReminderCreateRequest request = 리마인더_물주기_요청(LocalDate.of(2023, 7, 1));

            RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    .sessionId(sessionId)
                    .when()
                    .post("/reminders/{id}", 반려_식물_ID)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.NO_CONTENT.value());

            ExtractableResponse<Response> response = 반려_식물_단건_조회(반려_식물_ID);

            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response.jsonPath().getString("lastWaterDate"))
                        .isEqualTo(request.getWaterDate().toString());
                softly.assertThat(response.jsonPath().getString("nextWaterDate"))
                        .isEqualTo(request.getWaterDate().plusDays(petPlantCreateRequest.getWaterCycle()).toString());
            });
        }

        @Test
        void 물주는_날짜가_오늘_이후면_400_반환() {
            String sessionId = 로그인_요청();
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            PetPlantCreateRequest petPlantCreateRequest = generatePetPlantRequestByLastWaterDate(
                    dictionaryPlant.getId(),
                    LocalDate.of(2023, 6, 16)
            );

            Long 반려_식물_ID = 반려_식물_등록_요청(petPlantCreateRequest);

            ReminderCreateRequest request = ReminderCreateRequest.builder()
                    .waterDate(LocalDate.now().plusDays(3))
                    .build();

            RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    .sessionId(sessionId)
                    .when()
                    .post("/reminders/{id}", 반려_식물_ID)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .assertThat().body("message", containsString("오늘 이후 날짜에 물을 줄 수는 없습니다."));
        }

        @Test
        void 물주는_날짜가_마지막으로_물을_준_날과_같으면_400_반환() {
            String sessionId = 로그인_요청();
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            PetPlantCreateRequest petPlantCreateRequest = generatePetPlantRequestByLastWaterDate(
                    dictionaryPlant.getId(),
                    LocalDate.of(2023, 6, 16)
            );

            Long 반려_식물_ID = 반려_식물_등록_요청(petPlantCreateRequest);

            ReminderCreateRequest request = ReminderCreateRequest.builder()
                    .waterDate(petPlantCreateRequest.getLastWaterDate())
                    .build();

            RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    .sessionId(sessionId)
                    .when()
                    .post("/reminders/{id}", 반려_식물_ID)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .assertThat().body("message", containsString("마지막으로 물을 준 날짜와 그 이전 날짜에는 물을 줄 수는 없습니다."));
        }

        @Test
        void 물주는_날짜가_마지막으로_물을_준_날_이전이면_400_반환() {
            String sessionId = 로그인_요청();
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            PetPlantCreateRequest petPlantCreateRequest = generatePetPlantRequestByLastWaterDate(
                    dictionaryPlant.getId(),
                    LocalDate.of(2023, 6, 16)
            );

            Long 반려_식물_ID = 반려_식물_등록_요청(petPlantCreateRequest);

            ReminderCreateRequest request = ReminderCreateRequest.builder()
                    .waterDate(petPlantCreateRequest.getLastWaterDate().minusDays(3))
                    .build();

            RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    .sessionId(sessionId)
                    .when()
                    .post("/reminders/{id}", 반려_식물_ID)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .assertThat().body("message", containsString("마지막으로 물을 준 날짜와 그 이전 날짜에는 물을 줄 수는 없습니다."));
        }
    }

    @Nested
    class 날짜_변경_수행_시_ {

        @Test
        void 존재하지_않는_사용자라면_401_반환() {
            String invalidSessionId = "invalidSessionId";
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            PetPlantCreateRequest petPlantCreateRequest = generatePetPlantCreateRequest(dictionaryPlant.getId());
            Long 반려_식물_ID = 반려_식물_등록_요청(petPlantCreateRequest);
            ReminderUpdateRequest request = 리마인더_미루기_요청(petPlantCreateRequest.getLastWaterDate().plusDays(1));

            RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    .sessionId(invalidSessionId)
                    .when()
                    .patch("/reminders/{petPlantId}", 반려_식물_ID)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.UNAUTHORIZED.value())
                    .assertThat().body("message", containsString("일치하는 세션을 찾을 수 없습니다."));
        }

        @Test
        void 존재하지_않는_반려_식물이라면_404_반환() {
            String sessionId = 로그인_요청();
            ReminderUpdateRequest request = 리마인더_미루기_요청(LocalDate.of(2023, 7, 1));

            RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    .sessionId(sessionId)
                    .when()
                    .patch("/reminders/{petPlantId}", 1)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.NOT_FOUND.value())
                    .assertThat().body("message", containsString("일치하는 반려 식물이 존재하지 않습니다."));
        }

        @Test
        void 잘못된_반려_식물_ID_라면_400_반환() {
            String sessionId = 로그인_요청();
            ReminderUpdateRequest request = 리마인더_미루기_요청(LocalDate.of(2023, 7, 1));
            int invalidId = -1;

            RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    .sessionId(sessionId)
                    .when()
                    .patch("/reminders/{id}", invalidId)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .assertThat().body("message", containsString("반려 식물 ID는 1이상의 값이어야 합니다."));
        }

        @Test
        void 반려_식물의_다음_물주기_날짜_변경() {
            String sessionId = 로그인_요청();
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            PetPlantCreateRequest petPlantCreateRequest = generatePetPlantRequestByLastWaterDate(
                    dictionaryPlant.getId(),
                    LocalDate.of(2023, 6, 16)
            );

            Long 반려_식물_ID = 반려_식물_등록_요청(petPlantCreateRequest);

            ReminderUpdateRequest request = ReminderUpdateRequest.builder()
                    .nextWaterDate(LocalDate.now().plusDays(3))
                    .build();

            RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    .sessionId(sessionId)
                    .when()
                    .patch("/reminders/{id}", 반려_식물_ID)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.NO_CONTENT.value());

            ExtractableResponse<Response> response = 반려_식물_단건_조회(반려_식물_ID);

            assertThat(response.jsonPath().getString("nextWaterDate"))
                    .isEqualTo(request.getNextWaterDate().toString());
        }

        @Test
        void 변경_일자가_오늘이면_400_반환() {
            String sessionId = 로그인_요청();
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            PetPlantCreateRequest petPlantCreateRequest = generatePetPlantRequestByLastWaterDate(
                    dictionaryPlant.getId(),
                    LocalDate.of(2023, 6, 16)
            );

            Long 반려_식물_ID = 반려_식물_등록_요청(petPlantCreateRequest);

            ReminderUpdateRequest request = ReminderUpdateRequest.builder()
                    .nextWaterDate(LocalDate.now())
                    .build();

            RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    .sessionId(sessionId)
                    .when()
                    .patch("/reminders/{id}", 반려_식물_ID)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .assertThat().body("message", containsString("오늘과 그 이전 날짜로 물주기 날짜를 변경할 수는 없습니다."));
        }

        @Test
        void 변경_일자가_오늘이전_날짜면_400_반환() {
            String sessionId = 로그인_요청();
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            PetPlantCreateRequest petPlantCreateRequest = generatePetPlantRequestByLastWaterDate(
                    dictionaryPlant.getId(),
                    LocalDate.of(2023, 6, 16)
            );

            Long 반려_식물_ID = 반려_식물_등록_요청(petPlantCreateRequest);

            ReminderUpdateRequest request = ReminderUpdateRequest.builder()
                    .nextWaterDate(LocalDate.now().minusDays(3))
                    .build();

            RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    .sessionId(sessionId)
                    .when()
                    .patch("/reminders/{id}", 반려_식물_ID)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .assertThat().body("message", containsString("오늘과 그 이전 날짜로 물주기 날짜를 변경할 수는 없습니다."));
        }
    }

    private ExtractableResponse<Response> 반려_식물_단건_조회(Long petPlantId) {
        String sessionId = 로그인_요청();

        return RestAssured
                .given()
                .log().all()
                .sessionId(sessionId)
                .when()
                .get("/pet-plants/{id}", petPlantId)
                .then()
                .log().all()
                .statusCode(HttpStatus.OK.value())
                .extract();
    }

    private Long 반려_식물_등록_요청(PetPlantCreateRequest petPlantCreateRequest) {
        String sessionId = 로그인_요청();

        MultiPartSpecification data = getMultiPartSpecification(petPlantCreateRequest);

        String petPlantId = RestAssured
                .given()
                .contentType(MediaType.MULTIPART_FORM_DATA_VALUE)
                .multiPart(data)
                .log().all()
                .sessionId(sessionId)
                .when()
                .post("/pet-plants")
                .then()
                .log().all()
                .statusCode(HttpStatus.CREATED.value())
                .extract().header("Location")
                .replaceAll("/pet-plants/", "");

        return Long.parseLong(petPlantId);
    }

    private MultiPartSpecification getMultiPartSpecification(PetPlantCreateRequest petPlantCreateRequest) {
        return new MultiPartSpecBuilder(petPlantCreateRequest, ObjectMapperType.JACKSON_2)
                .controlName("request")
                .mimeType(MediaType.APPLICATION_JSON_VALUE)
                .charset("UTF-8")
                .build();
    }

    private PetPlantCreateRequest generatePetPlantRequestByLastWaterDate(long dictionaryPlantId,
                                                                         LocalDate lastWaterDate) {
        return PetPlantCreateRequest.builder()
                .dictionaryPlantId(dictionaryPlantId)
                .nickname("피우미")
                .location("베란다")
                .flowerpot("플라스틱 화분")
                .waterCycle(3)
                .light("빛 많이 필요함")
                .wind("바람이 잘 통하는 곳")
                .birthDate(LocalDate.of(2020, 1, 3))
                .lastWaterDate(lastWaterDate)
                .build();
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
