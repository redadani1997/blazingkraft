package com.redadani1997.blazingkraft.resourceserver.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.server.resource.web.access.BearerTokenAccessDeniedHandler;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class ResourceServerConfiguration {

    private final CommonOAuth2ResourceServerConfigurerCustomizer
            commonOAuth2ResourceServerConfigurerCustomizer;
    private final CommonAuthenticationEntryPoint commonAuthenticationEntryPoint;

    //    private final CommonCorsConfiguration commonCorsConfiguration;

    @Bean
    public SecurityFilterChain resourceServerFilterChain(HttpSecurity http) throws Exception {
        return http.oauth2ResourceServer(this.commonOAuth2ResourceServerConfigurerCustomizer)
                .sessionManagement(
                        session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .httpBasic()
                .disable()
                .exceptionHandling(
                        exceptions -> {
                            exceptions.authenticationEntryPoint(this.commonAuthenticationEntryPoint);
                            exceptions.accessDeniedHandler(new BearerTokenAccessDeniedHandler());
                        })
                //                .cors()
                //                .configurationSource(this.commonCorsConfiguration)
                //                .and()
                //                .formLogin(AbstractHttpConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable)
                .build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return new InMemoryUserDetailsManager();
    }
}
