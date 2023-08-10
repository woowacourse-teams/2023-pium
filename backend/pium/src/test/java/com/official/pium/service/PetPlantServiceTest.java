package com.official.pium.service;

import static com.official.pium.fixture.PetPlantFixture.REQUEST.피우미_수정_요청;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

import com.official.pium.IntegrationTest;
import com.official.pium.domain.DictionaryPlant;
import com.official.pium.domain.HistoryType;
import com.official.pium.domain.Member;
import com.official.pium.domain.PetPlant;
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
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;

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

    @Test
    void 반려_식물_등록() {
        PetPlantCreateRequest request = PetPlantCreateRequest.builder()
                .dictionaryPlantId(dictionaryPlant.getId())
                .nickname("피우미")
                .location("베란다")
                .flowerpot("플라스틱 화분")
                .waterCycle(3)
                .light("빛 많이 필요함")
                .wind("바람이 잘 통하는 곳")
                .birthDate(LocalDate.now())
                .lastWaterDate(LocalDate.now())
                .build();

        PetPlantResponse petPlantResponse = petPlantService.create(request, member);

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
                .birthDate(LocalDate.now())
                .lastWaterDate(LocalDate.now())
                .build();

        assertThatThrownBy(() -> petPlantService.create(request, member))
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

    @Test
    void 반려_식물_단건_조회() {
        PetPlant petPlant = petPlantSupport.builder().member(member).build();

        PetPlantResponse petPlantResponse = petPlantService.read(petPlant.getId(), member);

        assertAll(
                () -> assertThat(petPlantResponse.getId()).isEqualTo(petPlant.getId()),
                () -> assertThat(petPlantResponse.getNickname()).isEqualTo(petPlant.getNickname())
        );
    }

    @Test
    void 반려_식물_단건_조회시_주인이_아니면_예외_발생() {
        Member otherMember = memberSupport.builder().build();
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

    @Test
    void 반려_식물_정보_수정() {
        PetPlant petPlant = petPlantSupport.builder().member(member).build();
        PetPlantUpdateRequest updateRequest = 피우미_수정_요청;

        petPlantService.update(petPlant.getId(), updateRequest, member);
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
                }
        );
    }

    @Test
    void 반려_식물_수정시_주인이_아니면_예외_발생() {
        Member otherMember = memberSupport.builder().build();
        PetPlant petPlant = petPlantSupport.builder().member(member).build();
        PetPlantUpdateRequest updateRequest = 피우미_수정_요청;

        assertThatThrownBy(() -> petPlantService.update(petPlant.getId(), updateRequest, otherMember))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("요청 사용자와 반려 식물의 사용자가 일치하지 않습니다. memberId: " + otherMember.getId());
    }

    @Test
    void 존재하지_않는_반려_식물을_수정하면_예외_발생() {
        Long wrongId = -1L;
        PetPlantUpdateRequest updateRequest = 피우미_수정_요청;

        assertThatThrownBy(() -> petPlantService.update(wrongId, updateRequest, member))
                .isInstanceOf(NoSuchElementException.class)
                .hasMessage("일치하는 반려 식물이 존재하지 않습니다. id: " + wrongId);
    }

    @Test
    void 반려_식물_단건_삭제() {
        PetPlant petPlant = petPlantSupport.builder().member(member).build();

        assertDoesNotThrow(() -> petPlantService.delete(petPlant.getId(), member));
    }

    @Test
    void 반려_식물_삭제시_히스토리도_함께_삭제된다() {
        PetPlant petPlant = petPlantSupport.builder().dictionaryPlant(dictionaryPlant).member(member).build();
        historySupport.builder().petPlant(petPlant).build();
        historySupport.builder().petPlant(petPlant).build();
        PageRequest pageRequest = PageRequest.of(1, 10);

        petPlantService.delete(petPlant.getId(), member);

        assertSoftly(
                softly -> {
                    softly.assertThat(petPlantRepository.findById(petPlant.getId())).isEmpty();
                    softly.assertThat(historyRepository.findAllByPetPlantId(petPlant.getId(), pageRequest).getContent())
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
    void 반려_식물_삭제시_주인이_아니면_예외_발생() {
        Member otherMember = memberSupport.builder().build();
        PetPlant petPlant = petPlantSupport.builder().member(member).build();

        assertThatThrownBy(() -> petPlantService.delete(petPlant.getId(), otherMember))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("요청 사용자와 반려 식물의 사용자가 일치하지 않습니다. memberId: " + otherMember.getId());
    }

    @Test
    void 반려_식물_정보_수정시_마지막으로_물준_날짜가_직전값과_같으면_예외_발생() {
        // given
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
                .lastWaterDate(firstDate)
                .build();

        // when & then
        assertThatThrownBy(() -> petPlantService.update(petPlant.getId(), updateRequest, member))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("마지막으로 물 준 날짜는 직전 값보다 같거나 이전일 수 없습니다. date: " + updateRequest.getLastWaterDate());
    }

    @Test
    void 반려_식물_정보_수정시_마지막으로_물준_날짜가_직전값보다_이전이면_예외_발생() {
        // given
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

        // when & then
        assertThatThrownBy(() -> petPlantService.update(petPlant.getId(), updateRequest, member))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("마지막으로 물 준 날짜는 직전 값보다 같거나 이전일 수 없습니다. date: " + updateRequest.getLastWaterDate());
    }
}
