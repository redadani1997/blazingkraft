package com.redadani1997.blazingkraft.error.connect;

public class PluginException extends KafkaConnectException {

    public PluginException(Throwable cause) {
        super(cause);
    }

    public PluginException(String message) {
        super(message);
    }
}
