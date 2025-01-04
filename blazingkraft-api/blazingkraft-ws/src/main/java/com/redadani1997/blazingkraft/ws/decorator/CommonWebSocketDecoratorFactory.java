package com.redadani1997.blazingkraft.ws.decorator;

import com.redadani1997.blazingkraft.resourceserver.websocket.CommonWebsocketAuthentication;
import com.redadani1997.blazingkraft.ws.repository.CommonWebSocketHandlerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.handler.WebSocketHandlerDecoratorFactory;

@Component
@RequiredArgsConstructor
public class CommonWebSocketDecoratorFactory implements WebSocketHandlerDecoratorFactory {
    private final ApplicationContext applicationContext;
    private final CommonWebSocketHandlerRepository commonWebSocketHandlerRepository;
    private final CommonWebsocketAuthentication commonWebsocketAuthentication;

    @Override
    public WebSocketHandler decorate(WebSocketHandler handler) {
        return new CommonWebSocketDecorator(
                handler,
                this.applicationContext,
                this.commonWebSocketHandlerRepository,
                this.commonWebsocketAuthentication);
    }
}
