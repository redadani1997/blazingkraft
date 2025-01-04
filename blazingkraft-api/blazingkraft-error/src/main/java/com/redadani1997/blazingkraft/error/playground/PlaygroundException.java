package com.redadani1997.blazingkraft.error.playground;

public class PlaygroundException extends RuntimeException {
    private final String message;
    private Throwable cause;

    public PlaygroundException(String message) {
        this.message = message;
    }

    public PlaygroundException(Throwable cause) {
        this.message = cause.getMessage();
        this.cause = cause;
    }

    public PlaygroundException(Throwable cause, String message) {
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
