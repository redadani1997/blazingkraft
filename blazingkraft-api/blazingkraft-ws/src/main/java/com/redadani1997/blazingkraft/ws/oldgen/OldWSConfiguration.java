// package com.redadani1997.blazingkraft.ws.oldgen;
//
// import java.util.List;
// import org.springframework.web.socket.*;
// import org.springframework.web.socket.config.annotation.EnableWebSocket;
// import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
// import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
// import org.springframework.web.socket.handler.TextWebSocketHandler;
//
//// @Configuration
// @EnableWebSocket
// public class OldWSConfiguration implements WebSocketConfigurer {
//    @Override
//    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
//        registry.addHandler(new CustomHandler(), "/ws").setAllowedOriginPatterns("*");
//    }
//
//    private class CustomHandler extends TextWebSocketHandler implements SubProtocolCapable {
//        @Override
//        public void afterConnectionEstablished(WebSocketSession session) throws Exception {
//            super.afterConnectionEstablished(session);
//        }
//
//        @Override
//        public void handleMessage(WebSocketSession session, WebSocketMessage<?> message)
//                throws Exception {
//            super.handleMessage(session, message);
//        }
//
//        @Override
//        protected void handleTextMessage(WebSocketSession session, TextMessage message)
//                throws Exception {
//            super.handleTextMessage(session, message);
//        }
//
//        @Override
//        protected void handlePongMessage(WebSocketSession session, PongMessage message)
//                throws Exception {
//            super.handlePongMessage(session, message);
//        }
//
//        @Override
//        public void handleTransportError(WebSocketSession session, Throwable exception)
//                throws Exception {
//            super.handleTransportError(session, exception);
//        }
//
//        @Override
//        public void afterConnectionClosed(WebSocketSession session, CloseStatus status)
//                throws Exception {
//            super.afterConnectionClosed(session, status);
//        }
//
//        @Override
//        public boolean supportsPartialMessages() {
//            return super.supportsPartialMessages();
//        }
//
//        @Override
//        public List<String> getSubProtocols() {
//            return List.of("blazingws-protocol");
//        }
//    }
// }
