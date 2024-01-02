package com.official.pium.common.exception;

public class OAuthException extends RuntimeException {

    OAuthException() {
        super();
    }

    OAuthException(final String message) {
        super(message);
    }

    public static class KakaoServerException extends OAuthException {

        public KakaoServerException() {
            super();
        }

        public KakaoServerException(final String message) {
            super(message);
        }
    }

    public static class KakaoTokenRequestException extends OAuthException {

        public KakaoTokenRequestException() {
            super();
        }

        public KakaoTokenRequestException(final String message) {
            super(message);
        }
    }

    public static class KaKaoMemberInfoRequestException extends OAuthException {

        public KaKaoMemberInfoRequestException() {
            super();
        }

        public KaKaoMemberInfoRequestException(final String message) {
            super(message);
        }
    }
}
