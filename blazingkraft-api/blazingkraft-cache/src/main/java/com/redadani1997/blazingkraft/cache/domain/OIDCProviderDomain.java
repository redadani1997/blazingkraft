package com.redadani1997.blazingkraft.cache.domain;

import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class OIDCProviderDomain {

    private String code;
    private String name;
    private String issuer;
    private Boolean pkceEnabled;
    private String providerType;
    private String clientId;
    private String clientSecret;
    private List<String> scopes;
    private boolean isSystem;
}
