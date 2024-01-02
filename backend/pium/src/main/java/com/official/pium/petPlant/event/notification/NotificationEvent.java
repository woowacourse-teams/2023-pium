package com.official.pium.petPlant.event.notification;

import jakarta.validation.constraints.NotNull;
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

    @NotNull
    private final String deviceToken;

    @NotNull
    private final String title;

    @NotNull
    private final String body;
}
