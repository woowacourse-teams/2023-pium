package com.official.pium.admin.mapper;

import com.official.pium.admin.domain.Admin;
import com.official.pium.admin.service.dto.AdminLoginRequest;

public class AdminMapper {

    private AdminMapper() {
    }

    public static Admin toAdmin(AdminLoginRequest request) {
        return new Admin(
                request.getAccount(),
                request.getPassword(),
                request.getSecondPassword()
        );
    }
}
