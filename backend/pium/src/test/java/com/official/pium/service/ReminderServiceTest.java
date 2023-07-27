package com.official.pium.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.Assertions.tuple;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.official.pium.IntegrationTest;
import com.official.pium.domain.PetPlant;
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

    @Autowired
    private ReminderService reminderService;

    @Autowired
    private PetPlantRepository petPlantRepository;

    @Autowired
    private HistoryRepository historyRepository;

    @BeforeEach
    void setUp() {
        petPlant = petPlantSupport.builder().build();
    }

    @Test
    void 물주기() {
        ReminderCreateRequest request = ReminderCreateRequest.builder()
                .waterDate(LocalDate.now())
                .build();

        reminderService.water(request, petPlant.getId());

        PetPlant updatedPetPlant = petPlantRepository.findById(petPlant.getId()).get();
        LocalDate newWaterDate = request.getWaterDate();

        assertAll(
                () -> assertThat(updatedPetPlant)
                        .extracting("nextWaterDate", "lastWaterDate")
                        .isEqualTo(List.of(newWaterDate.plusDays(petPlant.getWaterCycle()), newWaterDate)),
                () -> assertThat(historyRepository.findAll())
                        .extracting("petPlant", "waterDate")
                        .contains(tuple(updatedPetPlant, newWaterDate))
        );
    }

    @Test
    void 오늘_이후_날짜에_물주면_예외_발생() {
        ReminderCreateRequest request = ReminderCreateRequest.builder()
                .waterDate(LocalDate.now().plusDays(1))
                .build();

        assertThatThrownBy(
                () -> reminderService.water(request, petPlant.getId())
        ).isInstanceOf(IllegalArgumentException.class)
                .hasMessage("오늘 이후 날짜에 물을 줄 수는 없습니다. date: " + request.getWaterDate());
    }

    @Test
    void 마지막으로_물준_날짜_이전에_물주면_예외_발생() {
        ReminderCreateRequest request = ReminderCreateRequest.builder()
                .waterDate(LocalDate.now().minusDays(1))
                .build();

        assertThatThrownBy(
                () -> reminderService.water(request, petPlant.getId())
        ).isInstanceOf(IllegalArgumentException.class)
                .hasMessage("마지막으로 물을 준 날짜보다 이전 날짜에 물을 줄 수는 없습니다. date: " + request.getWaterDate());
    }

    @Test
    void 물주기_미루기() {
        LocalDate newWaterDate = LocalDate.now().plusDays(1);
        ReminderUpdateRequest request = ReminderUpdateRequest.builder()
                .nextWaterDate(newWaterDate)
                .build();

        reminderService.delay(request, petPlant.getId());

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
                () -> reminderService.delay(request, petPlant.getId())
        ).isInstanceOf(IllegalArgumentException.class)
                .hasMessage("오늘보다 이전 날짜로 미룰 수는 없습니다. date: " + newWaterDate);
    }

    @Test
    void 리마인더_전체_조회() {
        DataResponse<List<ReminderResponse>> dataResponse = reminderService.readAll(petPlant.getMember());

        assertThat(dataResponse.getData())
                .hasSize(1)
                .extracting(ReminderResponse::getPetPlantId)
                .contains(petPlant.getId());
    }
}
