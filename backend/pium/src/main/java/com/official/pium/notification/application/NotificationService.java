package com.official.pium.notification.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final MessageSendManager messageSendManager;

    public void sendNotification(String deviceToken, String title, String body) {
        messageSendManager.sendMessageTo(deviceToken, title, body);
    }
}
