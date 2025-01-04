package com.redadani1997.blazingkraft.ws.configuration;

import com.redadani1997.blazingkraft.ws.decorator.CommonWebSocketDecoratorFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WSConfiguration implements WebSocketMessageBrokerConfigurer {

    private final CommonWebSocketDecoratorFactory commonWebSocketDecoratorFactory;

    @Override
    public void configureWebSocketTransport(WebSocketTransportRegistration registry) {
        registry.addDecoratorFactory(this.commonWebSocketDecoratorFactory);
        registry.setMessageSizeLimit(64 * 1024); // default : 64 * 1024
        registry.setSendTimeLimit(20 * 10000); // default : 10 * 10000
        registry.setSendBufferSizeLimit(2 * 1024 * 1024); // default : 512 * 1024
        WebSocketMessageBrokerConfigurer.super.configureWebSocketTransport(registry);
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.setApplicationDestinationPrefixes("/blazingkraft");
        config.enableSimpleBroker("/queue");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry
                .addEndpoint("/ws")
                .setAllowedOriginPatterns("*")
                .withSockJS()
                .setSessionCookieNeeded(false);
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        //        registration.interceptors(commonChannelInterceptor);
        //        this.clientInboundChannel(this.clientInboundChannelExecutor());
        //        this.clientOutboundChannel(this.clientOutboundChannelExecutor());
    }

    @Override
    public void configureClientOutboundChannel(ChannelRegistration registration) {
        //        registration.interceptors(commonChannelInterceptor);
    }
}
