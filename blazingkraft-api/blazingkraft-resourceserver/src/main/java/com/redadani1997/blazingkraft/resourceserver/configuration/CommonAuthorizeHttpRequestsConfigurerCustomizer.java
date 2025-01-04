package com.redadani1997.blazingkraft.resourceserver.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AuthorizeHttpRequestsConfigurer;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CommonAuthorizeHttpRequestsConfigurerCustomizer
        implements Customizer<
                AuthorizeHttpRequestsConfigurer<HttpSecurity>.AuthorizationManagerRequestMatcherRegistry> {

    @Override
    public void customize(
            AuthorizeHttpRequestsConfigurer<HttpSecurity>.AuthorizationManagerRequestMatcherRegistry
                    auth) {
        auth.requestMatchers(
                        "/v1/settings/properties", "/v1/oauth2/**", "/ws/**", "/actuator/**", "/health")
                .permitAll()
                .anyRequest()
                .authenticated();
    }
}
