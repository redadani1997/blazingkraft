// package com.redadani1997.blazingkraft.resourceserver.configuration;
//
// import lombok.RequiredArgsConstructor;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
// import org.springframework.security.config.annotation.web.socket.EnableWebSocketSecurity;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import
// org.springframework.security.oauth2.server.resource.web.access.BearerTokenAccessDeniedHandler;
// import org.springframework.security.provisioning.InMemoryUserDetailsManager;
// import org.springframework.security.web.SecurityFilterChain;
//
// @Configuration
// @EnableWebSocketSecurity
// public class WebsocketSecurityConfiguration {
//    @Bean
//    AuthorizationManager<Message<?>>
// messageAuthorizationManager(MessageMatcherDelegatingAuthorizationManager.Builder messages) {
//        messages
//                .simpDestMatchers("/user/**").authenticated()
//
//        return messages.build();
//    }
// }
