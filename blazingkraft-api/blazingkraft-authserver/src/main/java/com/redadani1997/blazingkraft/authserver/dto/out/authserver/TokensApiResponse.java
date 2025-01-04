package com.redadani1997.blazingkraft.authserver.dto.out.authserver;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TokensApiResponse {
    private String access_token;
    private String id_token;
    private String refresh_token;
    private String token_type;
    private Integer expires_in;
    private Integer refresh_expires_in;
    private String scope;
}
