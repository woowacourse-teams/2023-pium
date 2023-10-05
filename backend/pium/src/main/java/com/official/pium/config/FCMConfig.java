package com.official.pium.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

@Configuration
public class FCMConfig {

    @Value("${fcm.key.path}")
    private String fcmPrivateKeyPath;

    @Value("${fcm.key.scope}")
    private String fireBaseScope;

    @Bean
    public FirebaseMessaging firebaseMessaging() throws IOException {
        Optional<FirebaseApp> defaultFirebaseApp = defaultFirebaseApp();
        if (defaultFirebaseApp.isPresent()) {
            return FirebaseMessaging.getInstance(defaultFirebaseApp.get());
        }
        return FirebaseMessaging.getInstance(
                FirebaseApp.initializeApp(createFirebaseOption())
        );
    }

    private Optional<FirebaseApp> defaultFirebaseApp() {
        List<FirebaseApp> firebaseApps = FirebaseApp.getApps();
        if (firebaseApps == null || firebaseApps.isEmpty()) {
            return Optional.empty();
        }
        return firebaseApps.stream()
                .filter(firebaseApp -> FirebaseApp.DEFAULT_APP_NAME.equals(firebaseApp.getName()))
                .findAny();
    }

    private FirebaseOptions createFirebaseOption() throws IOException {
        return FirebaseOptions.builder()
                .setCredentials(
                        GoogleCredentials
                                .fromStream(new ClassPathResource(fcmPrivateKeyPath).getInputStream())
                                .createScoped(fireBaseScope)
                )
                .build();
    }
}
