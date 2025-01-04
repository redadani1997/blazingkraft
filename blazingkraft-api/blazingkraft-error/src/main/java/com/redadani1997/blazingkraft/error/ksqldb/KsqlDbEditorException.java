package com.redadani1997.blazingkraft.error.ksqldb;

public class KsqlDbEditorException extends KsqlDbException {

    public KsqlDbEditorException(String message) {
        super(message);
    }

    public KsqlDbEditorException(Throwable cause) {
        super(cause);
    }

    public KsqlDbEditorException(Throwable cause, String message) {
        super(cause, message);
    }
}
