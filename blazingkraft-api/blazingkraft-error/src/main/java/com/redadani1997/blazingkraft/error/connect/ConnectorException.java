package com.redadani1997.blazingkraft.error.connect;

public class ConnectorException extends KafkaConnectException {

    public ConnectorException(String message) {
        super(message);
    }

    public ConnectorException(Throwable cause) {
        super(cause);
    }
}
