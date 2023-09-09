package com.official.pium.fixture;

import com.official.pium.domain.Admin;

public class AdminFixture {

    public static Admin GUEST() {
        return new Admin("GUEST", "12345", "asdf");
    }
}
