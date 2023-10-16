package com.official.pium.acceptance;

import static com.official.pium.fixture.PetPlantFixture.REQUEST;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.hamcrest.Matchers.containsString;

import com.official.pium.AcceptanceTest;
import com.official.pium.domain.DictionaryPlant;
import com.official.pium.domain.Member;
import com.official.pium.domain.PetPlant;
import com.official.pium.service.dto.PetPlantCreateRequest;
import com.official.pium.service.dto.PetPlantResponse;
import com.official.pium.service.dto.PetPlantUpdateRequest;
import com.official.pium.service.dto.ReminderCreateRequest;
import io.restassured.RestAssured;
import io.restassured.builder.MultiPartSpecBuilder;
import io.restassured.http.ContentType;
import io.restassured.mapper.ObjectMapperType;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import io.restassured.specification.MultiPartSpecification;
import java.time.LocalDate;
import java.util.List;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class PetPlantApiTest extends AcceptanceTest {

    @Nested
    class 반려_식물_등록_시_ {

        @Test
        void 존재하지_않는_사용자라면_404_반환() {
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            PetPlantCreateRequest request = REQUEST.generatePetPlantCreateRequest(dictionaryPlant.getId());
            MultiPartSpecification multipartData = getMultiPartSpecification(request);
            String invalidSessionId = "invalidSessionId";

            RestAssured
                    .given()
                    .contentType(MediaType.MULTIPART_FORM_DATA_VALUE)
                    .multiPart(multipartData)
                    .log().all()
                    .sessionId(invalidSessionId)
                    .when()
                    .post("/pet-plants")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.UNAUTHORIZED.value())
                    .assertThat().body("message", containsString("로그인이 필요합니다"));
        }

        @Test
        void 존재하지_않는_사전_식물을_참조하면_404_반환() {
            PetPlantCreateRequest request = REQUEST.generatePetPlantCreateRequest(3L);
            MultiPartSpecification multipartData = getMultiPartSpecification(request);
            String sessionId = 로그인_요청();

            RestAssured
                    .given()
                    .contentType(MediaType.MULTIPART_FORM_DATA_VALUE)
                    .multiPart(multipartData)
                    .log().all()
                    .sessionId(sessionId)
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
                softly.assertThat(response.jsonPath().getString("birthDate"))
                        .isEqualTo(request.getBirthDate().toString());
                softly.assertThat(response.jsonPath().getString("lastWaterDate"))
                        .isEqualTo(request.getLastWaterDate().toString());
                softly.assertThat(
                        response.jsonPath().getObject("dictionaryPlant", PetPlantResponse.DictionaryPlantResponse.class)
                                .getId()).isEqualTo(request.getDictionaryPlantId());
            });
        }

        @Test
        void 마지막으로_물_준_날짜가_오늘_이후면_400_반환() {
            String sessionId = 로그인_요청();
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            PetPlantCreateRequest request = PetPlantCreateRequest.builder()
                    .dictionaryPlantId(dictionaryPlant.getId())
                    .nickname("피우미")
                    .location("베란다 앞")
                    .flowerpot("플라스틱 화분")
                    .waterCycle(3)
                    .light("빛 많이")
                    .wind("바람 많이")
                    .birthDate(LocalDate.of(2020, 1, 3))
                    .lastWaterDate(LocalDate.now().plusDays(2))
                    .build();
            MultiPartSpecification multipartData = getMultiPartSpecification(request);

            RestAssured
                    .given()
                    .contentType(MediaType.MULTIPART_FORM_DATA_VALUE)
                    .multiPart(multipartData)
                    .log().all()
                    .sessionId(sessionId)
                    .when()
                    .post("/pet-plants")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .assertThat().body("message", containsString("마지막 물주기 날짜는 과거 또는 현재의 날짜여야 합니다."));
        }

        @Test
        void 생일이_오늘_이후면_400_반환() {
            String sessionId = 로그인_요청();

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
                    .lastWaterDate(LocalDate.of(2022, 2, 3))
                    .build();
            MultiPartSpecification multipartData = getMultiPartSpecification(request);

            RestAssured
                    .given()
                    .contentType(MediaType.MULTIPART_FORM_DATA_VALUE)
                    .multiPart(multipartData)
                    .log().all()
                    .sessionId(sessionId)
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
        void 존재하지_않는_사용자라면_401_반환() {
            String invalidSessionId = "invalidSessionId";

            PetPlant petPlant = petPlantSupport.builder().build();

            RestAssured
                    .given()
                    .log().all()
                    .sessionId(invalidSessionId)
                    .when()
                    .get("/pet-plants/{id}", petPlant.getId())
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.UNAUTHORIZED.value())
                    .assertThat().body("message", containsString("로그인이 필요합니다"));
        }

        @Test
        void 본인의_반려_식물이_아니라면_400_반환() {
            String sessionId = 로그인_요청();

            PetPlant petPlant = petPlantSupport.builder().build();

            RestAssured
                    .given()
                    .log().all()
                    .sessionId(sessionId)
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
                softly.assertThat(response.jsonPath().getString("birthDate"))
                        .isEqualTo(request.getBirthDate().toString());
                softly.assertThat(response.jsonPath().getString("lastWaterDate"))
                        .isEqualTo(request.getLastWaterDate().toString());
                softly.assertThat(
                        response.jsonPath().getObject("dictionaryPlant", PetPlantResponse.DictionaryPlantResponse.class)
                                .getId()).isEqualTo(request.getDictionaryPlantId());
            });
        }

        @Test
        void 물주기를_1번_이상_수행하면_secondLastWaterDate_반환() {
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            PetPlantCreateRequest request = REQUEST.generatePetPlantCreateRequest(dictionaryPlant.getId());

            Long 반려_식물_ID = 반려_식물_등록_요청(request);

            ExtractableResponse<Response> response = 반려_식물_단건_조회(반려_식물_ID);

            LocalDate lastWaterDate = LocalDate.parse(response.jsonPath().getString("lastWaterDate")).plusDays(2);
            반려_식물_물주기(반려_식물_ID, lastWaterDate);

            ExtractableResponse<Response> responseRecent = 반려_식물_단건_조회(반려_식물_ID);

            assertSoftly(softly -> {
                softly.assertThat(responseRecent.jsonPath().getString("nickname")).isEqualTo(request.getNickname());
                softly.assertThat(responseRecent.jsonPath().getString("location")).isEqualTo(request.getLocation());
                softly.assertThat(responseRecent.jsonPath().getString("flowerpot")).isEqualTo(request.getFlowerpot());
                softly.assertThat(responseRecent.jsonPath().getString("light")).isEqualTo(request.getLight());
                softly.assertThat(responseRecent.jsonPath().getString("wind")).isEqualTo(request.getWind());
                softly.assertThat(responseRecent.jsonPath().getInt("waterCycle")).isEqualTo(request.getWaterCycle());
                softly.assertThat(responseRecent.jsonPath().getString("birthDate"))
                        .isEqualTo(request.getBirthDate().toString());
                softly.assertThat(responseRecent.jsonPath().getString("lastWaterDate"))
                        .isEqualTo(lastWaterDate.toString());
                softly.assertThat(responseRecent.jsonPath().getString("secondLastWaterDate"))
                        .isEqualTo(request.getLastWaterDate().toString());
                softly.assertThat(
                        responseRecent.jsonPath()
                                .getObject("dictionaryPlant", PetPlantResponse.DictionaryPlantResponse.class)
                                .getId()).isEqualTo(request.getDictionaryPlantId());
            });
        }

        @Test
        void 물주기를_수행하지_않으면_secondLastWaterDate_Null_반환() {
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
                softly.assertThat(response.jsonPath().getString("birthDate"))
                        .isEqualTo(request.getBirthDate().toString());
                softly.assertThat(response.jsonPath().getString("lastWaterDate"))
                        .isEqualTo(request.getLastWaterDate().toString());
                softly.assertThat(response.jsonPath().getString("secondLastWaterDate"))
                        .isNull();
                softly.assertThat(
                        response.jsonPath().getObject("dictionaryPlant", PetPlantResponse.DictionaryPlantResponse.class)
                                .getId()).isEqualTo(request.getDictionaryPlantId());
            });
        }

        @Test
        void 존재하지_않는_반려_식물이라면_404_반환() {
            String sessionId = 로그인_요청();

            RestAssured
                    .given()
                    .log().all()
                    .sessionId(sessionId)
                    .when()
                    .get("/pet-plants/{id}", 1)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.NOT_FOUND.value())
                    .assertThat().body("message", containsString("일치하는 반려 식물이 존재하지 않습니다."));
        }

        @Test
        void 잘못된_반려_식물_ID_라면_400_반환() {
            String sessionId = 로그인_요청();

            long invalidId = -1;

            RestAssured
                    .given()
                    .log().all()
                    .sessionId(sessionId)
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
        void 존재하지_않는_사용자라면_401_반환() {
            String invalidSessionId = "invalidSessionId";

            RestAssured
                    .given()
                    .log().all()
                    .sessionId(invalidSessionId)
                    .when()
                    .get("/pet-plants")
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.UNAUTHORIZED.value())
                    .assertThat().body("message", containsString("로그인이 필요합니다"));
        }

        @Test
        void 반려_식물_목록_정보_반환() {
            String sessionId = 로그인_요청();

            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            PetPlantCreateRequest request = REQUEST.generatePetPlantCreateRequest(dictionaryPlant.getId());
            PetPlantCreateRequest request2 = REQUEST.generatePetPlantCreateRequest(dictionaryPlant.getId());

            Long 반려_식물_ID = 반려_식물_등록_요청(request);
            Long 반려_식물2_ID = 반려_식물_등록_요청(request2);

            ExtractableResponse<Response> response = RestAssured
                    .given()
                    .log().all()
                    .sessionId(sessionId)
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
            String sessionId = 로그인_요청();

            ExtractableResponse<Response> response = RestAssured
                    .given()
                    .log().all()
                    .sessionId(sessionId)
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
        void 존재하지_않는_사용자라면_401_반환() {
            String invalidSessionId = "invalidSessionId";

            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            PetPlant petPlant = petPlantSupport.builder()
                    .dictionaryPlant(dictionaryPlant)
                    .build();

            PetPlantUpdateRequest request = REQUEST.피우미_수정_요청;
            MultiPartSpecification multipartData = getMultiPartSpecification(request);

            RestAssured
                    .given()
                    .contentType(MediaType.MULTIPART_FORM_DATA_VALUE)
                    .multiPart(multipartData)
                    .log().all()
                    .sessionId(invalidSessionId)
                    .when()
                    .patch("/pet-plants/{id}", petPlant.getId())
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.UNAUTHORIZED.value())
                    .assertThat().body("message", containsString("로그인이 필요합니다"));
        }

        @Test
        void 본인의_반려_식물이_아니라면_400_반환() {
            String sessionId = 로그인_요청();

            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            PetPlant petPlant = petPlantSupport.builder()
                    .member(member)
                    .dictionaryPlant(dictionaryPlant)
                    .build();

            PetPlantUpdateRequest request = REQUEST.피우미_수정_요청;
            MultiPartSpecification multipartData = getMultiPartSpecification(request);

            RestAssured
                    .given()
                    .contentType(MediaType.MULTIPART_FORM_DATA_VALUE)
                    .multiPart(multipartData)
                    .log().all()
                    .sessionId(sessionId)
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
            Member newMember = memberSupport.builder().kakaoId(54321L).build();
            String sessionId = 로그인_요청();

            PetPlant petPlant = petPlantSupport.builder()
                    .member(newMember)
                    .dictionaryPlant(dictionaryPlant)
                    .build();

            PetPlantUpdateRequest request = REQUEST.피우미_수정_요청;
            MultiPartSpecification multipartData = getMultiPartSpecification(request);

            RestAssured
                    .given()
                    .contentType(MediaType.MULTIPART_FORM_DATA_VALUE)
                    .multiPart(multipartData)
                    .log().all()
                    .sessionId(sessionId)
                    .when()
                    .patch("/pet-plants/{id}", petPlant.getId())
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.OK.value());

            ExtractableResponse<Response> response = 반려_식물_단건_조회(petPlant.getId());

            assertSoftly(softly -> {
                softly.assertThat(response.jsonPath().getString("nickname")).isEqualTo(request.getNickname());
                softly.assertThat(response.jsonPath().getString("flowerpot")).isEqualTo(request.getFlowerpot());
                softly.assertThat(response.jsonPath().getString("location")).isEqualTo(request.getLocation());
                softly.assertThat(response.jsonPath().getInt("waterCycle")).isEqualTo(request.getWaterCycle());
                softly.assertThat(response.jsonPath().getString("light")).isEqualTo(request.getLight());
                softly.assertThat(response.jsonPath().getString("wind")).isEqualTo(request.getWind());
                softly.assertThat(response.jsonPath().getString("birthDate"))
                        .isEqualTo(request.getBirthDate().toString());
                softly.assertThat(response.jsonPath().getString("lastWaterDate"))
                        .isEqualTo(request.getLastWaterDate().toString());
            });
        }

        @Test
        void 수정_요청_시_변경된_정보만_반영() {
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            PetPlantCreateRequest createRequest = REQUEST.generatePetPlantCreateRequest(dictionaryPlant.getId());
            Long 반려_식물_ID = 반려_식물_등록_요청(createRequest);
            String sessionId = 로그인_요청();

            PetPlantUpdateRequest request = REQUEST.generatePetPlantUpdateRequest(
                    createRequest.getLastWaterDate().plusDays(2));
            MultiPartSpecification multipartData = getMultiPartSpecification(request);

            RestAssured
                    .given()
                    .contentType(MediaType.MULTIPART_FORM_DATA_VALUE)
                    .multiPart(multipartData)
                    .log().all()
                    .sessionId(sessionId)
                    .when()
                    .patch("/pet-plants/{id}", 반려_식물_ID)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.OK.value());

            ExtractableResponse<Response> petPlantResponse = 반려_식물_단건_조회(반려_식물_ID);

            String lastWaterDate = petPlantResponse.jsonPath().getString("lastWaterDate");

            // lastWaterDate 만 변경되지 않음
            PetPlantUpdateRequest request2 = PetPlantUpdateRequest.builder()
                    .nickname("ttttestttt")
                    .flowerpot("ttttestttt")
                    .location("ttttestttt")
                    .waterCycle(44)
                    .light("ttttestttt")
                    .wind("ttttestttt")
                    .birthDate(LocalDate.of(2000, 1, 3))
                    .lastWaterDate(LocalDate.parse(lastWaterDate))
                    .build();
            MultiPartSpecification data2 = getMultiPartSpecification(request2);

            RestAssured
                    .given()
                    .contentType(MediaType.MULTIPART_FORM_DATA_VALUE)
                    .multiPart(data2)
                    .log().all()
                    .sessionId(sessionId)
                    .when()
                    .patch("/pet-plants/{id}", 반려_식물_ID)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.OK.value());

            ExtractableResponse<Response> response = 반려_식물_단건_조회(반려_식물_ID);

            assertSoftly(softly -> {
                softly.assertThat(response.jsonPath().getString("nickname")).isEqualTo(request2.getNickname());
                softly.assertThat(response.jsonPath().getString("flowerpot")).isEqualTo(request2.getFlowerpot());
                softly.assertThat(response.jsonPath().getString("location")).isEqualTo(request2.getLocation());
                softly.assertThat(response.jsonPath().getInt("waterCycle")).isEqualTo(request2.getWaterCycle());
                softly.assertThat(response.jsonPath().getString("light")).isEqualTo(request2.getLight());
                softly.assertThat(response.jsonPath().getString("wind")).isEqualTo(request2.getWind());
                softly.assertThat(response.jsonPath().getString("birthDate"))
                        .isEqualTo(request2.getBirthDate().toString());
                softly.assertThat(response.jsonPath().getString("lastWaterDate"))
                        .isEqualTo(request.getLastWaterDate().toString());
            });
        }

        @Test
        void 수정_요청_정보로_업데이트시_마지막_물주기_날짜가_직전_날짜와_같으면_400_반환() {
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            Member newMember = memberSupport.builder().kakaoId(54321L).build();
            String sessionId = 로그인_요청();

            PetPlant petPlant = petPlantSupport.builder()
                    .member(newMember)
                    .dictionaryPlant(dictionaryPlant)
                    .lastWaterDate(LocalDate.of(2022, 4, 1))
                    .build();

            LocalDate firstWaterDate = petPlant.getLastWaterDate().plusDays(2);
            반려_식물_물주기(petPlant.getId(), firstWaterDate);
            LocalDate secondWaterDate = firstWaterDate.plusDays(3);
            반려_식물_물주기(petPlant.getId(), secondWaterDate);

            PetPlantUpdateRequest request = REQUEST.generatePetPlantUpdateRequest(firstWaterDate);
            MultiPartSpecification multipartData = getMultiPartSpecification(request);

            RestAssured
                    .given()
                    .contentType(MediaType.MULTIPART_FORM_DATA_VALUE)
                    .multiPart(multipartData)
                    .log().all()
                    .sessionId(sessionId)
                    .when()
                    .patch("/pet-plants/{id}", petPlant.getId())
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .body("message", containsString("마지막으로 물 준 날짜는 직전 값과 같거나 이전일 수 없습니다."));
        }

        @Test
        void 수정_요청_정보로_업데이트시_마지막_물주기_날짜가_직전_날짜보다_이전이면_400_반환() {
            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            Member newMember = memberSupport.builder().kakaoId(54321L).build();
            String sessionId = 로그인_요청();

            PetPlant petPlant = petPlantSupport.builder()
                    .member(newMember)
                    .dictionaryPlant(dictionaryPlant)
                    .lastWaterDate(LocalDate.of(2022, 4, 1))
                    .build();

            LocalDate firstWaterDate = petPlant.getLastWaterDate().plusDays(1);
            반려_식물_물주기(petPlant.getId(), firstWaterDate);
            LocalDate secondWaterDate = firstWaterDate.plusDays(3);
            반려_식물_물주기(petPlant.getId(), secondWaterDate);

            PetPlantUpdateRequest request = REQUEST.generatePetPlantUpdateRequest(firstWaterDate.minusDays(3));
            MultiPartSpecification multipartData = getMultiPartSpecification(request);

            RestAssured
                    .given()
                    .contentType(MediaType.MULTIPART_FORM_DATA_VALUE)
                    .multiPart(multipartData)
                    .log().all()
                    .sessionId(sessionId)
                    .when()
                    .patch("/pet-plants/{id}", petPlant.getId())
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .body("message", containsString("마지막으로 물 준 날짜는 직전 값과 같거나 이전일 수 없습니다."));
        }

        @Test
        void 존재하지_않는_반려_식물이라면_404_반환() {
            String sessionId = 로그인_요청();

            PetPlantUpdateRequest request = REQUEST.피우미_수정_요청;
            MultiPartSpecification multipartData = getMultiPartSpecification(request);

            RestAssured
                    .given()
                    .contentType(MediaType.MULTIPART_FORM_DATA_VALUE)
                    .multiPart(multipartData)
                    .log().all()
                    .sessionId(sessionId)
                    .when()
                    .patch("/pet-plants/{id}", 1)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.NOT_FOUND.value())
                    .assertThat().body("message", containsString("일치하는 반려 식물이 존재하지 않습니다."));
        }

        @Test
        void 잘못된_반려_식물_ID_라면_400_반환() {
            String sessionId = 로그인_요청();

            long invalidId = -1;
            PetPlantUpdateRequest request = REQUEST.피우미_수정_요청;
            MultiPartSpecification multipartData = getMultiPartSpecification(request);

            RestAssured
                    .given()
                    .contentType(MediaType.MULTIPART_FORM_DATA_VALUE)
                    .multiPart(multipartData)
                    .log().all()
                    .sessionId(sessionId)
                    .when()
                    .patch("/pet-plants/{id}", invalidId)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .assertThat().body("message", containsString("반려 식물 ID는 1이상의 값이어야 합니다."));
        }
    }

    @Nested
    class 반려_식물_삭제_시_ {

        @Test
        void 정상_삭제_후_204를_반환_및_조회_불가() {
            String sessionId = 로그인_요청();

            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            PetPlantCreateRequest request = REQUEST.generatePetPlantCreateRequest(dictionaryPlant.getId());
            Long 반려_식물_ID = 반려_식물_등록_요청(request);

            RestAssured
                    .given()
                    .log().all()
                    .sessionId(sessionId)
                    .delete("/pet-plants/{id}", 반려_식물_ID)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.NO_CONTENT.value());

            RestAssured
                    .given()
                    .log().all()
                    .sessionId(sessionId)
                    .get("/pet-plants/{id}", 반려_식물_ID)
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.NOT_FOUND.value())
                    .assertThat().body("message", containsString("일치하는 반려 식물이 존재하지 않습니다. id: " + 반려_식물_ID));
        }

        @Test
        void 존재하지_않는_사용자라면_401_반환() {
            String invalidSessionId = "invalidSessionId";

            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            PetPlant petPlant = petPlantSupport.builder()
                    .dictionaryPlant(dictionaryPlant)
                    .build();

            RestAssured
                    .given()
                    .log().all()
                    .sessionId(invalidSessionId)
                    .when()
                    .delete("/pet-plants/{id}", petPlant.getId())
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.UNAUTHORIZED.value())
                    .assertThat().body("message", containsString("로그인이 필요합니다"));
        }

        @Test
        void 본인의_반려_식물이_아니라면_400_반환() {
            String sessionId = 로그인_요청();

            DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
            PetPlant petPlant = petPlantSupport.builder()
                    .member(member)
                    .dictionaryPlant(dictionaryPlant)
                    .build();

            RestAssured
                    .given()
                    .log().all()
                    .sessionId(sessionId)
                    .when()
                    .delete("/pet-plants/{id}", petPlant.getId())
                    .then()
                    .log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .assertThat().body("message", containsString("요청 사용자와 반려 식물의 사용자가 일치하지 않습니다."));
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

        MultiPartSpecification multipartData = getMultiPartSpecification(petPlantCreateRequest);

        String petPlantId = RestAssured
                .given()
                .contentType(MediaType.MULTIPART_FORM_DATA_VALUE)
                .multiPart(multipartData)
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

    private void 반려_식물_물주기(Long petPlantId, LocalDate firstWaterDate) {
        String sessionId = 로그인_요청();
        ReminderCreateRequest request = ReminderCreateRequest.builder()
                .waterDate(firstWaterDate)
                .build();

        RestAssured
                .given()
                .contentType(ContentType.JSON)
                .body(request)
                .log().all()
                .sessionId(sessionId)
                .when()
                .post("/reminders/{id}", petPlantId)
                .then()
                .log().all()
                .statusCode(HttpStatus.NO_CONTENT.value());
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

    private MultiPartSpecification getMultiPartSpecification(Object request) {
        return new MultiPartSpecBuilder(request, ObjectMapperType.JACKSON_2)
                .controlName("request")
                .mimeType(MediaType.APPLICATION_JSON_VALUE)
                .charset("UTF-8")
                .build();
    }
}
