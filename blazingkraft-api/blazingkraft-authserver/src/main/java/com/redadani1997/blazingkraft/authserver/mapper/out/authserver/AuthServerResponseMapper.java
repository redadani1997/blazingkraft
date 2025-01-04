package com.redadani1997.blazingkraft.authserver.mapper.out.authserver;

import com.nimbusds.jose.jwk.RSAKey;
import com.redadani1997.blazingkraft.authserver.dto.out.authserver.JwksApiResponse;
import com.redadani1997.blazingkraft.authserver.dto.out.authserver.JwksKeysApiResponse;
import com.redadani1997.blazingkraft.authserver.dto.out.authserver.OpenIDConfigurationApiResponse;
import com.redadani1997.blazingkraft.authserver.dto.out.authserver.TokensApiResponse;
import com.redadani1997.blazingkraft.common.util.CommonRequestUtils;
import java.util.List;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
public class AuthServerResponseMapper {
    private final RSAKey rsaKey;

    public AuthServerResponseMapper(@Qualifier("authServerRSAKey") RSAKey rsaKey) {
        this.rsaKey = rsaKey;
    }

    public JwksKeysApiResponse jwksKeysApiResponse() {
        JwksApiResponse jwksApiResponse = new JwksApiResponse();

        jwksApiResponse.setAlg("RS256");
        jwksApiResponse.setKty("RSA");
        jwksApiResponse.setUse("sig");
        jwksApiResponse.setKid(rsaKey.getKeyID());
        jwksApiResponse.setN(String.valueOf(rsaKey.getModulus()));
        jwksApiResponse.setE(String.valueOf(rsaKey.getPublicExponent()));

        JwksKeysApiResponse jwksKeysApiResponse = new JwksKeysApiResponse();
        jwksKeysApiResponse.setKeys(List.of(jwksApiResponse));

        return jwksKeysApiResponse;
    }

    public TokensApiResponse tokensApiResponse(
            String idToken, String refreshToken, Long idTokenExpiration, Long refreshTokenExpiration) {
        TokensApiResponse loginApiResponse = new TokensApiResponse();

        loginApiResponse.setId_token(idToken);
        loginApiResponse.setAccess_token(idToken);
        loginApiResponse.setRefresh_token(refreshToken);
        loginApiResponse.setScope("openid");
        loginApiResponse.setToken_type("Bearer");
        loginApiResponse.setExpires_in((int) (idTokenExpiration / 1000));
        loginApiResponse.setRefresh_expires_in((int) (refreshTokenExpiration / 1000));

        return loginApiResponse;
    }

    public OpenIDConfigurationApiResponse openIDConfigurationApiResponse() {
        OpenIDConfigurationApiResponse openIDConfigurationApiResponse =
                new OpenIDConfigurationApiResponse();

        String currentPath = CommonRequestUtils.currentPath();

        openIDConfigurationApiResponse.setResponse_types_supported(List.of("id_token"));
        openIDConfigurationApiResponse.setIssuer(currentPath + "/v1/oauth2");
        openIDConfigurationApiResponse.setJwks_uri(currentPath + "/v1/oauth2/jwks");
        openIDConfigurationApiResponse.setToken_endpoint(currentPath + "/v1/oauth2/token");
        openIDConfigurationApiResponse.setGrant_types_supported(List.of("password", "refresh_token"));

        return openIDConfigurationApiResponse;
    }
}
