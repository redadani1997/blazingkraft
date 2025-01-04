package com.redadani1997.blazingkraft.error.ksqldb;

public class KsqlDbQueryException extends KsqlDbException {

    public KsqlDbQueryException(String message) {
        super(message);
    }

    public KsqlDbQueryException(Throwable cause) {
        super(cause);
    }

    public KsqlDbQueryException(Throwable cause, String message) {
        super(cause, message);
    }
}
