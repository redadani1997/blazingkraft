package com.redadani1997.blazingkraft.error.ksqldb;

public class KsqlDbTableException extends KsqlDbException {

    public KsqlDbTableException(String message) {
        super(message);
    }

    public KsqlDbTableException(Throwable cause) {
        super(cause);
    }

    public KsqlDbTableException(Throwable cause, String message) {
        super(cause, message);
    }
}
