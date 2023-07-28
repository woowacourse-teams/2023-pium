package com.official.pium.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.BDDAssertions.tuple;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import com.official.pium.IntegrationTest;
import com.official.pium.domain.History;
import com.official.pium.domain.Member;
import com.official.pium.domain.PetPlant;
import com.official.pium.mapper.PetPlantMapper;
import com.official.pium.repository.HistoryRepository;
import com.official.pium.repository.PetPlantRepository;
import com.official.pium.service.dto.DataResponse;
import com.official.pium.service.dto.ReminderCreateRequest;
import com.official.pium.service.dto.ReminderResponse;
import com.official.pium.service.dto.ReminderUpdateRequest;
import java.time.LocalDate;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;


@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class ReminderServiceTest extends IntegrationTest {

    private PetPlant petPlant;
    private Member member;
    private Member otherMember;

    @Autowired
    private ReminderService reminderService;

    @Autowired
    private PetPlantRepository petPlantRepository;

    @Autowired
    private HistoryRepository historyRepository;

    @BeforeEach
    void setUp() {
        petPlant = petPlantSupport.builder().build();
        member = petPlant.getMember();
        otherMember = memberSupport.builder().build();
    }

    @Test
    void 물을_주면_다음_물주기_날짜와_마지막으로_물을_준_날짜를_변경() {
        ReminderCreateRequest request = ReminderCreateRequest.builder()
                .waterDate(LocalDate.now())
                .build();

        reminderService.water(request, petPlant.getId(), member);

        PetPlant updatedPetPlant = petPlantRepository.findById(petPlant.getId()).get();
        LocalDate newWaterDate = request.getWaterDate();

        assertSoftly(softly -> {
                    softly.assertThat(updatedPetPlant)
                            .extracting(PetPlant::getNextWaterDate, PetPlant::getLastWaterDate)
                            .isEqualTo(List.of(newWaterDate.plusDays(petPlant.getWaterCycle()), newWaterDate));
                    softly.assertThat(historyRepository.findAll())
                            .extracting(History::getPetPlant, History::getWaterDate)
                            .contains(tuple(updatedPetPlant, newWaterDate));
                }
        );
    }

    @Test
    void 오늘_이후_날짜에_물주면_예외_발생() {
        ReminderCreateRequest request = ReminderCreateRequest.builder()
                .waterDate(LocalDate.now().plusDays(1))
                .build();

        assertThatThrownBy(
                () -> reminderService.water(request, petPlant.getId(), member)
        ).isInstanceOf(IllegalArgumentException.class)
                .hasMessage("오늘 이후 날짜에 물을 줄 수는 없습니다. date: " + request.getWaterDate());
    }

    @Test
    void 마지막으로_물준_날짜_이전에_물주면_예외_발생() {
        ReminderCreateRequest request = ReminderCreateRequest.builder()
                .waterDate(LocalDate.now().minusDays(1))
                .build();

        assertThatThrownBy(
                () -> reminderService.water(request, petPlant.getId(), member)
        ).isInstanceOf(IllegalArgumentException.class)
                .hasMessage("마지막으로 물을 준 날짜보다 이전 날짜에 물을 줄 수는 없습니다. date: " + request.getWaterDate());
    }

    @Test
    void 해당_반려_식물의_사용자와_물주기를_요청한_사용자가_다르면_예외_발생() {
        ReminderCreateRequest request = ReminderCreateRequest.builder()
                .waterDate(LocalDate.now())
                .build();

        assertThatThrownBy(
                () -> reminderService.water(request, petPlant.getId(), otherMember)
        ).isInstanceOf(IllegalArgumentException.class)
                .hasMessage("요청 사용자와 반려 식물의 사용자가 일치하지 않습니다. memberId: " + otherMember.getId());
    }

    @Test
    void 물주기_미루기() {
        LocalDate newWaterDate = LocalDate.now().plusDays(1);
        ReminderUpdateRequest request = ReminderUpdateRequest.builder()
                .nextWaterDate(newWaterDate)
                .build();

        reminderService.updateNextWaterDate(request, petPlant.getId(), member);

        PetPlant updatedPetPlant = petPlantRepository.findById(petPlant.getId()).get();

        assertThat(updatedPetPlant.getNextWaterDate())
                .isEqualTo(newWaterDate);
    }

    @Test
    void 물주기_미루기_실패시_예외_발생() {
        LocalDate newWaterDate = LocalDate.now().minusDays(1);
        ReminderUpdateRequest request = ReminderUpdateRequest.builder()
                .nextWaterDate(newWaterDate)
                .build();

        assertThatThrownBy(
                () -> reminderService.updateNextWaterDate(request, petPlant.getId(), member)
        ).isInstanceOf(IllegalArgumentException.class)
                .hasMessage("오늘보다 이전 날짜로 물주기 날짜를 변경할 수는 없습니다. date: " + newWaterDate);
    }

    @Test
    void 해당_반려_식물의_사용자와_미루기를_요청한_사용자가_다르면_예외_발생() {
        ReminderUpdateRequest request = ReminderUpdateRequest.builder()
                .nextWaterDate(LocalDate.now().plusDays(1))
                .build();

        assertThatThrownBy(
                () -> reminderService.updateNextWaterDate(request, petPlant.getId(), otherMember)
        ).isInstanceOf(IllegalArgumentException.class)
                .hasMessage("요청 사용자와 반려 식물의 사용자가 일치하지 않습니다. memberId: " + otherMember.getId());
    }

    @Test
    void 리마인더_전체_조회() {
        DataResponse<List<ReminderResponse>> actual = reminderService.readAll(petPlant.getMember());

        List<ReminderResponse> expected = List.of(
                PetPlantMapper.toReminderResponse(petPlant, petPlant.calculateDDay(LocalDate.now())));

        assertThat(actual.getData())
                .hasSize(1)
                .usingRecursiveComparison()
                .isEqualTo(expected);
    }
}
