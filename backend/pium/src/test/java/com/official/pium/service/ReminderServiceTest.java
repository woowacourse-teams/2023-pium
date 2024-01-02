package com.official.pium.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.BDDAssertions.tuple;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import com.official.pium.IntegrationTest;
import com.official.pium.common.dto.DataResponse;
import com.official.pium.history.domain.History;
import com.official.pium.history.domain.HistoryType;
import com.official.pium.history.repository.HistoryRepository;
import com.official.pium.member.domain.Member;
import com.official.pium.petPlant.application.ReminderService;
import com.official.pium.petPlant.application.dto.ReminderCreateRequest;
import com.official.pium.petPlant.application.dto.ReminderResponse;
import com.official.pium.petPlant.application.dto.ReminderUpdateRequest;
import com.official.pium.petPlant.domain.PetPlant;
import com.official.pium.petPlant.domain.vo.PetPlantState;
import com.official.pium.petPlant.domain.vo.WaterDetail;
import com.official.pium.petPlant.repository.PetPlantRepository;
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
        member = memberSupport.builder().build();
        petPlant = petPlantSupport.builder().member(member).build();
        for (HistoryType type : HistoryType.values()) {
            historyCategorySupport.builder()
                    .historyType(type)
                    .build();
        }
    }

    @Test
    void 정상적인_물주기_시_다음_물주기_날짜와_마지막으로_물을_준_날짜를_변경() {
        PetPlant petPlant1 = petPlantSupport.builder().member(member).lastWaterDate(LocalDate.of(2022, 3, 4)).build();
        ReminderCreateRequest request = ReminderCreateRequest.builder()
                .waterDate(petPlant1.getWaterDetail().getLastWaterDate().plusDays(2))
                .build();

        reminderService.water(request, petPlant1.getId(), member);

        PetPlant updatedPetPlant = petPlantRepository.findById(petPlant1.getId()).get();
        LocalDate newWaterDate = request.getWaterDate();

        assertSoftly(softly -> {
                    softly.assertThat(updatedPetPlant)
                            .extracting(
                                    petPlant -> petPlant.getWaterDetail().getNextWaterDate(),
                                    petPlant -> petPlant.getWaterDetail().getLastWaterDate()
                            )
                            .isEqualTo(List.of(newWaterDate.plusDays(petPlant1.getWaterCycle()), newWaterDate));
                    softly.assertThat(historyRepository.findAll())
                            .extracting(History::getPetPlant,
                                    history -> LocalDate.parse(history.getHistoryContent().getCurrent()))
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
                .waterDate(petPlant.getWaterDetail().getLastWaterDate().minusDays(days))
                .build();

        assertThatThrownBy(
                () -> reminderService.water(request, petPlant.getId(), member)
        ).isInstanceOf(IllegalArgumentException.class)
                .hasMessage("마지막으로 물을 준 날짜와 그 이전 날짜에는 물을 줄 수는 없습니다. date: " + request.getWaterDate());
    }

    @Test
    void 반려_식물의_사용자와_물주기를_요청한_사용자가_다르면_예외_발생() {
        Member otherMember = memberSupport.builder().kakaoId(54321L).build();
        ReminderCreateRequest request = ReminderCreateRequest.builder()
                .waterDate(petPlant.getWaterDetail().getLastWaterDate().plusDays(3))
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

        assertThat(updatedPetPlant.getWaterDetail().getNextWaterDate()).isEqualTo(newWaterDate);
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
        Member otherMember = memberSupport.builder().kakaoId(524321L).build();
        ReminderUpdateRequest request = ReminderUpdateRequest.builder()
                .nextWaterDate(petPlant.getWaterDetail().getNextWaterDate().plusDays(1))
                .build();

        assertThatThrownBy(
                () -> reminderService.updateNextWaterDate(request, petPlant.getId(), otherMember)
        ).isInstanceOf(IllegalArgumentException.class)
                .hasMessage("요청 사용자와 반려 식물의 사용자가 일치하지 않습니다. memberId: " + otherMember.getId());
    }

    @Test
    void 리마인더_전체_조회() {
        LocalDate baseDate = LocalDate.now();
        PetPlant petPlant1 = savePetPlantWithNextWaterDate(baseDate.plusDays(1));
        PetPlant petPlant2 = savePetPlantWithNextWaterDate(baseDate.plusDays(2));
        PetPlant petPlant3 = savePetPlantWithNextWaterDate(baseDate.plusDays(3));
        PetPlant petPlant4 = savePetPlantWithNextWaterDate(baseDate.plusDays(4));

        DataResponse<List<ReminderResponse>> actual = reminderService.readAll(petPlant.getMember());

        List<ReminderResponse> expected = List.of(
                ReminderResponse.of(petPlant, petPlant.calculateDday(baseDate)),
                ReminderResponse.of(petPlant1, petPlant1.calculateDday(baseDate)),
                ReminderResponse.of(petPlant2, petPlant2.calculateDday(baseDate)),
                ReminderResponse.of(petPlant3, petPlant3.calculateDday(baseDate)),
                ReminderResponse.of(petPlant4, petPlant4.calculateDday(baseDate))
        );

        assertThat(actual.getData())
                .hasSize(expected.size())
                .usingRecursiveComparison()
                .isEqualTo(expected);
    }

    @Test
    void 물주기_알림_대상_식물을_조회한다() {
        // given
        Member subscribedMember = memberSupport.builder().kakaoId(99L).deviceToken("testDeviceToken").build();
        PetPlant sourcePetPlant = petPlantSupport.builder().member(subscribedMember).build();

        // when
        List<PetPlant> expected = petPlantRepository.findAllByWaterNotification(
                sourcePetPlant.getWaterDetail().getNextWaterDate());

        // then
        assertThat(expected)
                .usingRecursiveComparison()
                .isEqualTo(List.of(sourcePetPlant));
    }

    @Test
    void 물주기_알림_대상_식물이_없다() {
        // given
        Member subscribedMember = memberSupport.builder().kakaoId(99L).deviceToken("testDeviceToken").build();
        PetPlant sourcePetPlant = petPlantSupport.builder().member(subscribedMember).build();

        // when
        List<PetPlant> expected = petPlantRepository.findAllByWaterNotification(
                sourcePetPlant.getWaterDetail().getNextWaterDate().minusDays(5));

        // then
        assertThat(expected).isEmpty();
    }

    private PetPlant savePetPlantWithNextWaterDate(LocalDate nextWaterDate) {
        return petPlantRepository.save(PetPlant.builder()
                .dictionaryPlant(petPlant.getDictionaryPlant())
                .member(member)
                .nickname("testNickName")
                .imageUrl("testImageUrl")
                .petPlantState(PetPlantState.builder()
                        .location("testLocation")
                        .flowerpot("testFlowerpot")
                        .light("testLight")
                        .wind("testWind")
                        .build())
                .birthDate(LocalDate.of(2000, 7, 1))
                .waterDetail(WaterDetail.builder()
                        .nextWaterDate(nextWaterDate)
                        .lastWaterDate(LocalDate.of(2022, 7, 1))
                        .build())
                .waterCycle(3)
                .build());
    }
}
