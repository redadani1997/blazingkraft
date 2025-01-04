package com.redadani1997.blazingkraft.resourceserver.configuration;

import com.redadani1997.blazingkraft.cache.service.OIDCProviderCache;
import com.redadani1997.blazingkraft.common.util.CommonLogUtils;
import com.redadani1997.blazingkraft.common.util.CommonRequestUtils;
import com.redadani1997.blazingkraft.error.resourceserver.InvalidIssuerException;
import java.util.concurrent.ConcurrentHashMap;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationManagerResolver;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationProvider;
import org.springframework.security.oauth2.server.resource.authentication.JwtIssuerAuthenticationManagerResolver;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class CommonAuthenticationManagerResolver {
    private final ConcurrentHashMap<String, AuthenticationManager> managerByIssuer;
    private final JwtIssuerAuthenticationManagerResolver jwtIssuerAuthenticationManagerResolver;
    private final OIDCProviderCache oidcProviderCache;

    public CommonAuthenticationManagerResolver(OIDCProviderCache oidcProviderCache) {
        this.oidcProviderCache = oidcProviderCache;
        this.managerByIssuer = new ConcurrentHashMap<>();
        this.jwtIssuerAuthenticationManagerResolver =
                new JwtIssuerAuthenticationManagerResolver(this.authenticationManagerResolver());
    }

    public JwtIssuerAuthenticationManagerResolver getJwtIssuerAuthenticationManagerResolver() {
        return this.jwtIssuerAuthenticationManagerResolver;
    }

    public void invalidateIssuers() {
        this.managerByIssuer.clear();
    }

    private AuthenticationManagerResolver<String> authenticationManagerResolver() {
        return issuer -> {
            AuthenticationManager manager =
                    this.managerByIssuer.computeIfAbsent(
                            issuer,
                            (key) -> {
                                boolean issuerRegistered =
                                        issuer.equals(this.resolveBlazingKraftIssuer())
                                                || this.oidcProviderCache.get().stream()
                                                        .anyMatch(oidcProvider -> oidcProvider.getIssuer().equals(issuer));

                                if (!issuerRegistered) {
                                    String error =
                                            String.format(
                                                    "Issuer '%s' is not registered in the trusted OIDC Providers List!!",
                                                    issuer);
                                    String errorMessage = CommonLogUtils.getError(error);
                                    log.error(errorMessage);
                                    throw new InvalidIssuerException(error);
                                }

                                JwtAuthenticationProvider authenticationProvider =
                                        new JwtAuthenticationProvider(JwtDecoders.fromOidcIssuerLocation(issuer));
                                return authenticationProvider::authenticate;
                            });

            return manager;
        };
    }

    private String resolveBlazingKraftIssuer() {
        String currentPath = CommonRequestUtils.currentPath();
        return currentPath + "/v1/oauth2";
    }
}
