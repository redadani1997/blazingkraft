package com.redadani1997.blazingkraft.ws.decorator;

import com.redadani1997.blazingkraft.common.current_user.CurrentUser;
import com.redadani1997.blazingkraft.error.ws.WebSocketException;
import com.redadani1997.blazingkraft.resourceserver.websocket.CommonWebsocketAuthentication;
import com.redadani1997.blazingkraft.ws.frame.CommonFrame;
import com.redadani1997.blazingkraft.ws.frame.CommonFrameType;
import com.redadani1997.blazingkraft.ws.handler.CommonWebSocketHandler;
import com.redadani1997.blazingkraft.ws.repository.CommonWebSocketHandlerRepository;
import com.redadani1997.blazingkraft.ws.util.CommonWebSocketUtils;
import java.io.IOException;
import java.lang.reflect.Constructor;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.BiConsumer;
import org.springframework.context.ApplicationContext;
import org.springframework.messaging.Message;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.WebSocketHandlerDecorator;

public class CommonWebSocketDecorator extends WebSocketHandlerDecorator {
    private final ApplicationContext applicationContext;
    private final CommonWebSocketHandlerRepository commonWebSocketHandlerRepository;
    private final CommonWebsocketAuthentication commonWebsocketAuthentication;
    private Map<String, CommonWebSocketHandler> handlers = new ConcurrentHashMap<>();
    private Map<String, CurrentUser> currentUsers = new ConcurrentHashMap<>();

    public CommonWebSocketDecorator(
            WebSocketHandler handler,
            ApplicationContext applicationContext,
            CommonWebSocketHandlerRepository commonWebSocketHandlerRepository,
            CommonWebsocketAuthentication commonWebsocketAuthentication) {
        super(handler);
        this.applicationContext = applicationContext;
        this.commonWebSocketHandlerRepository = commonWebSocketHandlerRepository;
        this.commonWebsocketAuthentication = commonWebsocketAuthentication;
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> webSocketMessage)
            throws Exception {

        Optional<Message> messageOptional = CommonWebSocketUtils.fromWebSocketMessage(webSocketMessage);

        if (messageOptional.isEmpty()) {
            super.handleMessage(session, webSocketMessage);
            return;
        }

        Message message = messageOptional.get();

        StompHeaderAccessor accessor =
                MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        if (accessor == null || accessor.getCommand() == null) {
            return;
        }

        String sessionId = session.getId();
        String subscriptionId = accessor.getSubscriptionId();

        switch (accessor.getCommand()) {
            case CONNECT -> {
                String authorization = accessor.getFirstNativeHeader("Authorization");
                CurrentUser current = this.commonWebsocketAuthentication.authenticate(authorization);
                this.currentUsers.put(sessionId, current);
            }
            case SUBSCRIBE -> {
                String destination = accessor.getDestination();
                CurrentUser currentUser = this.currentUsers.get(sessionId);

                CommonWebSocketHandler commonWebSocketHandler =
                        this.instantiateHandler(session, destination, subscriptionId, currentUser);

                String requestBody = CommonWebSocketUtils.extractRequestBody(accessor);

                this.handlers.put(sessionId, commonWebSocketHandler);
                this.handlers.get(sessionId).onSubscribe(requestBody);
            }
            case SEND -> {
                this.handlers.get(sessionId).onMessage(message.getPayload());
                return;
            }
            case DISCONNECT -> {
                CommonWebSocketHandler currentHandler = this.handlers.get(sessionId);
                if (currentHandler == null) {
                    super.handleMessage(session, webSocketMessage);
                    return;
                }
                currentHandler.onDisconnect();
                this.handlers.remove(sessionId);
                this.currentUsers.remove(sessionId);
            }
        }
        super.handleMessage(session, webSocketMessage);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String sessionId = session.getId();
        CommonWebSocketHandler currentHandler = this.handlers.get(sessionId);
        if (currentHandler == null) {
            super.afterConnectionClosed(session, status);
            return;
        }
        currentHandler.onDisconnect();
        this.handlers.remove(sessionId);
        this.currentUsers.remove(sessionId);
        super.afterConnectionClosed(session, status);
    }

    private CommonWebSocketHandler instantiateHandler(
            WebSocketSession session,
            String destination,
            String subscriptionId,
            CurrentUser currentUser) {
        try {
            Runnable sessionCloser = this.sessionCloser(session);
            BiConsumer<CommonFrameType, Object> messageSender =
                    this.messageSender(session, destination, subscriptionId);

            Class<? extends CommonWebSocketHandler> clazz =
                    this.commonWebSocketHandlerRepository.get(destination);

            Constructor<? extends CommonWebSocketHandler> constructor =
                    clazz.getConstructor(
                            ApplicationContext.class,
                            Runnable.class,
                            BiConsumer.class,
                            CurrentUser.class,
                            String.class);

            return constructor.newInstance(
                    this.applicationContext, sessionCloser, messageSender, currentUser, destination);
        } catch (Exception ex) {
            throw new WebSocketException(ex);
        }
    }

    private BiConsumer<CommonFrameType, Object> messageSender(
            WebSocketSession session, String destination, String subscriptionId) {
        return (CommonFrameType type, Object payload) -> {
            if (!session.isOpen()) {
                return;
            }
            try {
                CommonFrame commonFrame = new CommonFrame(type, payload);
                WebSocketMessage message =
                        CommonWebSocketUtils.encodeWebSocketMessage(
                                commonFrame, session.getId(), destination, subscriptionId);
                session.sendMessage(message);
                //                SimpMessagingTemplate simpMessagingTemplate =
                //                        this.applicationContext.getBean(SimpMessagingTemplate.class);
                //                simpMessagingTemplate.convertAndSend(destination, commonFrame);
            } catch (Exception ex) {
                throw new WebSocketException(ex);
            }
        };
    }

    private Runnable sessionCloser(WebSocketSession session) {
        return () -> {
            try {
                if (session.isOpen()) {
                    session.close(CloseStatus.NORMAL);
                }
            } catch (IOException e) {
                // no-op
            }
        };
    }
}
