package com.official.pium.notification.fcm.application;

import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.MessagingErrorCode;
import com.google.firebase.messaging.Notification;
import com.official.pium.notification.application.MessageSendManager;
import jakarta.annotation.PostConstruct;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.task.TaskExecutor;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class FcmMessageSender implements MessageSendManager {

    private static final int MAX_RETRY_COUNT = 3;
    private static final int[] LOOP_BACK_TIMES = new int[]{1000, 2000, 4000};

    private final String fcmJsonPath;
    private final TaskExecutor callBackTaskExecutor;

    public FcmMessageSender(
            @Qualifier("notificationCallBackExecutor") TaskExecutor callBackTaskExecutor,
            @Value("${fcm.json.path}") String fcmJsonPath
    ) {
        this.callBackTaskExecutor = callBackTaskExecutor;
        this.fcmJsonPath = fcmJsonPath;
    }

    @PostConstruct
    public void initialize() {
        try {
            ClassPathResource resource = new ClassPathResource(fcmJsonPath);
            FirebaseOptions options = FirebaseOptions.builder()
                    .setThreadManager(new CustomThreadManager())
                    .setCredentials(GoogleCredentials.fromStream(resource.getInputStream()))
                    .build();

            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
            }
        } catch (FileNotFoundException e) {
            log.error("파일을 찾을 수 없습니다. ", e);
        } catch (IOException e) {
            log.error("FCM 인증이 실패했습니다. ", e);
        }
    }

    public void sendMessageTo(String targetToken, String title, String body) {
        Notification notification = Notification.builder()
                .setTitle(title)
                .setBody(body)
                .build();
        Message message = Message.builder()
                .setToken(targetToken)
                .setNotification(notification)
                .build();

        ApiFuture<String> apiFuture = FirebaseMessaging.getInstance().sendAsync(message);

        Runnable task = () -> extractAndLogResult(apiFuture, message);
        apiFuture.addListener(task, callBackTaskExecutor);
    }

    private void extractAndLogResult(ApiFuture<String> apiFuture, Message message) {
        try {
            String response = apiFuture.get();
            log.info("알림 전송 성공 : " + response);
            log.info("현재 스레드 NAME: " + Thread.currentThread().getName());
        } catch (InterruptedException e) {
            log.error("FCM 알림 스레드에서 문제가 발생했습니다.", e);
        } catch (ExecutionException e) {
            log.error("알림 전송 실패");
            if (e.getCause() instanceof FirebaseMessagingException exception) {
                MessagingErrorCode errorCode = exception.getMessagingErrorCode();
                if (isRetryErrorCode(errorCode)) {
                    retryWithInThreeTimes(message);
                }
            }
        }
    }
}
