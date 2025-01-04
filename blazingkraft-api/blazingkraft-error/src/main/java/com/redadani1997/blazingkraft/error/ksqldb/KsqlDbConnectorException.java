package com.redadani1997.blazingkraft.error.ksqldb;

public class KsqlDbConnectorException extends KsqlDbException {

    public KsqlDbConnectorException(String message) {
        super(message);
    }

    public KsqlDbConnectorException(Throwable cause) {
        super(cause);
    }

    public KsqlDbConnectorException(Throwable cause, String message) {
        super(cause, message);
    }
}
