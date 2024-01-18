package com.official.pium.notification.application;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import com.official.pium.IntegrationTest;
import com.official.pium.petPlant.event.notification.NotificationEvent;
import java.util.UUID;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.ApplicationEventPublisher;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
class NotificationEventListenerTest extends IntegrationTest {

    @Autowired
    private ApplicationEventPublisher eventPublisher;

    @MockBean
    private NotificationEventListener notificationEventListener;

    @Test
    void 알림_이벤트가_발행되면_알림_이벤트_리스너가_동작한다() {
        NotificationEvent event = NotificationEvent.builder()
                .deviceToken(UUID.randomUUID().toString())
                .title("알림 이벤트")
                .body("발송")
                .build();

        eventPublisher.publishEvent(event);

        verify(notificationEventListener, times(1)).handleNotificationEvent(event);
    }
}
