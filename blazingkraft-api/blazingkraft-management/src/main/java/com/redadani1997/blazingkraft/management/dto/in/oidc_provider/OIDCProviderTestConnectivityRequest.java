package com.redadani1997.blazingkraft.management.dto.in.oidc_provider;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OIDCProviderTestConnectivityRequest {
    private String issuer;
}
