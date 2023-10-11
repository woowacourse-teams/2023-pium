package com.official.pium.controller;

import com.official.pium.domain.Auth;
import com.official.pium.domain.Member;
import com.official.pium.service.MemberService;
import com.official.pium.service.dto.NotificationCheckResponse;
import com.official.pium.service.dto.NotificationSubscribeRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    @DeleteMapping("/withdraw")
    public ResponseEntity<Void> withdraw(HttpServletRequest request, @Auth Member member) {
        HttpSession session = request.getSession(false);

        if (session != null) {
            session.invalidate();
        }
        memberService.withdraw(member);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me")
    public ResponseEntity<Void> checkSessionStatus(HttpServletRequest request, @Auth Member member) {
        HttpSession session = request.getSession(false);

        if (session == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok().build();
    }

    @GetMapping("/notification")
    public ResponseEntity<NotificationCheckResponse> checkNotificationStatus(@Auth Member member) {
        return ResponseEntity.ok(memberService.checkNotification(member));
    }

    @PostMapping("/notification")
    public ResponseEntity<Void> checkNotificationStatus(@Auth Member member, @RequestBody NotificationSubscribeRequest request) {
        memberService.subscribeNotification(member, request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/notification")
    public ResponseEntity<Void> delete(@Auth Member member) {
        memberService.unSubscribeNotification(member);
        return ResponseEntity.ok().build();
    }
}
