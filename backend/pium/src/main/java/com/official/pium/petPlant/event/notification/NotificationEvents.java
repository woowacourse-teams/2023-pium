package com.official.pium.petPlant.event.notification;

import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class NotificationEvents {

    private final List<NotificationEvent> notificationEvents;

    public static NotificationEvents from(List<NotificationEvent> notificationEvents) {
        return new NotificationEvents(notificationEvents);
    }
}
