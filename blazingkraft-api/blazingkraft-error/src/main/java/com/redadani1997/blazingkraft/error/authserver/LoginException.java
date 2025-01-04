package com.redadani1997.blazingkraft.error.authserver;

public class LoginException extends AuthServerException {
    public LoginException(String message) {
        super(message);
    }

    public LoginException(Throwable cause) {
        super(cause);
    }

    public LoginException(Throwable cause, String message) {
        super(cause, message);
    }
}
