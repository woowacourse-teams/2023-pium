package com.official.pium.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.BDDAssertions.tuple;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import com.official.pium.IntegrationTest;
import com.official.pium.domain.History;
import com.official.pium.domain.HistoryType;
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
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;


@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class ReminderServiceTest extends IntegrationTest {

    private PetPlant petPlant;
    private Member member;

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
        for (HistoryType type : HistoryType.values()) {
            historyCategorySupport.builder()
                    .historyType(type)
                    .build();
        }
    }

    @Test
    void 정상적인_물주기_시_다음_물주기_날짜와_마지막으로_물을_준_날짜를_변경() {
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
                    // findByHistoryCategory
                    softly.assertThat(historyRepository.findAll())
                            .extracting(History::getPetPlant, History::getDate)
                            .contains(tuple(updatedPetPlant, newWaterDate));
                }
        );
    }

    @ParameterizedTest(name = "오늘 보다 {0}일 후에 물주면 예외 발생")
    @ValueSource(ints = {1, 2, 3, 4, 5})
    void 오늘_이후_날짜에_물을_주면_예외_발생(int days) {
        ReminderCreateRequest request = ReminderCreateRequest.builder()
                .waterDate(LocalDate.now().plusDays(days))
                .build();

        assertThatThrownBy(
                () -> reminderService.water(request, petPlant.getId(), member)
        ).isInstanceOf(IllegalArgumentException.class)
                .hasMessage("오늘 이후 날짜에 물을 줄 수는 없습니다. date: " + request.getWaterDate());
    }

    @ParameterizedTest(name = "마지막으로 물준 날짜 {0}일 전에 물주면 예외 발생")
    @ValueSource(ints = {0, 1, 2, 3, 4, 5})
    void 마지막으로_물준_날짜_이전에_물주면_예외_발생(int days) {
        ReminderCreateRequest request = ReminderCreateRequest.builder()
                .waterDate(petPlant.getLastWaterDate().minusDays(days))
                .build();

        assertThatThrownBy(
                () -> reminderService.water(request, petPlant.getId(), member)
        ).isInstanceOf(IllegalArgumentException.class)
                .hasMessage("마지막으로 물을 준 날짜와 그 이전 날짜에는 물을 줄 수는 없습니다. date: " + request.getWaterDate());
    }

    @Test
    void 반려_식물의_사용자와_물주기를_요청한_사용자가_다르면_예외_발생() {
        Member otherMember = memberSupport.builder().build();
        ReminderCreateRequest request = ReminderCreateRequest.builder()
                .waterDate(LocalDate.now())
                .build();

        assertThatThrownBy(
                () -> reminderService.water(request, petPlant.getId(), otherMember)
        ).isInstanceOf(IllegalArgumentException.class)
                .hasMessage("요청 사용자와 반려 식물의 사용자가 일치하지 않습니다. memberId: " + otherMember.getId());
    }

    @ParameterizedTest(name = "오늘보다 {0}일 후 날짜로 물주기 미루기")
    @ValueSource(ints = {1, 2, 3, 4, 5})
    void 물주기_미루기(int days) {
        LocalDate newWaterDate = LocalDate.now().plusDays(days);
        ReminderUpdateRequest request = ReminderUpdateRequest.builder()
                .nextWaterDate(newWaterDate)
                .build();

        reminderService.updateNextWaterDate(request, petPlant.getId(), member);

        PetPlant updatedPetPlant = petPlantRepository.findById(petPlant.getId()).get();

        assertThat(updatedPetPlant.getNextWaterDate()).isEqualTo(newWaterDate);
    }

    @ParameterizedTest(name = "오늘보다 {0}일 전 날짜로 물주기를 미루면 예외 발생")
    @ValueSource(ints = {0, 1, 2, 3, 4, 5})
    void 오늘_또는_이전_날짜로_물주기를_미루면_예외_발생(int days) {
        LocalDate newWaterDate = LocalDate.now().minusDays(days);
        ReminderUpdateRequest request = ReminderUpdateRequest.builder()
                .nextWaterDate(newWaterDate)
                .build();

        assertThatThrownBy(
                () -> reminderService.updateNextWaterDate(request, petPlant.getId(), member)
        ).isInstanceOf(IllegalArgumentException.class)
                .hasMessage("오늘과 그 이전 날짜로 물주기 날짜를 변경할 수는 없습니다. date: " + newWaterDate);
    }

    @Test
    void 반려_식물의_사용자와_미루기를_요청한_사용자가_다르면_예외_발생() {
        Member otherMember = memberSupport.builder().build();
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
        PetPlant petPlant1 = savePetPlantWithNextWaterDate(LocalDate.now().plusDays(1));
        PetPlant petPlant2 = savePetPlantWithNextWaterDate(LocalDate.now().plusDays(2));
        PetPlant petPlant3 = savePetPlantWithNextWaterDate(LocalDate.now().plusDays(3));
        PetPlant petPlant4 = savePetPlantWithNextWaterDate(LocalDate.now().plusDays(4));

        DataResponse<List<ReminderResponse>> actual = reminderService.readAll(petPlant.getMember());

        List<ReminderResponse> expected = List.of(
                PetPlantMapper.toReminderResponse(petPlant, petPlant.calculateDday(LocalDate.now())),
                PetPlantMapper.toReminderResponse(petPlant1, petPlant1.calculateDday(LocalDate.now())),
                PetPlantMapper.toReminderResponse(petPlant2, petPlant2.calculateDday(LocalDate.now())),
                PetPlantMapper.toReminderResponse(petPlant3, petPlant3.calculateDday(LocalDate.now())),
                PetPlantMapper.toReminderResponse(petPlant4, petPlant4.calculateDday(LocalDate.now()))
        );

        assertThat(actual.getData())
                .hasSize(expected.size())
                .usingRecursiveComparison()
                .isEqualTo(expected);
    }

    private PetPlant savePetPlantWithNextWaterDate(LocalDate nextWaterDate) {
        return petPlantRepository.save(PetPlant.builder()
                .dictionaryPlant(petPlant.getDictionaryPlant())
                .member(member)
                .nickname("testNickName")
                .imageUrl("testImageUrl")
                .location("testLocation")
                .flowerpot("testFlowerpot")
                .light("testLight")
                .wind("testWind")
                .birthDate(LocalDate.now())
                .nextWaterDate(nextWaterDate)
                .lastWaterDate(LocalDate.now().minusDays(1))
                .waterCycle(3)
                .build());
    }
}
