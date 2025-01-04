// package com.redadani1997.blazingkraft.ws.oldgen;
//
// import com.redadani1997.blazingkraft.error.ws.WebSocketException;
// import com.redadani1997.blazingkraft.ws.frame.CommonFrame;
// import com.redadani1997.blazingkraft.ws.frame.CommonFrameType;
// import com.redadani1997.blazingkraft.ws.handler.CommonWebSocketHandler;
// import com.redadani1997.blazingkraft.ws.repository.CommonWebSocketHandlerRepository;
// import java.io.IOException;
// import java.lang.reflect.Constructor;
// import java.nio.ByteBuffer;
// import java.util.List;
// import java.util.Map;
// import java.util.concurrent.ConcurrentHashMap;
// import java.util.function.BiConsumer;
// import lombok.RequiredArgsConstructor;
// import org.springframework.context.ApplicationContext;
// import org.springframework.messaging.Message;
// import org.springframework.messaging.simp.SimpMessagingTemplate;
// import org.springframework.messaging.simp.stomp.StompDecoder;
// import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
// import org.springframework.messaging.support.MessageHeaderAccessor;
// import org.springframework.web.socket.*;
// import org.springframework.web.socket.handler.WebSocketHandlerDecorator;
// import org.springframework.web.socket.handler.WebSocketHandlerDecoratorFactory;
//
// @RequiredArgsConstructor
// public class DecoratorFactory implements WebSocketHandlerDecoratorFactory {
//    private final ApplicationContext applicationContext;
//    private final CommonWebSocketHandlerRepository commonWebSocketHandlerRepository;
//    private Map<String, CommonWebSocketHandler> handlers = new ConcurrentHashMap<>();
//
//    @Override
//    public WebSocketHandler decorate(WebSocketHandler handler) {
//        return new WebSocketHandlerDecorator(handler) {
//
//            @Override
//            public void handleMessage(WebSocketSession session, WebSocketMessage<?>
// webSocketMessage)
//                    throws Exception {
//                StompDecoder stompDecoder = new StompDecoder();
//                ByteBuffer byteBuffer = null;
//                if (webSocketMessage instanceof TextMessage) {
//                    byteBuffer = ByteBuffer.wrap(((TextMessage) webSocketMessage).asBytes());
//                } else if (webSocketMessage instanceof BinaryMessage) {
//                    byteBuffer = ((BinaryMessage) webSocketMessage).getPayload();
//                }
//                List<Message<byte[]>> decode = stompDecoder.decode(byteBuffer);
//
//                Message message = decode.get(0);
//
//                StompHeaderAccessor accessor =
//                        MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
//                if (accessor == null || accessor.getCommand() == null) {
//                    return;
//                }
//
//                String sessionId = session.getId();
//
//                switch (accessor.getCommand()) {
//                    case CONNECT -> {
//                        // no-op (for now)
//                    }
//                    case SUBSCRIBE -> {
//                        String destination = accessor.getDestination();
//                        CommonWebSocketHandler commonWebSocketHandler =
//                                instantiateHandler(session, destination, sessionId);
//
//                        String requestBody = extractRequestBody(accessor);
//
//                        handlers.put(sessionId, commonWebSocketHandler);
//                        handlers.get(sessionId).onSubscribe(requestBody);
//                    }
//                    case SEND -> {
//                        handlers.get(sessionId).onMessage(message.getPayload());
//                        return;
//                    }
//                    case DISCONNECT -> {
//                        CommonWebSocketHandler currentHandler = handlers.get(sessionId);
//                        if (currentHandler == null) {
//                            return;
//                        }
//                        currentHandler.onDisconnect();
//                        handlers.remove(sessionId);
//                    }
//                }
//                super.handleMessage(session, webSocketMessage);
//            }
//
//            @Override
//            public void afterConnectionEstablished(WebSocketSession session) throws Exception {
//                System.out.printf("Connection established: %s", session.getId());
//                //                session.close(CloseStatus.NORMAL);
//                super.afterConnectionEstablished(session);
//            }
//
//            @Override
//            public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus)
//                    throws Exception {
//                System.out.printf("Connection closed: %s", session.getId());
//                super.afterConnectionClosed(session, closeStatus);
//            }
//        };
//    }
//
//    private String extractRequestBody(StompHeaderAccessor accessor) {
//        if (accessor.containsNativeHeader("requestBody")) {
//            return accessor.getFirstNativeHeader("requestBody");
//        }
//        return null;
//    }
//
//    private CommonWebSocketHandler instantiateHandler(
//            WebSocketSession session, String destination, String sessionId) {
//        try {
//            Runnable sessionCloser = this.sessionCloser(session);
//            BiConsumer<CommonFrameType, Object> messageSender = this.messageSender(destination);
//
//            Class<? extends CommonWebSocketHandler> clazz =
//                    this.commonWebSocketHandlerRepository.get(destination);
//
//            Constructor<? extends CommonWebSocketHandler> constructor =
//                    clazz.getConstructor(
//                            ApplicationContext.class, Runnable.class, BiConsumer.class,
// String.class);
//
//            return constructor.newInstance(
//                    this.applicationContext, sessionCloser, messageSender, destination);
//        } catch (Exception ex) {
//            throw new WebSocketException(ex);
//        }
//    }
//
//    private BiConsumer<CommonFrameType, Object> messageSender(String destination) {
//        return (CommonFrameType type, Object payload) -> {
//            CommonFrame commonFrame = new CommonFrame(type, payload);
//            SimpMessagingTemplate simpMessagingTemplate =
//                    this.applicationContext.getBean(SimpMessagingTemplate.class);
//            simpMessagingTemplate.convertAndSend(destination, commonFrame);
//        };
//    }
//
//    private Runnable sessionCloser(WebSocketSession session) {
//        return () -> {
//            try {
//                session.close(CloseStatus.GOING_AWAY);
//            } catch (IOException e) {
//                // no-op
//            }
//        };
//    }
// }
