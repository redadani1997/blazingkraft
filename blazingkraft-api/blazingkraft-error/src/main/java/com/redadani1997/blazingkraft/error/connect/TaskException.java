package com.redadani1997.blazingkraft.error.connect;

public class TaskException extends KafkaConnectException {

    public TaskException(Throwable cause) {
        super(cause);
    }

    public TaskException(String message) {
        super(message);
    }
}
