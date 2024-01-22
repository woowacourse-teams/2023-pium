package com.official.pium.notification.fcm.application;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.official.pium.notification.application.MessageSendManager;
import com.official.pium.notification.fcm.dto.FcmMessageResponse;
import jakarta.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Component
@RequiredArgsConstructor
public class FcmMessageSender implements MessageSendManager {

    private static final String JSON_FILE_PATH = "src/main/resources/config/pium-fcm.json";

    @Value("${fcm.api.url}")
    private String apiUrl;

    @Value("${fcm.key.path}")
    private String keyPath;

    @Value("${fcm.key.scope}")
    private String keyScope;

    private final RestTemplate restTemplate;

    @PostConstruct
    public void initialize() {
        FileInputStream serviceAccount;
        try {
            serviceAccount = new FileInputStream(JSON_FILE_PATH);
            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options, "Pium");
            }
        } catch (FileNotFoundException e) {
            log.error("파일을 찾을 수 없습니다. " + e);
        } catch (IOException e) {
            log.error("FCM 인증이 실패했습니다. " + e);
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
        try {
            String response = FirebaseMessaging.getInstance().sendAsync(message).get();
            log.info("응답 결과 : " + response);
        } catch (InterruptedException e) {
            log.error(e.getMessage());
        } catch (ExecutionException e) {
            log.error(e.getMessage());
        }
    }

//    public void sendMessageTo(String targetToken, String title, String body) {
//        try {
//            FcmMessageResponse message = makeMessage(targetToken, title, body);
//
//            HttpHeaders headers = new HttpHeaders();
//            headers.set(HttpHeaders.AUTHORIZATION, "Bearer " + getAccessToken());
//            headers.set(HttpHeaders.CONTENT_TYPE, "application/json; UTF-8");
//
//            HttpEntity<FcmMessageResponse> request = new HttpEntity<>(message, headers);
//
//            ResponseEntity<FcmMessageResponse> postResult = restTemplate.postForEntity(
//                apiUrl,
//                request,
//                FcmMessageResponse.class
//            );
//
//            log.info("FCM 메시지 전송 성공: {}", postResult.getBody());
//
//        } catch (Exception e) {
//            log.error("FCM 메시지 전송 실패", e);
//            throw new FcmException.FcmMessageSendException(e.getMessage());
//        }
//    }

    private FcmMessageResponse makeMessage(String targetToken, String title, String body) {
        return FcmMessageResponse.builder()
                .message(FcmMessageResponse.Message.builder()
                        .token(targetToken)
                        .notification(FcmMessageResponse.Notification.builder()
                                .title(title)
                                .body(body)
                                .image(null)
                                .build()
                        )
                        .build()
                )
                .validate_only(false)
                .build();
    }

    private String getAccessToken() throws IOException {
        GoogleCredentials googleCredentials = GoogleCredentials
                .fromStream(new ClassPathResource(keyPath).getInputStream())
                .createScoped(keyScope);
        googleCredentials.refreshIfExpired();
        return googleCredentials.getAccessToken().getTokenValue();
    }
}
