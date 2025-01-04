package com.redadani1997.blazingkraft.resourceserver.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CommonOAuth2ResourceServerConfigurerCustomizer
        implements Customizer<OAuth2ResourceServerConfigurer<HttpSecurity>> {

    private final CommonAuthorizeHttpRequestsConfigurerCustomizer
            commonAuthorizeHttpRequestsConfigurerCustomizer;
    private final CommonAuthenticationEntryPoint commonAuthenticationEntryPoint;
    private final CommonAuthenticationManagerResolver commonAuthenticationManagerResolver;

    @Override
    public void customize(OAuth2ResourceServerConfigurer<HttpSecurity> oauth2) {
        try {
            oauth2
                    .authenticationManagerResolver(
                            this.commonAuthenticationManagerResolver.getJwtIssuerAuthenticationManagerResolver())
                    .authenticationEntryPoint(commonAuthenticationEntryPoint)
                    .and()
                    .authorizeHttpRequests(this.commonAuthorizeHttpRequestsConfigurerCustomizer)
                    .cors()
                    //                    .configurationSource(this.commonCorsConfiguration)
                    .and()
                    .formLogin(AbstractHttpConfigurer::disable)
                    .csrf(AbstractHttpConfigurer::disable);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
