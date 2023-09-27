package com.official.pium.service;

import static com.official.pium.fixture.PetPlantFixture.REQUEST.피우미_수정_요청;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.atLeastOnce;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.official.pium.IntegrationTest;
import com.official.pium.domain.DictionaryPlant;
import com.official.pium.domain.HistoryType;
import com.official.pium.domain.Member;
import com.official.pium.domain.PetPlant;
import com.official.pium.fixture.FileFixture;
import com.official.pium.repository.HistoryRepository;
import com.official.pium.repository.PetPlantRepository;
import com.official.pium.service.dto.DataResponse;
import com.official.pium.service.dto.PetPlantCreateRequest;
import com.official.pium.service.dto.PetPlantResponse;
import com.official.pium.service.dto.PetPlantUpdateRequest;
import com.official.pium.service.dto.ReminderCreateRequest;
import com.official.pium.service.dto.SinglePetPlantResponse;
import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.multipart.MultipartFile;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class PetPlantServiceTest extends IntegrationTest {

    private Member member;
    private DictionaryPlant dictionaryPlant;

    @Autowired
    private PetPlantService petPlantService;

    @Autowired
    private ReminderService reminderService;

    @Autowired
    private PetPlantRepository petPlantRepository;

    @Autowired
    private HistoryRepository historyRepository;

    @MockBean
    private AmazonS3 amazonS3;

    @BeforeEach
    void setUp() {
        dictionaryPlant = dictionaryPlantSupport.builder().build();
        member = memberSupport.builder().build();
        for (HistoryType type : HistoryType.values()) {
            historyCategorySupport.builder()
                    .historyType(type)
                    .build();
        }
    }

    @Nested
    class 반려_식물_등록_시 {

        @Test
        void 사진이_없으면_사전_식물_이미지를_사용하며_등록() {
            PetPlantCreateRequest request = PetPlantCreateRequest.builder()
                    .dictionaryPlantId(dictionaryPlant.getId())
                    .nickname("피우미")
                    .location("베란다")
                    .flowerpot("플라스틱 화분")
                    .waterCycle(3)
                    .light("빛 많이 필요함")
                    .wind("바람이 잘 통하는 곳")
                    .birthDate(LocalDate.of(2021, 3, 5))
                    .lastWaterDate(LocalDate.of(2020, 2, 1))
                    .build();

            PetPlantResponse petPlantResponse = petPlantService.create(request, null, member);

            assertSoftly(softly -> {
                assertThat(petPlantRepository.findById(petPlantResponse.getId())).isNotEmpty();
                assertThat(petPlantResponse.getImageUrl()).isEqualTo(dictionaryPlant.getImageUrl());
            });
        }

        @Test
        void 사용자가_추가한_사진으로_반려_식물_등록() {
            PetPlantCreateRequest request = PetPlantCreateRequest.builder()
                    .dictionaryPlantId(dictionaryPlant.getId())
                    .nickname("피우미")
                    .location("베란다")
                    .flowerpot("플라스틱 화분")
                    .waterCycle(3)
                    .light("빛 많이 필요함")
                    .wind("바람이 잘 통하는 곳")
                    .birthDate(LocalDate.of(2021, 3, 5))
                    .lastWaterDate(LocalDate.of(2020, 2, 1))
                    .build();
            MultipartFile multipartFile = FileFixture.generateMultiPartFile();
            given(amazonS3.putObject(any(PutObjectRequest.class)))
                    .willReturn(new PutObjectResult());

            PetPlantResponse petPlantResponse = petPlantService.create(request, multipartFile, member);

            assertThat(petPlantRepository.findById(petPlantResponse.getId())).isNotEmpty();
        }

        @Test
        void 존재하지_않는_사전_식물을_참조하면_예외_발생() {
            long wrongId = 100L;
            PetPlantCreateRequest request = PetPlantCreateRequest.builder()
                    .dictionaryPlantId(wrongId)
                    .nickname("피우미")
                    .location("베란다")
                    .flowerpot("플라스틱 화분")
                    .waterCycle(3)
                    .light("빛 많이 필요함")
                    .wind("바람이 잘 통하는 곳")
                    .birthDate(LocalDate.of(1999, 2, 3))
                    .lastWaterDate(LocalDate.of(1999, 3, 4))
                    .build();

            assertThatThrownBy(() -> petPlantService.create(request, null, member))
                    .isInstanceOf(NoSuchElementException.class)
                    .hasMessage("사전 식물이 존재하지 않습니다. id: " + wrongId);
        }

        @Test
        void 존재하지_않는_반려_식물을_조회하면_예외_발생() {
            Long wrongId = -1L;

            assertThatThrownBy(() -> petPlantService.read(wrongId, member))
                    .isInstanceOf(NoSuchElementException.class)
                    .hasMessage("일치하는 반려 식물이 존재하지 않습니다. id: " + wrongId);
        }
    }

    @Nested
    class 반려_식물_조회_시 {

        @Test
        void 단건_조회() {
            PetPlant petPlant = petPlantSupport.builder().member(member).build();

            PetPlantResponse petPlantResponse = petPlantService.read(petPlant.getId(), member);

            assertAll(
                    () -> assertThat(petPlantResponse.getId()).isEqualTo(petPlant.getId()),
                    () -> assertThat(petPlantResponse.getNickname()).isEqualTo(petPlant.getNickname())
            );
        }

        @Test
        void 주인이_아니면_예외_발생() {
            Member otherMember = memberSupport.builder().kakaoId(54321L).build();
            PetPlant petPlant = petPlantSupport.builder().member(member).build();

            assertThatThrownBy(() -> petPlantService.read(petPlant.getId(), otherMember))
                    .isInstanceOf(IllegalArgumentException.class)
                    .hasMessage("요청 사용자와 반려 식물의 사용자가 일치하지 않습니다. memberId: " + otherMember.getId());
        }

        @Test
        void 반려_식물_전체_조회() {
            petPlantRepository.save(petPlantSupport.builder().member(member).build());

            DataResponse<List<SinglePetPlantResponse>> response = petPlantService.readAll(member);

            List<SinglePetPlantResponse> data = response.getData();
            assertThat(data).isNotEmpty();
        }
    }

    @Nested
    class 반려_식물_수정_시 {

        @Test
        void 정보_수정() {
            PetPlant petPlant = petPlantSupport.builder().member(member).build();
            String petPlantImageUrl = petPlant.getImageUrl();

            PetPlantUpdateRequest updateRequest = 피우미_수정_요청;
            MultipartFile multipartFile = FileFixture.generateMultiPartFile();
            given(amazonS3.putObject(any(PutObjectRequest.class)))
                    .willReturn(new PutObjectResult());

            petPlantService.update(petPlant.getId(), updateRequest, multipartFile, member);
            PetPlant updatedPetPlant = petPlantRepository.findById(petPlant.getId()).get();

            assertSoftly(
                    softly -> {
                        assertThat(updatedPetPlant.getId()).isEqualTo(petPlant.getId());
                        assertThat(updatedPetPlant.getNickname()).isEqualTo(updateRequest.getNickname());
                        assertThat(updatedPetPlant.getFlowerpot()).isEqualTo(updateRequest.getFlowerpot());
                        assertThat(updatedPetPlant.getLight()).isEqualTo(updateRequest.getLight());
                        assertThat(updatedPetPlant.getWind()).isEqualTo(updateRequest.getWind());
                        assertThat(updatedPetPlant.getWaterCycle()).isEqualTo(updateRequest.getWaterCycle());
                        assertThat(updatedPetPlant.getBirthDate()).isEqualTo(updateRequest.getBirthDate());
                        assertThat(updatedPetPlant.getLastWaterDate()).isEqualTo(updateRequest.getLastWaterDate());
                        assertThat(updatedPetPlant.getImageUrl()).isNotEqualTo(petPlantImageUrl);
                    }
            );
        }

        @Test
        void 이미지_수정_요청_시_기존_이미지_제거() {
            PetPlant petPlant = petPlantRepository.save(PetPlant.builder()
                    .birthDate(LocalDate.now())
                    .member(member)
                    .dictionaryPlant(dictionaryPlant)
                    .flowerpot("유리")
                    .imageUrl("https://test.image.storage/test/test/34234.jpg")
                    .wind("바람이 안 통해요")
                    .light("일반 조명")
                    .lastWaterDate(LocalDate.now())
                    .nextWaterDate(LocalDate.now())
                    .waterCycle(3)
                    .nickname("피우미")
                    .location("거실")
                    .build());
            PetPlantUpdateRequest updateRequest = 피우미_수정_요청;
            MultipartFile multipartFile = FileFixture.generateMultiPartFile();
            given(amazonS3.putObject(any(PutObjectRequest.class)))
                    .willReturn(new PutObjectResult());

            petPlantService.update(petPlant.getId(), updateRequest, multipartFile, member);

            assertSoftly(
                    softly -> {
                        verify(amazonS3, atLeastOnce()).putObject(any());
                        verify(amazonS3, atLeastOnce()).deleteObject(any(), anyString());
                    }
            );
        }

        @Test
        void 이미지_없이_요청하면_기존_이미지_사용() {
            PetPlant petPlant = petPlantSupport.builder().member(member).build();
            String petPlantImageUrl = petPlant.getImageUrl();

            PetPlantUpdateRequest updateRequest = 피우미_수정_요청;
            given(amazonS3.putObject(any(PutObjectRequest.class)))
                    .willReturn(new PutObjectResult());

            petPlantService.update(petPlant.getId(), updateRequest, null, member);
            PetPlant updatedPetPlant = petPlantRepository.findById(petPlant.getId()).get();

            assertSoftly(
                    softly -> {
                        assertThat(updatedPetPlant.getImageUrl()).isEqualTo(petPlantImageUrl);
                        verify(amazonS3, never()).putObject(any());
                        verify(amazonS3, never()).deleteObject(any(), anyString());
                    }
            );
        }

        @Test
        void 기존_이미지가_사전_식물_이미지면_제거하지_않음() {
            PetPlant petPlant = petPlantRepository.save(PetPlant.builder()
                    .birthDate(LocalDate.now())
                    .member(member)
                    .dictionaryPlant(dictionaryPlant)
                    .flowerpot("유리")
                    .imageUrl("static/dictionary-plant/34234.jpg")
                    .wind("바람이 안 통해요")
                    .light("일반 조명")
                    .lastWaterDate(LocalDate.now())
                    .nextWaterDate(LocalDate.now())
                    .waterCycle(3)
                    .nickname("피우미")
                    .location("거실")
                    .build());

            PetPlantUpdateRequest updateRequest = 피우미_수정_요청;
            given(amazonS3.putObject(any(PutObjectRequest.class)))
                    .willReturn(new PutObjectResult());

            MultipartFile multipartFile = FileFixture.generateMultiPartFile();

            petPlantService.update(petPlant.getId(), updateRequest, multipartFile, member);

            assertSoftly(
                    softly -> {
                        verify(amazonS3, atLeastOnce()).putObject(any());
                        verify(amazonS3, never()).deleteObject(any(), anyString());
                    }
            );
        }

        @Test
        void 주인이_아니면_예외_발생() {
            Member otherMember = memberSupport.builder().kakaoId(54321L).build();
            PetPlant petPlant = petPlantSupport.builder().member(member).build();
            PetPlantUpdateRequest updateRequest = 피우미_수정_요청;

            assertThatThrownBy(() -> petPlantService.update(petPlant.getId(), updateRequest, null, otherMember))
                    .isInstanceOf(IllegalArgumentException.class)
                    .hasMessage("요청 사용자와 반려 식물의 사용자가 일치하지 않습니다. memberId: " + otherMember.getId());
        }

        @Test
        void 존재하지_않는_반려_식물을_수정하면_예외_발생() {
            Long wrongId = -1L;
            PetPlantUpdateRequest updateRequest = 피우미_수정_요청;

            assertThatThrownBy(() -> petPlantService.update(wrongId, updateRequest, null, member))
                    .isInstanceOf(NoSuchElementException.class)
                    .hasMessage("일치하는 반려 식물이 존재하지 않습니다. id: " + wrongId);
        }

        @Test
        void 마지막으로_물준_날짜가_직전값과_같으면_예외_발생() {
            LocalDate baseDate = LocalDate.of(2022, 3, 4);
            PetPlant petPlant = petPlantSupport.builder()
                    .member(member)
                    .lastWaterDate(baseDate)
                    .build();
            historySupport.builder().petPlant(petPlant).build();

            LocalDate firstDate = petPlant.getLastWaterDate().plusDays(1);
            ReminderCreateRequest createRequest = ReminderCreateRequest.builder()
                    .waterDate(firstDate)
                    .build();

            reminderService.water(createRequest, petPlant.getId(), member);

            LocalDate secondDate = firstDate.plusDays(1);
            ReminderCreateRequest createRequest2 = ReminderCreateRequest.builder()
                    .waterDate(secondDate)
                    .build();

            reminderService.water(createRequest2, petPlant.getId(), member);

            PetPlantUpdateRequest updateRequest = PetPlantUpdateRequest.builder()
                    .nickname("피우미 2")
                    .location("침대 옆")
                    .flowerpot("유리병")
                    .waterCycle(10)
                    .light("빛 많이 필요함")
                    .wind("바람이 잘 통하는 곳")
                    .birthDate(LocalDate.now())
                    .lastWaterDate(firstDate)
                    .build();

            assertThatThrownBy(() -> petPlantService.update(petPlant.getId(), updateRequest, null, member))
                    .isInstanceOf(IllegalArgumentException.class)
                    .hasMessage("마지막으로 물 준 날짜는 직전 값과 같거나 이전일 수 없습니다. date: " + updateRequest.getLastWaterDate());
        }

        @Test
        void 마지막으로_물준_날짜가_직전값보다_이전이면_예외_발생() {
            LocalDate baseDate = LocalDate.of(2022, 3, 4);
            PetPlant petPlant = petPlantSupport.builder()
                    .member(member)
                    .lastWaterDate(baseDate)
                    .build();

            LocalDate firstDate = petPlant.getLastWaterDate().plusDays(1);
            ReminderCreateRequest createRequest = ReminderCreateRequest.builder()
                    .waterDate(firstDate)
                    .build();

            reminderService.water(createRequest, petPlant.getId(), member);

            LocalDate secondDate = firstDate.plusDays(1);
            ReminderCreateRequest createRequest2 = ReminderCreateRequest.builder()
                    .waterDate(secondDate)
                    .build();

            reminderService.water(createRequest2, petPlant.getId(), member);

            PetPlantUpdateRequest updateRequest = PetPlantUpdateRequest.builder()
                    .nickname("피우미 2")
                    .location("침대 옆")
                    .flowerpot("유리병")
                    .waterCycle(10)
                    .light("빛 많이 필요함")
                    .wind("바람이 잘 통하는 곳")
                    .birthDate(LocalDate.now())
                    .lastWaterDate(firstDate.minusDays(5))
                    .build();

            assertThatThrownBy(() -> petPlantService.update(petPlant.getId(), updateRequest, null, member))
                    .isInstanceOf(IllegalArgumentException.class)
                    .hasMessage("마지막으로 물 준 날짜는 직전 값과 같거나 이전일 수 없습니다. date: " + updateRequest.getLastWaterDate());
        }
    }

    @Nested
    class 반려_식물_삭제_시 {

        @Test
        void 단건_삭제() {
            PetPlant petPlant = petPlantSupport.builder().member(member).build();

            assertDoesNotThrow(() -> petPlantService.delete(petPlant.getId(), member));
        }

        @Test
        void 히스토리도_함께_삭제된다() {
            PetPlant petPlant = petPlantSupport.builder().dictionaryPlant(dictionaryPlant).member(member).build();
            historySupport.builder().petPlant(petPlant).build();
            historySupport.builder().petPlant(petPlant).build();
            PageRequest pageRequest = PageRequest.of(1, 10);

            petPlantService.delete(petPlant.getId(), member);

            assertSoftly(
                    softly -> {
                        softly.assertThat(petPlantRepository.findById(petPlant.getId())).isEmpty();
                        softly.assertThat(
                                        historyRepository.findAllByPetPlantId(petPlant.getId(), pageRequest).getContent())
                                .isEmpty();
                    }
            );
        }

        @Test
        void 존재하지_않는_반려_식물을_삭제하면_예외_발생() {
            Long wrongId = -1L;

            assertThatThrownBy(() -> petPlantService.delete(wrongId, member))
                    .isInstanceOf(NoSuchElementException.class)
                    .hasMessage("일치하는 반려 식물이 존재하지 않습니다. id: " + wrongId);
        }

        @Test
        void 주인이_아니면_예외_발생() {
            Member otherMember = memberSupport.builder().kakaoId(54321L).build();
            PetPlant petPlant = petPlantSupport.builder().member(member).build();

            assertThatThrownBy(() -> petPlantService.delete(petPlant.getId(), otherMember))
                    .isInstanceOf(IllegalArgumentException.class)
                    .hasMessage("요청 사용자와 반려 식물의 사용자가 일치하지 않습니다. memberId: " + otherMember.getId());
        }
    }
}
