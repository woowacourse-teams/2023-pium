package com.official.pium.controller;

import com.official.pium.domain.Auth;
import com.official.pium.domain.Member;
import com.official.pium.service.AuthService;
import com.official.pium.service.SessionGroupService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequiredArgsConstructor
public class AuthController {

    private static final String SESSION_KEY = "KAKAO_ID";

    private final AuthService authService;
    private final SessionGroupService sessionGroupService;

    @PostMapping("/login")
    public ResponseEntity<Void> login(
            @RequestParam(name = "code") @NotBlank String code,
            HttpServletRequest request) {
        Member loginMember = authService.login(code);

        HttpSession session = request.getSession();
        sessionGroupService.add(session.getId(), SESSION_KEY, loginMember.getKakaoId().toString());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request, @Auth Member member) {
        HttpSession session = request.getSession(false);

        if (session != null) {
            sessionGroupService.delete(session.getId(), SESSION_KEY);
            session.invalidate();
        }

        return ResponseEntity.ok().build();
    }
}
