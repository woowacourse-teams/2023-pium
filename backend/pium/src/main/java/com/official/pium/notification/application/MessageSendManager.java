package com.official.pium.notification.application;

public interface MessageSendManager {

    void sendMessageTo(String targetToken, String title, String body);
}
