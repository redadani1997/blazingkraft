package com.redadani1997.blazingkraft.error.authorization;

import com.redadani1997.blazingkraft.error.authserver.AuthServerException;

public class ServerAuthorizationException extends AuthServerException {
    public ServerAuthorizationException(String message) {
        super(message);
    }

    public ServerAuthorizationException(Throwable cause) {
        super(cause);
    }

    public ServerAuthorizationException(Throwable cause, String message) {
        super(cause, message);
    }
}
