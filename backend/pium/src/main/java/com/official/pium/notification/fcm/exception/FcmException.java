package com.official.pium.notification.fcm.exception;

public class FcmException extends RuntimeException {

    public FcmException(String message) {
        super(message);
    }

    public static class FcmMessageSendException extends FcmException {
        public FcmMessageSendException(String message) {
            super(message);
        }
    }
}
