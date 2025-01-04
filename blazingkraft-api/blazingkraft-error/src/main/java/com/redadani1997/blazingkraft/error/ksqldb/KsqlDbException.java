package com.redadani1997.blazingkraft.error.ksqldb;

public class KsqlDbException extends RuntimeException {
    private final String message;
    private Throwable cause;

    public KsqlDbException(String message) {
        this.message = message;
    }

    public KsqlDbException(Throwable cause) {
        this.message = cause.getMessage();
        this.cause = cause;
    }

    public KsqlDbException(Throwable cause, String message) {
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
