package com.redadani1997.blazingkraft.error.authorization;

public class AuthorizationException extends RuntimeException {

    private final String message;
    private Throwable cause;

    public AuthorizationException(String message) {
        this.message = message;
    }

    public AuthorizationException(Throwable cause) {
        this.message = cause.getMessage();
        this.cause = cause;
    }

    public AuthorizationException(Throwable cause, String message) {
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
