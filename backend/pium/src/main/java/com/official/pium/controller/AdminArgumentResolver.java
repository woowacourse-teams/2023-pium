package com.official.pium.controller;

import com.official.pium.domain.Admin;
import com.official.pium.domain.AdminAuth;
import com.official.pium.exception.AuthorizationException;
import com.official.pium.exception.AuthorizationException.NeedAdminException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;


public class AdminArgumentResolver implements HandlerMethodArgumentResolver {

    private static final String SESSION_KEY = "PIUM_ADMIN_SESSION_ID";

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(AdminAuth.class) && parameter.getParameterType().equals(Admin.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {
        HttpServletRequest request = (HttpServletRequest) webRequest.getNativeRequest();
        HttpSession session = request.getSession(false);

        if (session == null) {
            return null;
        }

        try {
            Admin admin = (Admin) session.getAttribute(SESSION_KEY);
            if (admin == null) {
                throw new NeedAdminException("관리자 권한이 필요합니다.");
            }
            return admin;
        } catch (Exception e) {
            throw new AuthorizationException("잘못된 세션정보입니다.");
        }
    }
}
