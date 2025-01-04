package com.redadani1997.blazingkraft.resourceserver.configuration;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

// @Component
// @Qualifier("commonCorsConfiguration")
public class CommonCorsConfiguration extends UrlBasedCorsConfigurationSource {

    public CommonCorsConfiguration() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        this.registerCorsConfiguration("/**", config);
    }
}
