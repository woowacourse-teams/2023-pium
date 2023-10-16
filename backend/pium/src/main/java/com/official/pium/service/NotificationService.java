package com.official.pium.service;

import com.official.pium.util.MessageSendManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class NotificationService {

    private final MessageSendManager messageSendManager;

    public void sendNotification(String deviceToken, String title, String body) {
        messageSendManager.sendMessageTo(deviceToken, title, body);
    }
}
