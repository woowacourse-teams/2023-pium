package com.official.pium.admin.dto;

import jakarta.validation.constraints.*;
import lombok.*;

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
