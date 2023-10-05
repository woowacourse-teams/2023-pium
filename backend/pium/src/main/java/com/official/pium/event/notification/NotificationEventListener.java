package com.official.pium.event.notification;

import com.official.pium.fcm.NotificationService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NotificationEventListener {

    private final NotificationService notificationService;

    @EventListener
    public void handleNotificationEvents(List<NotificationEvent> notificationEvent) {
        for (NotificationEvent event : notificationEvent) {
            notificationService.sendNotification(event.getTargetToken(), event.getTitle(), event.getBody());
        }
    }
}
