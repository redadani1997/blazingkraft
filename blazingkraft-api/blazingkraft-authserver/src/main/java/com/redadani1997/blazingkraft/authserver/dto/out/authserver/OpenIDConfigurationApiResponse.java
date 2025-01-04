package com.redadani1997.blazingkraft.authserver.dto.out.authserver;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OpenIDConfigurationApiResponse {

    private String issuer;
    private List<String> grant_types_supported;
    private List<String> response_types_supported;
    private String token_endpoint;
    private String jwks_uri;
}
