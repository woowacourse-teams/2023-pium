package com.official.pium.notification.application;

import com.official.pium.petPlant.event.notification.NotificationEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class NotificationEventListener {

    private final NotificationService notificationService;

    @EventListener
    @Async
    public void handleNotificationEvent(NotificationEvent event) {
        log.info("비동기 알림 START, Thread: " + Thread.currentThread().getId() + " " + Thread.currentThread().getName());
        notificationService.sendNotification(event.getDeviceToken(), event.getTitle(), event.getBody());
        log.info("비동기 알림 END, Thread: " + Thread.currentThread().getId() + " " + Thread.currentThread().getName());
    }
}
