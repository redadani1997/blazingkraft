package com.redadani1997.blazingkraft.error.dao;

public class DaoException extends RuntimeException {
    private final String message;
    private Throwable cause;

    public DaoException(String message) {
        this.message = message;
    }

    public DaoException(Throwable cause) {
        this.message = cause.getMessage();
        this.cause = cause;
    }

    public DaoException(Throwable cause, String message) {
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
