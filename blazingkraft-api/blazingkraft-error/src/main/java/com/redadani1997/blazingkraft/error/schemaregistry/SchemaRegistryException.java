package com.redadani1997.blazingkraft.error.schemaregistry;

public class SchemaRegistryException extends RuntimeException {
    private final String message;
    private Throwable cause;

    public SchemaRegistryException(String message) {
        this.message = message;
    }

    public SchemaRegistryException(Throwable cause) {
        this.message = cause.getMessage();
        this.cause = cause;
    }

    public SchemaRegistryException(Throwable cause, String message) {
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
