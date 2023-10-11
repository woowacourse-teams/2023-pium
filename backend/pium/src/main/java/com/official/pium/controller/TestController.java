package com.official.pium.controller;

import com.official.pium.service.NotificationService;
import com.official.pium.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TestController {

    private final MemberService memberService;
    private final NotificationService notificationService;

    @GetMapping("/test")
    public ResponseEntity<Void> test(@Param("deviceToken") String deviceToken, @Param("title") String title, @Param("body") String body) {
        notificationService.sendNotification(deviceToken, title, body);
        return ResponseEntity.ok().build();
    }
}
