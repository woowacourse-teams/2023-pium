package com.official.pium.domain;

import java.util.Objects;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class Admin {

    private String account;
    private String password;
    private String secondPassword;

    public Admin(String account) {
        this.account = account;
    }

    public boolean isValidate(String account, String password, String secondPassword) {
        return Objects.equals(this.account, account)
                && Objects.equals(this.password, password)
                && Objects.equals(this.secondPassword, secondPassword);
    }
}
