package com.official.pium.notification.application;

import com.official.pium.petPlant.event.notification.NotificationEvent;
import com.official.pium.petPlant.event.notification.NotificationEvents;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NotificationEventListener {

    private final NotificationService notificationService;

    @EventListener
    @Async
    public void handleNotificationEvents(NotificationEvents notificationEvents) {
        for (NotificationEvent event : notificationEvents.getNotificationEvents()) {
            notificationService.sendNotification(event.getDeviceToken(), event.getTitle(), event.getBody());
        }
    }
}
