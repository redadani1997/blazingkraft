package com.redadani1997.blazingkraft.error.connect;

public class KafkaConnectServerException extends KafkaConnectException {

    public KafkaConnectServerException(String message) {
        super(message);
    }

    public KafkaConnectServerException(Throwable cause) {
        super(cause);
    }
}
