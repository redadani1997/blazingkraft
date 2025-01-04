package com.redadani1997.blazingkraft.ws.repository.impl;

import com.redadani1997.blazingkraft.error.ws.WebSocketException;
import com.redadani1997.blazingkraft.ws.handler.CommonWebSocketHandler;
import com.redadani1997.blazingkraft.ws.repository.CommonWebSocketHandlerRepository;
import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Repository;

@Repository
public class CommonWebSocketHandlerRepositoryImpl implements CommonWebSocketHandlerRepository {
    private Map<String, Class<? extends CommonWebSocketHandler>> handlerClasses;

    public CommonWebSocketHandlerRepositoryImpl() {
        this.handlerClasses = new HashMap<>();
    }

    @Override
    public Class<? extends CommonWebSocketHandler> get(String destination) {
        if (destination == null) {
            throw new WebSocketException("Destination cannot be null.");
        }

        String topic =
                this.handlerClasses.keySet().stream()
                        .filter(destination::startsWith)
                        .findFirst()
                        .orElseThrow(
                                () -> new WebSocketException("No handler found for destination: " + destination));
        return this.handlerClasses.get(topic);
    }

    @Override
    public synchronized void register(String topic, Class<? extends CommonWebSocketHandler> clazz) {
        this.handlerClasses.remove(topic);
        this.handlerClasses.put(topic, clazz);
    }
}
