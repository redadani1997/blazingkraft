package com.redadani1997.blazingkraft.error.ksqldb;

public class KsqlDbStreamException extends KsqlDbException {

    public KsqlDbStreamException(String message) {
        super(message);
    }

    public KsqlDbStreamException(Throwable cause) {
        super(cause);
    }

    public KsqlDbStreamException(Throwable cause, String message) {
        super(cause, message);
    }
}
