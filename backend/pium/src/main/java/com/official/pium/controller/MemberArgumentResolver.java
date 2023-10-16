package com.official.pium.controller;

import com.official.pium.domain.Auth;
import com.official.pium.domain.Member;
import com.official.pium.repository.MemberRepository;
import com.official.pium.service.SessionGroupService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import javax.naming.AuthenticationException;
import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@RequiredArgsConstructor
public class MemberArgumentResolver implements HandlerMethodArgumentResolver {

    private static final String SESSION_KEY = "KAKAO_ID";

    private final MemberRepository memberRepository;
    private final SessionGroupService sessionGroupService;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(Auth.class) && parameter.getParameterType().equals(Member.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
                                  NativeWebRequest webRequest, WebDataBinderFactory binderFactory)
            throws AuthenticationException {
        HttpServletRequest request = (HttpServletRequest) webRequest.getNativeRequest();
        HttpSession session = request.getSession(false);

        if (session == null) {
            throw new AuthenticationException("로그인이 필요합니다");
        }

        String sessionValue = sessionGroupService.findBySessionIdAndKey(session.getId(), SESSION_KEY);
        try {
            Long kakaoId = Long.valueOf(sessionValue);
            return memberRepository.findByKakaoId(kakaoId)
                    .orElseThrow(() -> new AuthenticationException("회원을 찾을 수 없습니다."));
        } catch (ClassCastException e) {
            throw new AuthenticationException("잘못된 세션 정보로 인해 사용자 인증에 실패하였습니다.");
        }
    }
}
