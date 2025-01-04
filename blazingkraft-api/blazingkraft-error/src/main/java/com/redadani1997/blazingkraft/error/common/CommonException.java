package com.redadani1997.blazingkraft.error.common;

public class CommonException extends RuntimeException {
    public CommonException(String message) {
        super(message);
    }

    public CommonException(Throwable cause) {
        super(cause);
    }
}
