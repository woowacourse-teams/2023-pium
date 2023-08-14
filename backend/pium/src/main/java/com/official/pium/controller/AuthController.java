package com.official.pium.controller;

import com.official.pium.domain.Auth;
import com.official.pium.domain.Member;
import com.official.pium.service.AuthService;
import com.official.pium.service.dto.KaKaoMemberInfoResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequiredArgsConstructor
public class AuthController {

    private static final String SESSION_KEY = "KAKAO_ID";

    private final AuthService authService;

    @GetMapping("/login")
    public ResponseEntity<KaKaoMemberInfoResponse> login(
            @RequestParam(name = "code") @NotBlank String authorizationCode,
            HttpServletRequest request) {
        Member loginMember = authService.login(authorizationCode);

        HttpSession session = request.getSession();
        session.setAttribute(SESSION_KEY, loginMember.getKakaoId());
        session.setMaxInactiveInterval(21600);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/logout")
    public ResponseEntity logout(HttpServletRequest request,
                                 @Auth Member member) {
        HttpSession session = request.getSession(false);

        if (session != null) {
            session.invalidate();
        }

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/withdraw")
    public ResponseEntity withdraw(HttpServletRequest request,
                                   @Auth Member member) {
        HttpSession session = request.getSession(false);

        if (session != null) {
            session.invalidate();
        }
        authService.withdraw(member);

        return ResponseEntity.noContent().build();
    }
}
