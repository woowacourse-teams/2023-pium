package com.official.pium.notification.fcm.application;

import com.google.auth.oauth2.GoogleCredentials;
import com.official.pium.notification.fcm.dto.FcmMessageResponse;
import com.official.pium.notification.fcm.exception.FcmException;
import com.official.pium.notification.application.MessageSendManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class FcmMessageSender implements MessageSendManager {

    @Value("${fcm.api.url}")
    private String apiUrl;

    @Value("${fcm.key.path}")
    private String keyPath;

    @Value("${fcm.key.scope}")
    private String keyScope;

    private final RestTemplate restTemplate;

    public void sendMessageTo(String targetToken, String title, String body) {
        try {
            FcmMessageResponse message = makeMessage(targetToken, title, body);

            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.AUTHORIZATION, "Bearer " + getAccessToken());
            headers.set(HttpHeaders.CONTENT_TYPE, "application/json; UTF-8");

            HttpEntity<FcmMessageResponse> request = new HttpEntity<>(message, headers);

            ResponseEntity<FcmMessageResponse> postResult = restTemplate.postForEntity(
                    apiUrl,
                    request,
                    FcmMessageResponse.class
            );

            log.info("FCM 메시지 전송 성공: {}", postResult.getBody());

        } catch (Exception e) {
            log.error("FCM 메시지 전송 실패", e);
            throw new FcmException.FcmMessageSendException(e.getMessage());
        }
    }

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
