package com.redadani1997.blazingkraft.error.connect;

public class KafkaConnectException extends RuntimeException {
    private final String message;
    private Throwable cause;

    public KafkaConnectException(String message) {
        this.message = message;
    }

    public KafkaConnectException(Throwable cause) {
        this.message = cause.getMessage();
        this.cause = cause;
    }

    public KafkaConnectException(Throwable cause, String message) {
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
