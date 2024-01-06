package com.official.pium.admin.ui;

import com.official.pium.admin.service.TestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/test")
public class TestController {

    /**
     * 1. 모든 알림 이벤트를 단일 스레드로 처리하는 API 2. 모든 알림 이벤트를 각각의 스레드로 처리하는 API
     *
     * @return
     */

    private final TestService testService;

//    @GetMapping("/notifications")
//    public ResponseEntity<String> notificationTest() {
//        testService.sendWaterNotificationTest();
//        return ResponseEntity.ok("알림 기능 테스트 성공");
//    }

    @GetMapping("/notifications/async")
    public ResponseEntity<String> notificationAsyncTest() {
        testService.sendWaterNotificationAsyncTest();
        return ResponseEntity.ok("비동기 알림 기능 테스트 성공");
    }
}
