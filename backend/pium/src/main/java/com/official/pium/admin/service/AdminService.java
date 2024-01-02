package com.official.pium.admin.service;

import com.official.pium.admin.mapper.AdminMapper;
import com.official.pium.admin.domain.Admin;
import com.official.pium.admin.service.dto.AdminLoginRequest;
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
    private String adminAccount;

    @Value("${admin.password}")
    private String adminPassword;

    @Value("${admin.secondPassword}")
    private String adminSecondPassword;

    @Transactional
    public void login(AdminLoginRequest request, HttpSession session) {
        Admin admin = AdminMapper.toAdmin(request);
        if (admin.isValidate(adminAccount, adminPassword, adminSecondPassword)) {
            session.setAttribute(SESSION_KEY, admin);
            session.setMaxInactiveInterval(EXPIRED_TIME_ONE_HOUR);
        }
    }
}
