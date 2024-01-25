package com.official.pium.admin.service;

import com.official.pium.petPlant.repository.PetPlantRepository;
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

//    public void sendWaterNotificationAsyncRampTest() {
//        List<PetPlant> petPlants = petPlantRepository.findAllByMemberId(7L);
//        List<NotificationEvent> events = petPlants.stream()
//                .map(plant -> NotificationEvent.builder()
//                        .title(plant.getNickname())
//                        .body("(테스트 중) 물을 줄 시간이에요!")
//                        .deviceToken(plant.getMember().getDeviceToken())
//                        .build()
//                ).toList();

//        for (int i = 0; i < 100; i++) {
//            PetPlant petPlant = petPlants.get(i);
//            NotificationEvent event = NotificationEvent.builder()
//                    .title(petPlant.getNickname())
//                    .body("물줘")
//                    .deviceToken(petPlant.getMember().getDeviceToken())
//                    .build();
//            publisher.publishEvent(event);
//        }

//        log.info("비동기 테스트 램프업 시작");
//        for (int i = 0; i < 100; i++) {
//            NotificationEvent notificationEvent = events.get(i);
//            publisher.publishEvent(notificationEvent);
//        }
//    }

//    public void sendWaterNotificationAsyncTest() {
//        List<PetPlant> petPlants = petPlantRepository.findAllByMemberId(7L);
//        List<NotificationEvent> events = petPlants.stream()
//                .map(plant -> NotificationEvent.builder()
//                        .title(plant.getNickname())
//                        .body("(테스트 중) 물을 줄 시간이에요!")
//                        .deviceToken(plant.getMember().getDeviceToken())
//                        .build()
//                ).toList();
//
//        int i = 1;
//        log.info("비동기 알림 테스트 시작. Thread: " + Thread.currentThread().getId() + " " + Thread.currentThread().getName());
//        for (NotificationEvent event : events) {
//            log.info(i++ + "번째 알림 이벤트");
//            publisher.publishEvent(event);
//        }
//        log.info("비동기 알림 테스트 종료. Thread: " + Thread.currentThread().getId() + " " + Thread.currentThread().getName());
//    }
}
