package com.redadani1997.blazingkraft.authserver.mapper.in.authserver;

import com.redadani1997.blazingkraft.authserver.dto.in.authserver.LoginApiRequest;
import com.redadani1997.blazingkraft.authserver.dto.in.authserver.LoginRequest;
import com.redadani1997.blazingkraft.authserver.dto.in.authserver.RefreshTokenRequest;
import com.redadani1997.blazingkraft.common.validator.CommonValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthServerRequestMapper {

    public LoginRequest loginRequest(LoginApiRequest apiRequest) {
        CommonValidator.assertNotBlank("email", apiRequest.getEmail());
        CommonValidator.assertNotBlank("password", apiRequest.getEmail());
        CommonValidator.assertEquals("grant_type", apiRequest.getGrant_type(), "password");
        CommonValidator.assertEquals("client_id", apiRequest.getClient_id(), "blazingkraft-ui");

        return LoginRequest.builder()
                .email(apiRequest.getEmail())
                .password(apiRequest.getPassword())
                .clientId(apiRequest.getClient_id())
                .grantType(apiRequest.getGrant_type())
                .build();
    }

    public RefreshTokenRequest refreshTokenRequest(String blazingKafkaRefreshToken) {
        CommonValidator.assertNotBlank("blazingkraft_refresh_token Cookie", blazingKafkaRefreshToken);

        RefreshTokenRequest request = new RefreshTokenRequest();

        request.setRefreshToken(blazingKafkaRefreshToken);

        return request;
    }
}
