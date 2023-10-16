package com.official.pium.fixture;

import com.official.pium.admin.dto.AdminSendNotificationRequest;

@SuppressWarnings("NonAsciiCharacters")
public class NotificationFixture {

    public static class REQUEST {

        public static AdminSendNotificationRequest 어드민_알림_전송_요청 = AdminSendNotificationRequest.builder()
                .deviceToken("deviceToken")
                .title("푸시 내용 - 제목")
                .body("푸시 내용 - 본문")
                .build();
    }
}
