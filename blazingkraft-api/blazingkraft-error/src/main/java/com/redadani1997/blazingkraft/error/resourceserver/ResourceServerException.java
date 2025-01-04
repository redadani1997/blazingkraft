package com.redadani1997.blazingkraft.error.resourceserver;

public class ResourceServerException extends RuntimeException {
    private final String message;
    private Throwable cause;

    public ResourceServerException(String message) {
        this.message = message;
    }

    public ResourceServerException(Throwable cause) {
        this.message = cause.getMessage();
        this.cause = cause;
    }

    public ResourceServerException(Throwable cause, String message) {
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
