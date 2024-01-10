package com.official.pium.admin.service;

import com.official.pium.petPlant.domain.PetPlant;
import com.official.pium.petPlant.event.notification.NotificationEvent;
import com.official.pium.petPlant.repository.PetPlantRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class TestService {

    private final PetPlantRepository petPlantRepository;
    private final ApplicationEventPublisher publisher;

//    public void sendWaterNotificationTest() {
//        List<PetPlant> petPlants = petPlantRepository.findAllByMemberId(7L);
//        List<NotificationEvent> events = petPlants.stream()
//                .map(plant -> NotificationEvent.builder()
//                        .title(plant.getNickname())
//                        .body("(테스트 중) 물을 줄 시간이에요!")
//                        .deviceToken(plant.getMember().getDeviceToken())
//                        .build()
//                ).toList();
//        log.info("동기 알림 테스트 시작. Thread: " + Thread.currentThread().getId() + " " + Thread.currentThread().getName());
//        publisher.publishEvent(NotificationEvents.from(events));
//        log.info("동기 알림 테스트 종료. Thread: " + Thread.currentThread().getId() + " " + Thread.currentThread().getName());
//    }

    public void sendWaterNotificationAsyncTest() {
        List<PetPlant> petPlants = petPlantRepository.findAllByMemberId(7L);
        List<NotificationEvent> events = petPlants.stream()
                .map(plant -> NotificationEvent.builder()
                        .title(plant.getNickname())
                        .body("(테스트 중) 물을 줄 시간이에요!")
                        .deviceToken(plant.getMember().getDeviceToken())
                        .build()
                ).toList();

        int i = 1;
        log.info("비동기 알림 테스트 시작. Thread: " + Thread.currentThread().getId() + " " + Thread.currentThread().getName());
        for (NotificationEvent event : events) {
            log.info(i++ + "번째 알림 이벤트");
            publisher.publishEvent(event);
        }
        log.info("비동기 알림 테스트 종료. Thread: " + Thread.currentThread().getId() + " " + Thread.currentThread().getName());
    }
}