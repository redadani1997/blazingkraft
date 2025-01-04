package com.redadani1997.blazingkraft.error.playground;

public class SchemaValidationException extends PlaygroundException {
    public SchemaValidationException(Throwable cause) {
        super(cause);
    }

    public SchemaValidationException(Throwable cause, String message) {
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

    public SchemaValidationException(String message) {
        super(message);
    }
}
