// package com.redadani1997.blazingkraft.ws.oldgen;
//
// import com.redadani1997.blazingkraft.error.ws.WebSocketException;
// import com.redadani1997.blazingkraft.ws.frame.CommonFrame;
// import com.redadani1997.blazingkraft.ws.frame.CommonFrameType;
// import com.redadani1997.blazingkraft.ws.handler.CommonWebSocketHandler;
// import com.redadani1997.blazingkraft.ws.repository.CommonWebSocketHandlerRepository;
// import java.lang.reflect.Constructor;
// import java.util.Map;
// import java.util.concurrent.ConcurrentHashMap;
// import java.util.function.BiConsumer;
// import lombok.RequiredArgsConstructor;
// import org.springframework.context.ApplicationContext;
// import org.springframework.messaging.Message;
// import org.springframework.messaging.MessageChannel;
// import org.springframework.messaging.simp.SimpMessagingTemplate;
// import org.springframework.messaging.simp.stomp.StompCommand;
// import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
// import org.springframework.messaging.support.ChannelInterceptor;
// import org.springframework.messaging.support.MessageBuilder;
// import org.springframework.messaging.support.MessageHeaderAccessor;
// import org.springframework.stereotype.Component;
//
// @Component
// @RequiredArgsConstructor
// public class CommonChannelInterceptor implements ChannelInterceptor {
//    private final ApplicationContext applicationContext;
//    private final CommonWebSocketHandlerRepository commonWebSocketHandlerRepository;
//    private Map<String, CommonWebSocketHandler> handlers = new ConcurrentHashMap<>();
//
//    @Override
//    public Message<?> preSend(Message<?> message, MessageChannel channel) {
//        StompHeaderAccessor accessor =
//                MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
//        if (accessor == null || accessor.getCommand() == null || accessor.getSessionId() == null)
// {
//            return message;
//        }
//        String sessionId = accessor.getSessionId();
//
//        return switch (accessor.getCommand()) {
//            case CONNECT -> {
//                // no-op (for now)
//                yield message;
//            }
//            case SUBSCRIBE -> {
//                String destination = accessor.getDestination();
//                CommonWebSocketHandler commonWebSocketHandler =
//                        this.instantiateHandler(channel, destination, sessionId);
//
//                String requestBody = this.extractRequestBody(accessor);
//
//                handlers.put(sessionId, commonWebSocketHandler);
//                handlers.get(sessionId).onSubscribe(requestBody);
//                yield message;
//            }
//            case SEND -> {
//                handlers.get(sessionId).onMessage(message.getPayload());
//                yield null;
//            }
//            case DISCONNECT -> {
//                CommonWebSocketHandler currentHandler = handlers.get(sessionId);
//                if (currentHandler == null) {
//                    yield message;
//                }
//                currentHandler.onDisconnect();
//                handlers.remove(sessionId);
//                yield message;
//            }
//            default -> message;
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
//            MessageChannel channel, String destination, String sessionId) {
//        try {
//            Runnable sessionCloser = this.sessionCloser(channel, sessionId);
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
//    private Runnable sessionCloser(MessageChannel channel, String sessionId) {
//        return () -> {
//            //            SimpMessageHeaderAccessor simpMessageHeaderAccessor =
//            // SimpMessageHeaderAccessor.create(SimpMessageType.DISCONNECT_ACK);
//            //            StompHeaderAccessor headerAccessor =
//            // StompHeaderAccessor.getAccessor(simpMessageHeaderAccessor.getMessageHeaders(),
//            // StompHeaderAccessor.class);
//            StompHeaderAccessor headerAccessor =
// StompHeaderAccessor.create(StompCommand.DISCONNECT);
//            headerAccessor.setSessionId(sessionId);
//            headerAccessor.setLeaveMutable(true);
//            //            headerAccessor.setReceiptId(sessionId);
//            //            headerAccessor.setReceipt(sessionId);
//            Message<?> disconnectMessage =
//                    MessageBuilder.createMessage("TEST@@@@@", headerAccessor.getMessageHeaders());
//            channel.send(disconnectMessage);
//        };
//    }
// }
