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
public class JwksKeysApiResponse {

    List<JwksApiResponse> keys;
}
