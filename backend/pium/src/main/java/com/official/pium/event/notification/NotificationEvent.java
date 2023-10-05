package com.official.pium.event.notification;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;

@Getter
@Validated
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class NotificationEvent {

    private final String targetToken;
    private final String title;
    private final String body;

    public static NotificationEvent of(String targetToken, String title, String body) {
        return new NotificationEvent(
                targetToken,
                title,
                body
        );
    }
}
