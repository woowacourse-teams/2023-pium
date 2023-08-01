package com.official.pium.acceptance;

import com.official.pium.AcceptanceTest;
import com.official.pium.domain.DictionaryPlant;
import com.official.pium.exception.dto.GlobalExceptionResponse;
import com.official.pium.service.dto.*;
import com.official.pium.support.DictionaryPlantSupport;
import com.official.pium.support.PetPlantSupport;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.assertj.core.api.Assertions;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import java.time.LocalDate;
import java.util.List;

import static com.official.pium.fixture.PetPlantFixture.REQUEST.generatePetPlantCreateRequest;
import static com.official.pium.fixture.ReminderFixture.REQUEST.리마인더_물주기_요청;
import static com.official.pium.fixture.ReminderFixture.REQUEST.리마인더_미루기_요청;
import static org.assertj.core.api.Assertions.assertThat;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
public class ReminderApiTest extends AcceptanceTest {

    @Autowired
    protected PetPlantSupport petPlantSupport;
    @Autowired
    protected DictionaryPlantSupport dictionaryPlantSupport;

    @Nested
    class 리마인더_조회_시_ {

        @Test
        void 존재하지_않는_사용자라면_400_반환() {
            RestAssured
                    .given()
                    .log().all()
                    .header("Authorization", "invalidMember")
                    .when()
                    .get("/reminders")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value());
        }

        @Test
        void 리마인더_목록을_반환() {
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            Long 반려_식물_ID = 반려_식물_등록_요청(generatePetPlantCreateRequest(dictionaryPlant.getId()));
            Long 반려_식물2_ID = 반려_식물_등록_요청(generatePetPlantCreateRequest(dictionaryPlant.getId()));
            Long 반려_식물3_ID = 반려_식물_등록_요청(generatePetPlantCreateRequest(dictionaryPlant.getId()));

            DataResponse response = RestAssured
                    .given()
                    .log().all()
                    .header("Authorization", member.getEmail())
                    .when()
                    .get("/reminders")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.OK.value())
                    .extract().as(DataResponse.class);

            List<ReminderResponse> data = (List<ReminderResponse>) response.getData();
            Assertions.assertThat(data)
                    .usingRecursiveComparison()
                    .comparingOnlyFields("petPlantId")
                    .isEqualTo(List.of(반려_식물_ID, 반려_식물2_ID, 반려_식물3_ID));
        }

        @Test
        void 반려_식물이_없으면_빈_배열_반환() {
            DataResponse response = RestAssured
                    .given()
                    .log().all()
                    .header("Authorization", member.getEmail())
                    .when()
                    .get("/reminders")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.OK.value())
                    .extract().as(DataResponse.class);

            List<ReminderResponse> data = (List<ReminderResponse>) response.getData();
            Assertions.assertThat(data)
                    .isEmpty();
        }
    }

    @Nested
    class 물주기_수행_시_ {

        @Test
        void 존재하지_않는_사용자라면_400_반환() {
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            Long 반려_식물_ID = 반려_식물_등록_요청(generatePetPlantCreateRequest(dictionaryPlant.getId()));
            ReminderCreateRequest request = 리마인더_물주기_요청;

            RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    .header("Authorization", "invalidMember")
                    .when()
                    .post("/reminders/{petPlantId}", 반려_식물_ID)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value());
        }

        @Test
        void 존재하지_않는_반려_식물이라면_404_반환() {
            ReminderCreateRequest request = 리마인더_물주기_요청;

            GlobalExceptionResponse response = RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    .header("Authorization", member.getEmail())
                    .when()
                    .post("/reminders/{petPlantId}", 1)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.NOT_FOUND.value())
                    .extract().as(GlobalExceptionResponse.class);

            assertThat(response.getMessage())
                    .contains("일치하는 반려 식물이 존재하지 않습니다.");
        }

        @Test
        void 잘못된_반려_식물_ID_라면_400_반환() {
            ReminderCreateRequest request = 리마인더_물주기_요청;

            GlobalExceptionResponse response = RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    .header("Authorization", member.getEmail())
                    .when()
                    .post("/reminders/{id}", -1)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .extract().as(GlobalExceptionResponse.class);

            assertThat(response.getMessage())
                    .contains("반려 식물 ID는 1이상의 값이어야 합니다.");
        }

        @Test
        void 반려_식물의_정보_수정() {
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            PetPlantCreateRequest petPlantCreateRequest = generatePetPlantRequestByLastWaterDate(
                    dictionaryPlant.getId(),
                    LocalDate.of(2023, 6, 16)
            );

            Long 반려_식물_ID = 반려_식물_등록_요청(petPlantCreateRequest);

            ReminderCreateRequest request = ReminderCreateRequest.builder()
                    .waterDate(LocalDate.of(2023, 7, 1))
                    .build();

            RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    .header("Authorization", member.getEmail())
                    .when()
                    .post("/reminders/{id}", 반려_식물_ID)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.NO_CONTENT.value());

            PetPlantResponse response = 반려_식물_단건_조회(반려_식물_ID);

            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response.getLastWaterDate()).isEqualTo(request.getWaterDate());
                softly.assertThat(response.getNextWaterDate())
                        .isEqualTo(request.getWaterDate().plusDays(petPlantCreateRequest.getWaterCycle()));
            });
        }

        @Test
        void 물주는_날짜가_오늘_이후면_400_반환() {
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            PetPlantCreateRequest petPlantCreateRequest = generatePetPlantRequestByLastWaterDate(
                    dictionaryPlant.getId(),
                    LocalDate.of(2023, 6, 16)
            );

            Long 반려_식물_ID = 반려_식물_등록_요청(petPlantCreateRequest);

            ReminderCreateRequest request = ReminderCreateRequest.builder()
                    .waterDate(LocalDate.now().plusDays(3))
                    .build();

            GlobalExceptionResponse response = RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    .header("Authorization", member.getEmail())
                    .when()
                    .post("/reminders/{id}", 반려_식물_ID)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .extract().as(GlobalExceptionResponse.class);

            Assertions.assertThat(response.getMessage())
                    .contains("오늘 이후 날짜에 물을 줄 수는 없습니다.");
        }

        @Test
        void 물주는_날짜가_마지막으로_물을_준_날과_같으면_400_반환() {
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            PetPlantCreateRequest petPlantCreateRequest = generatePetPlantRequestByLastWaterDate(
                    dictionaryPlant.getId(),
                    LocalDate.of(2023, 6, 16)
            );

            Long 반려_식물_ID = 반려_식물_등록_요청(petPlantCreateRequest);

            ReminderCreateRequest request = ReminderCreateRequest.builder()
                    .waterDate(petPlantCreateRequest.getLastWaterDate())
                    .build();

            GlobalExceptionResponse response = RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    .header("Authorization", member.getEmail())
                    .when()
                    .post("/reminders/{id}", 반려_식물_ID)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .extract().as(GlobalExceptionResponse.class);

            Assertions.assertThat(response.getMessage())
                    .contains("마지막으로 물을 준 날짜와 그 이전 날짜에는 물을 줄 수는 없습니다.");
        }

        @Test
        void 물주는_날짜가_마지막으로_물을_준_날_이전이면_400_반환() {
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            PetPlantCreateRequest petPlantCreateRequest = generatePetPlantRequestByLastWaterDate(
                    dictionaryPlant.getId(),
                    LocalDate.of(2023, 6, 16)
            );

            Long 반려_식물_ID = 반려_식물_등록_요청(petPlantCreateRequest);

            ReminderCreateRequest request = ReminderCreateRequest.builder()
                    .waterDate(petPlantCreateRequest.getLastWaterDate().minusDays(3))
                    .build();

            GlobalExceptionResponse response = RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    .header("Authorization", member.getEmail())
                    .when()
                    .post("/reminders/{id}", 반려_식물_ID)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .extract().as(GlobalExceptionResponse.class);

            Assertions.assertThat(response.getMessage())
                    .contains("마지막으로 물을 준 날짜와 그 이전 날짜에는 물을 줄 수는 없습니다.");
        }
    }

    @Nested
    class 날짜_변경_수행_시_ {

        @Test
        void 존재하지_않는_사용자라면_400_반환() {
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            Long 반려_식물_ID = 반려_식물_등록_요청(generatePetPlantCreateRequest(dictionaryPlant.getId()));
            ReminderUpdateRequest request = 리마인더_미루기_요청;

            RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    .header("Authorization", "invalidMember")
                    .when()
                    .patch("/reminders/{petPlantId}", 반려_식물_ID)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value());
        }

        @Test
        void 존재하지_않는_반려_식물이라면_404_반환() {
            ReminderUpdateRequest request = 리마인더_미루기_요청;

            GlobalExceptionResponse response = RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    .header("Authorization", member.getEmail())
                    .when()
                    .patch("/reminders/{petPlantId}", 1)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.NOT_FOUND.value())
                    .extract().as(GlobalExceptionResponse.class);

            assertThat(response.getMessage())
                    .contains("일치하는 반려 식물이 존재하지 않습니다.");
        }

        @Test
        void 잘못된_반려_식물_ID_라면_400_반환() {
            ReminderUpdateRequest request = 리마인더_미루기_요청;

            GlobalExceptionResponse response = RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    .header("Authorization", member.getEmail())
                    .when()
                    .patch("/reminders/{id}", -1)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .extract().as(GlobalExceptionResponse.class);

            assertThat(response.getMessage())
                    .contains("반려 식물 ID는 1이상의 값이어야 합니다.");
        }

        @Test
        void 반려_식물의_다음_물주기_날짜_변경() {
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
                    .header("Authorization", member.getEmail())
                    .when()
                    .patch("/reminders/{id}", 반려_식물_ID)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.NO_CONTENT.value());

            PetPlantResponse response = 반려_식물_단건_조회(반려_식물_ID);

            assertThat(response.getNextWaterDate())
                    .isEqualTo(request.getNextWaterDate());
        }

        @Test
        void 변경_일자가_오늘이면_400_반환() {
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            PetPlantCreateRequest petPlantCreateRequest = generatePetPlantRequestByLastWaterDate(
                    dictionaryPlant.getId(),
                    LocalDate.of(2023, 6, 16)
            );

            Long 반려_식물_ID = 반려_식물_등록_요청(petPlantCreateRequest);

            ReminderUpdateRequest request = ReminderUpdateRequest.builder()
                    .nextWaterDate(LocalDate.now())
                    .build();

            GlobalExceptionResponse response = RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    .header("Authorization", member.getEmail())
                    .when()
                    .patch("/reminders/{id}", 반려_식물_ID)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .extract().as(GlobalExceptionResponse.class);

            Assertions.assertThat(response.getMessage())
                    .contains("오늘과 그 이전 날짜로 물주기 날짜를 변경할 수는 없습니다.");
        }

        @Test
        void 변경_일자가_오늘이전_날짜면_400_반환() {
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            PetPlantCreateRequest petPlantCreateRequest = generatePetPlantRequestByLastWaterDate(
                    dictionaryPlant.getId(),
                    LocalDate.of(2023, 6, 16)
            );

            Long 반려_식물_ID = 반려_식물_등록_요청(petPlantCreateRequest);

            ReminderUpdateRequest request = ReminderUpdateRequest.builder()
                    .nextWaterDate(LocalDate.now().minusDays(3))
                    .build();

            GlobalExceptionResponse response = RestAssured
                    .given()
                    .contentType(ContentType.JSON)
                    .body(request)
                    .log().all()
                    .header("Authorization", member.getEmail())
                    .when()
                    .patch("/reminders/{id}", 반려_식물_ID)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .extract().as(GlobalExceptionResponse.class);

            Assertions.assertThat(response.getMessage())
                    .contains("오늘과 그 이전 날짜로 물주기 날짜를 변경할 수는 없습니다.");
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
                .birthDate(LocalDate.now())
                .lastWaterDate(lastWaterDate)
                .build();
    }
}
