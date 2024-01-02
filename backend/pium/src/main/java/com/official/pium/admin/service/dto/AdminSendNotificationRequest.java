package com.official.pium.admin.service.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class AdminSendNotificationRequest {

    @NotNull
    private String deviceToken;

    @NotNull
    private String title;

    @NotNull
    private String body;
}
