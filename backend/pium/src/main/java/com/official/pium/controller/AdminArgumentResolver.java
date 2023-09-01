package com.official.pium.controller;

import com.official.pium.annotation.AdminAuth;
import com.official.pium.domain.Admin;
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
            String adminAccount = (String) session.getAttribute(SESSION_KEY);
            if (adminAccount == null) {
                return null;
            }

            return new Admin(adminAccount);
        } catch (ClassCastException e) {
            return null;
        }
    }
}
