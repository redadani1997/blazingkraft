package com.redadani1997.blazingkraft.error.ws;

public class WebSocketException extends RuntimeException {
    private final String message;
    private Throwable cause;

    public WebSocketException(String message) {
        this.message = message;
    }

    public WebSocketException(Throwable cause) {
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
