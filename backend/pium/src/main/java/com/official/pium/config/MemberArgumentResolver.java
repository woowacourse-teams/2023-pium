package com.official.pium.config;

import com.official.pium.domain.Auth;
import com.official.pium.domain.Member;
import com.official.pium.repository.MemberRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import java.util.NoSuchElementException;
import java.util.Objects;
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

        if (Objects.isNull(session)) {
            throw new AuthenticationException("로그인이 필요합니다");
        }

        Long kakao_id = (Long) session.getAttribute(SESSION_KEY);
        return memberRepository.findByKakaoId(kakao_id)
                .orElseThrow(() -> new NoSuchElementException("회원을 찾을 수 없습니다."));
    }
}
