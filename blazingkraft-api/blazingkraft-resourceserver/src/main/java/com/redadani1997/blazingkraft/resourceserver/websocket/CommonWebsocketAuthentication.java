package com.redadani1997.blazingkraft.resourceserver.websocket;

import com.redadani1997.blazingkraft.authorization.facade.CurrentUserFacade;
import com.redadani1997.blazingkraft.common.current_user.CurrentUser;
import com.redadani1997.blazingkraft.error.ws.WebSocketException;
import com.redadani1997.blazingkraft.resourceserver.configuration.CommonAuthenticationManagerResolver;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.oauth2.server.resource.authentication.BearerTokenAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;

@Component
public class CommonWebsocketAuthentication {
    private final AuthenticationManager authenticationManager;
    private final CurrentUserFacade currentUserFacade;

    public CommonWebsocketAuthentication(
            CommonAuthenticationManagerResolver commonAuthenticationManagerResolver,
            CurrentUserFacade currentUserFacade) {
        this.authenticationManager =
                commonAuthenticationManagerResolver
                        .getJwtIssuerAuthenticationManagerResolver()
                        .resolve(null);
        this.currentUserFacade = currentUserFacade;
    }

    public CurrentUser authenticate(String authorization) {
        if (authorization == null) {
            throw new WebSocketException("Authorization header is required");
        }
        if (!authorization.startsWith("Bearer ")) {
            throw new WebSocketException("Authorization header must start with Bearer");
        }
        String token = authorization.substring("Bearer ".length());
        BearerTokenAuthenticationToken authenticationRequest =
                new BearerTokenAuthenticationToken(token);

        JwtAuthenticationToken authentication =
                (JwtAuthenticationToken) this.authenticationManager.authenticate(authenticationRequest);
        return this.currentUserFacade.constructCurrentUser(authentication);
    }
}
