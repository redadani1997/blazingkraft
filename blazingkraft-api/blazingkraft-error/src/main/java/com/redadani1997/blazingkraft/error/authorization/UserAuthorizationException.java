package com.redadani1997.blazingkraft.error.authorization;

public class UserAuthorizationException extends AuthorizationException {
    public UserAuthorizationException(String message) {
        super(message);
    }

    public UserAuthorizationException(Throwable cause) {
        super(cause);
    }

    public UserAuthorizationException(Throwable cause, String message) {
        super(cause, message);
    }
}
