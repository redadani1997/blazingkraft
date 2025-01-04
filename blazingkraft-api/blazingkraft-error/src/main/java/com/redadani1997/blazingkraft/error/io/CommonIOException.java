package com.redadani1997.blazingkraft.error.io;

public class CommonIOException extends RuntimeException {
    private final String message;
    private Throwable cause;

    public CommonIOException(String message) {
        this.message = message;
    }

    public CommonIOException(Throwable cause) {
        this.message = cause.getMessage();
        this.cause = cause;
    }

    public CommonIOException(Throwable cause, String message) {
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
