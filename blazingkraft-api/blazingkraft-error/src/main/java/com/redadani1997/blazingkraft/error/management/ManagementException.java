package com.redadani1997.blazingkraft.error.management;

public class ManagementException extends RuntimeException {
    private final String message;
    private Throwable cause;

    public ManagementException(String message) {
        this.message = message;
    }

    public ManagementException(Throwable cause) {
        this.message = cause.getMessage();
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
