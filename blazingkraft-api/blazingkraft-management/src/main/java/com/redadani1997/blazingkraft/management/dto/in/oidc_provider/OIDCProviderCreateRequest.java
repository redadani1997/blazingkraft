package com.redadani1997.blazingkraft.management.dto.in.oidc_provider;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OIDCProviderCreateRequest {
    private String code;
    private String name;
    private String issuer;
    private Boolean pkceEnabled;
    private String providerType;
    private String clientId;
    private String clientSecret;
    private String scopes;
}
