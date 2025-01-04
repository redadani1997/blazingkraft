package com.redadani1997.blazingkraft.error.playground;

public class ConversionsException extends PlaygroundException {
    public ConversionsException(Throwable cause) {
        super(cause);
    }

    public ConversionsException(Throwable cause, String message) {
        super(cause, message);
    }

    @Override
    public String getMessage() {
        return super.getMessage();
    }

    @Override
    public Throwable getCause() {
        return super.getCause();
    }

    public ConversionsException(String message) {
        super(message);
    }
}
