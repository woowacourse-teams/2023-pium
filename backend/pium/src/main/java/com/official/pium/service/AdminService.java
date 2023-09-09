package com.official.pium.service;

import com.official.pium.domain.Admin;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class AdminService {

    private static final int EXPIRED_TIME_ONE_HOUR = 3600;
    private static final String SESSION_KEY = "PIUM_ADMIN_SESSION_ID";

    @Value("${admin.account}")
    private String ADMIN_ACCOUNT;

    @Value("${admin.password}")
    private String ADMIN_PASSWORD;

    @Value("${admin.secondPassword}")
    private String ADMIN_SECOND_PASSWORD;

    public void login(Admin admin, HttpSession session) {
        if (admin != null && admin.isValidate(ADMIN_ACCOUNT, ADMIN_PASSWORD, ADMIN_SECOND_PASSWORD)) {
            session.setAttribute(SESSION_KEY, admin.getAccount());
            session.setMaxInactiveInterval(EXPIRED_TIME_ONE_HOUR);
        }
    }
}
