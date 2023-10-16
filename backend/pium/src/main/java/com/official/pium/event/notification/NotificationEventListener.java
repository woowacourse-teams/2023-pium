package com.official.pium.event.notification;

import com.official.pium.service.NotificationService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.*;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NotificationEventListener {

    private final NotificationService notificationService;

    @EventListener
    @Async
    public void handleNotificationEvents(List<NotificationEvent> notificationEvent) {
        for (NotificationEvent event : notificationEvent) {
            notificationService.sendNotification(event.getDeviceToken(), event.getTitle(), event.getBody());
        }
    }
}
