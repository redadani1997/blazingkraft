package com.redadani1997.blazingkraft.authserver.service;

import com.redadani1997.blazingkraft.authserver.dto.in.authserver.LoginRequest;
import com.redadani1997.blazingkraft.authserver.dto.in.authserver.RefreshTokenRequest;
import com.redadani1997.blazingkraft.authserver.dto.out.authserver.JwksKeysApiResponse;
import com.redadani1997.blazingkraft.authserver.dto.out.authserver.OpenIDConfigurationApiResponse;
import com.redadani1997.blazingkraft.authserver.dto.out.authserver.TokensApiResponse;

public interface AuthServerService {

    TokensApiResponse login(LoginRequest request);

    JwksKeysApiResponse getJwks();

    OpenIDConfigurationApiResponse getOpenIdConfiguration();

    TokensApiResponse refreshToken(RefreshTokenRequest refreshToken);
}
