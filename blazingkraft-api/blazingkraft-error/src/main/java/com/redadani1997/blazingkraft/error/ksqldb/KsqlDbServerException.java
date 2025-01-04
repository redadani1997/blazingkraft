package com.redadani1997.blazingkraft.error.ksqldb;

public class KsqlDbServerException extends KsqlDbException {

    public KsqlDbServerException(String message) {
        super(message);
    }

    public KsqlDbServerException(Throwable cause) {
        super(cause);
    }

    public KsqlDbServerException(Throwable cause, String message) {
        super(cause, message);
    }
}
