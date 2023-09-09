package com.official.pium.domain;

import java.util.Objects;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class Admin {

    private final String account;
    private final String password;
    private final String secondPassword;

    public boolean isValidate(String account, String password, String secondPassword) {
        return Objects.equals(this.account, account)
                && Objects.equals(this.password, password)
                && Objects.equals(this.secondPassword, secondPassword);
    }
}
