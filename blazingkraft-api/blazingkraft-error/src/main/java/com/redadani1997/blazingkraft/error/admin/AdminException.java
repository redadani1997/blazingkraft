package com.redadani1997.blazingkraft.error.admin;

public class AdminException extends RuntimeException {
    private final String message;
    private Throwable cause;

    public AdminException(String message) {
        this.message = message;
    }

    public AdminException(Throwable cause) {
        this.message = cause.getMessage();
        this.cause = cause;
    }

    public AdminException(Throwable cause, String message) {
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
