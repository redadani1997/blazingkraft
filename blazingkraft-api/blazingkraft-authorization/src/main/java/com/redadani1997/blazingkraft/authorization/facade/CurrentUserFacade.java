package com.redadani1997.blazingkraft.authorization.facade;

import com.redadani1997.blazingkraft.common.current_user.CurrentUser;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

public interface CurrentUserFacade {
    CurrentUser currentUser();

    CurrentUser constructCurrentUser(JwtAuthenticationToken authentication);

    void setCurrentWSUser(CurrentUser currentUser);

    void cleanUp();
}
