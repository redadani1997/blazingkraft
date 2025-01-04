package com.redadani1997.blazingkraft.error.audit;

public class AuditException extends RuntimeException {
    private final String message;
    private Throwable cause;

    public AuditException(String message) {
        this.message = message;
    }

    public AuditException(Throwable cause) {
        this.message = cause.getMessage();
        this.cause = cause;
    }

    public AuditException(Throwable cause, String message) {
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
