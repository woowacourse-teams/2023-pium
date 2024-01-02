package com.official.pium.common.ui;

import java.util.HashMap;
import java.util.Map;

public class HttpCookieManager {

    private static final int KEY_INDEX = 0;
    private static final int VALUE_INDEX = 1;
    private static final int COOKIE_SIZE = 2;
    private static final String SESSION_DELIMITER = "=";
    private static final String SESSIONS_DELIMITER = "; ";

    private final Map<String, String> cookies = new HashMap<>();

    public HttpCookieManager(String cookies) {
        for (String cookie : cookies.split(SESSIONS_DELIMITER)) {
            String[] cookiePair = cookie.split(SESSION_DELIMITER);
            if (cookiePair.length != COOKIE_SIZE) {
                continue;
            }
            this.cookies.put(cookiePair[KEY_INDEX], cookiePair[VALUE_INDEX]);
        }
    }

    public String getCookie(String key) {
        return cookies.get(key);
    }
}
