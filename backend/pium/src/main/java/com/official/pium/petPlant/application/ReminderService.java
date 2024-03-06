package com.official.pium.petPlant.application;

import com.official.pium.common.dto.DataResponse;
import com.official.pium.history.domain.HistoryType;
import com.official.pium.member.domain.Member;
import com.official.pium.petPlant.application.dto.ReminderCreateRequest;
import com.official.pium.petPlant.application.dto.ReminderResponse;
import com.official.pium.petPlant.application.dto.ReminderUpdateRequest;
import com.official.pium.petPlant.domain.PetPlant;
import com.official.pium.petPlant.event.history.HistoryEvent;
import com.official.pium.petPlant.event.notification.NotificationEvent;
import com.official.pium.petPlant.repository.PetPlantRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ReminderService {

    public static final String SORT_CONDITION = "waterDetail_nextWaterDate";

    private final PetPlantRepository petPlantRepository;
    private final ApplicationEventPublisher publisher;

    @Transactional
    public void water(ReminderCreateRequest reminderCreateRequest, Long petPlantId, Member member) {
        PetPlant petPlant = petPlantRepository.findById(petPlantId)
                .orElseThrow(() -> new NoSuchElementException("일치하는 반려 식물이 존재하지 않습니다. id: " + petPlantId));

        checkOwner(petPlant, member);

        LocalDate previousWaterDate = petPlant.getWaterDetail().getLastWaterDate();
        petPlant.water(reminderCreateRequest.getWaterDate());
        LocalDate currentWaterDate = petPlant.getWaterDetail().getLastWaterDate();

        publisher.publishEvent(
                HistoryEvent.of(petPlantId, previousWaterDate, currentWaterDate, HistoryType.LAST_WATER_DATE,
                        currentWaterDate));
    }

    @Transactional
    public void updateNextWaterDate(ReminderUpdateRequest reminderUpdateRequest, Long petPlantId, Member member) {
        PetPlant petPlant = petPlantRepository.findById(petPlantId)
                .orElseThrow(() -> new NoSuchElementException("일치하는 반려 식물이 존재하지 않습니다. id: " + petPlantId));
        checkOwner(petPlant, member);

        petPlant.changeNextWaterDate(reminderUpdateRequest.getNextWaterDate());
    }

    private void checkOwner(PetPlant petPlant, Member member) {
        if (petPlant.isNotOwnerOf(member)) {
            throw new IllegalArgumentException("요청 사용자와 반려 식물의 사용자가 일치하지 않습니다. memberId: " + member.getId());
        }
    }

    public DataResponse<List<ReminderResponse>> readAll(Member member) {
        List<PetPlant> petPlants = petPlantRepository.findAllByMemberId(member.getId(),
                Sort.by(Direction.ASC, SORT_CONDITION));

        List<ReminderResponse> reminderResponses = petPlants.stream()
                .map(petPlant -> ReminderResponse.of(
                        petPlant,
                        petPlant.calculateDday(LocalDate.now())))
                .toList();

        return DataResponse.<List<ReminderResponse>>builder()
                .data(reminderResponses)
                .build();
    }

    @Scheduled(cron = "0 0 7 * * *")
    public void sendWaterNotification() {
        List<PetPlant> petPlants = petPlantRepository.findAllByWaterNotification(LocalDate.now());
        log.info("[" + LocalDate.now() + " 물주기] " + "전체 알림: " + petPlants.size() + "개");
        petPlants.forEach(this::sendNotification);

    }

    private void sendNotification(PetPlant petPlant) {
        NotificationEvent event = NotificationEvent.builder()
                .title(petPlant.getNickname())
                .body("물을 줄 시간이에요!")
                .deviceToken(petPlant.getMember().getDeviceToken())
                .build();
        publisher.publishEvent(event);
    }
}
