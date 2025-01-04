package com.redadani1997.blazingkraft.error.files;

public class FilesException extends RuntimeException {
    private final String message;
    private Throwable cause;

    public FilesException(String message) {
        this.message = message;
    }

    public FilesException(Throwable cause) {
        this.message = cause.getMessage();
        this.cause = cause;
    }

    public FilesException(Throwable cause, String message) {
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
