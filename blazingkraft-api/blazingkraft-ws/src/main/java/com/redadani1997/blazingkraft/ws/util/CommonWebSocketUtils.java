package com.redadani1997.blazingkraft.ws.util;

import com.redadani1997.blazingkraft.common.util.CommonByteUtils;
import com.redadani1997.blazingkraft.common.util.CommonCastingUtils;
import java.nio.ByteBuffer;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import lombok.experimental.UtilityClass;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompDecoder;
import org.springframework.messaging.simp.stomp.StompEncoder;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.util.MimeType;
import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;

@UtilityClass
public class CommonWebSocketUtils {
    private static StompDecoder stompDecoder = new StompDecoder();
    private static StompEncoder stompEncoder = new StompEncoder();

    public static Optional<Message> fromWebSocketMessage(WebSocketMessage webSocketMessage) {
        ByteBuffer byteBuffer = null;
        if (webSocketMessage instanceof TextMessage) {
            byteBuffer = ByteBuffer.wrap(((TextMessage) webSocketMessage).asBytes());
        } else if (webSocketMessage instanceof BinaryMessage) {
            byteBuffer = ((BinaryMessage) webSocketMessage).getPayload();
        }
        List<Message<byte[]>> messages = stompDecoder.decode(byteBuffer);

        if (messages.size() == 0) {
            return Optional.empty();
        }
        return Optional.ofNullable(messages.get(0));
    }

    public static WebSocketMessage encodeWebSocketMessage(
            Object o, String sessionId, String destination, String subscriptionId) {
        String payload = CommonCastingUtils.toJsonString(o);
        //        MessageConverter converter = new SimpleMessageConverter();
        //                                SimpMessageHeaderAccessor simpMessageHeaderAccessor =
        //             SimpMessageHeaderAccessor.create(SimpMessageType.DISCONNECT_ACK);
        //                        StompHeaderAccessor headerAccessor =
        //             StompHeaderAccessor.getAccessor(simpMessageHeaderAccessor.getMessageHeaders(),
        //             StompHeaderAccessor.class);
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.create(StompCommand.MESSAGE);
        headerAccessor.setSessionId(sessionId);
        headerAccessor.setLeaveMutable(true);
        headerAccessor.setDestination(destination);
        headerAccessor.setSubscriptionId(subscriptionId);
        headerAccessor.setMessageId(UUID.randomUUID().toString());
        headerAccessor.setContentType(MimeType.valueOf("application/json"));

        MessageHeaders messageHeaders = headerAccessor.getMessageHeaders();

        MessageHeaderAccessor accessor =
                MessageHeaderAccessor.getAccessor(messageHeaders, MessageHeaderAccessor.class);
        //        if (accessor != null && accessor.isMutable()) {
        Message<byte[]> message =
                MessageBuilder.createMessage(
                        CommonByteUtils.toByteArray(payload), accessor.getMessageHeaders());
        //        }
        //        Message<?> message = converter.toMessage(payload, );
        //        Message<byte[]> message =
        //                MessageBuilder.createMessage(
        //                        CommonByteUtils.toByteArray(payload),
        // headerAccessor.getMessageHeaders());

        byte[] encode = stompEncoder.encode(message);

        String encoded = CommonByteUtils.toString(encode);

        return new TextMessage(encoded);
    }

    public static String extractRequestBody(StompHeaderAccessor accessor) {
        if (accessor.containsNativeHeader("requestBody")) {
            return accessor.getFirstNativeHeader("requestBody");
        }
        return null;
    }
}
