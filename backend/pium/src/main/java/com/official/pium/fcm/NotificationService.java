package com.official.pium.fcm;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class NotificationService {

    private final FcmMessageSender fcmMessageSender;

    public void sendNotification(String deviceToken, String title, String body) {
        fcmMessageSender.sendMessageTo(deviceToken, title, body);
    }
}
