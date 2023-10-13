package com.official.pium.event.notification;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;

@Getter
@Builder
@Validated
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class NotificationEvent {

    private final String deviceToken;
    private final String title;
    private final String body;
}
