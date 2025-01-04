package com.redadani1997.blazingkraft.ws.repository;

import com.redadani1997.blazingkraft.ws.handler.CommonWebSocketHandler;

public interface CommonWebSocketHandlerRepository {
    Class<? extends CommonWebSocketHandler> get(String destination);

    void register(String topic, Class<? extends CommonWebSocketHandler> clazz);
}
