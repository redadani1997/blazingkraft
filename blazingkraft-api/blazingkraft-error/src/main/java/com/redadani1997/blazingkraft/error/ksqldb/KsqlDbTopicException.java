package com.redadani1997.blazingkraft.error.ksqldb;

public class KsqlDbTopicException extends KsqlDbException {

    public KsqlDbTopicException(String message) {
        super(message);
    }

    public KsqlDbTopicException(Throwable cause) {
        super(cause);
    }

    public KsqlDbTopicException(Throwable cause, String message) {
        super(cause, message);
    }
}
