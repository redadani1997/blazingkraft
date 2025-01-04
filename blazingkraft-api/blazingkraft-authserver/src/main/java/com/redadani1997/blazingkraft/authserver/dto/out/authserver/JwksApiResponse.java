package com.redadani1997.blazingkraft.authserver.dto.out.authserver;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JwksApiResponse {

    private String kid;
    private String kty;
    private String alg;
    private String use;
    private String n;
    private String e;
}
