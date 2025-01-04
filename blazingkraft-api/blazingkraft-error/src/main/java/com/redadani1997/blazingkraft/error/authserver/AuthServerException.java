package com.redadani1997.blazingkraft.error.authserver;

public class AuthServerException extends RuntimeException {
    private final String message;
    private Throwable cause;

    public AuthServerException(String message) {
        this.message = message;
    }

    public AuthServerException(Throwable cause) {
        this.message = cause.getMessage();
        this.cause = cause;
    }

    public AuthServerException(Throwable cause, String message) {
        this.message = message;
        this.cause = cause;
    }

    @Override
    public String getMessage() {
        return message;
    }

    @Override
    public Throwable getCause() {
        return this.cause != null ? this.cause : super.getCause();
    }
}
