package com.redadani1997.blazingkraft.error.authserver;

public class RSAKeyException extends AuthServerException {
    public RSAKeyException(String message) {
        super(message);
    }

    public RSAKeyException(Throwable cause) {
        super(cause);
    }
}
