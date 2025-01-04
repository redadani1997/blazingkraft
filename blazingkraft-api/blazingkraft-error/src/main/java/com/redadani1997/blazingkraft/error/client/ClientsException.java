package com.redadani1997.blazingkraft.error.client;

public class ClientsException extends RuntimeException {
    private String message;

    public ClientsException(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
