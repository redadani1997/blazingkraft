package com.redadani1997.blazingkraft.error.common;

public class CastingException extends CommonException {
    private final String message;

    public CastingException(String message) {
        super(message);
        this.message = message;
    }

    public CastingException(Throwable cause, String message) {
        super(cause);
        this.message = message;
    }

    @Override
    public String getMessage() {
        return this.message;
    }
}
