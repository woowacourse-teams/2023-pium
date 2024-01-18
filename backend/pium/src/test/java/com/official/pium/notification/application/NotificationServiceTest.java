package com.official.pium.notification.application;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import java.util.UUID;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@ExtendWith(MockitoExtension.class)
class NotificationServiceTest {

    @InjectMocks
    private NotificationService notificationService;

    @Mock
    private MessageSendManager messageSendManager;

    @Test
    void 알림_전송_메서드가_알림_발송_메서드를_호출한다() {
        String deviceToken = UUID.randomUUID().toString();
        String title = "피움 물주기 알림";
        String body = "오늘은 피우미 물 주는 날";

        notificationService.sendNotification(deviceToken, title, body);

        verify(messageSendManager, times(1))
                .sendMessageTo(deviceToken, title, body);
    }
}
