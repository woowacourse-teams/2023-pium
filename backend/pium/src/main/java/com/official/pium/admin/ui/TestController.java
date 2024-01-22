package com.official.pium.admin.ui;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/test")
public class TestController {

//    private final TestService testService;

//    @GetMapping("/notifications")
//    public ResponseEntity<String> notificationTest() {
//        testService.sendWaterNotificationTest();
//        return ResponseEntity.ok("알림 기능 테스트 성공");
//    }

//    @GetMapping("/notifications/ramp")
//    public ResponseEntity<String> notificationRampTest() {
//        testService.sendWaterNotificationAsyncRampTest();
//        return ResponseEntity.ok("비동기 알림 기능 테스트 램프업 성공");
//    }
//
//    @GetMapping("/notifications/async")
//    public ResponseEntity<String> notificationAsyncTest() {
//        testService.sendWaterNotificationAsyncTest();
//        return ResponseEntity.ok("비동기 알림 기능 테스트 성공");
//    }
}
