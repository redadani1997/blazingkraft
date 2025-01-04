package com.redadani1997.blazingkraft.error.jmx;

public class JmxException extends RuntimeException {
    private final String message;
    private Throwable cause;

    public JmxException(String message) {
        this.message = message;
    }

    public JmxException(Throwable cause) {
        this.message = cause.getMessage();
        this.cause = cause;
    }

    public JmxException(Throwable cause, String message) {
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
