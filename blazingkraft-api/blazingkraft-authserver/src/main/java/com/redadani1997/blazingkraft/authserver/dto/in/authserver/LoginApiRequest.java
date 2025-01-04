package com.redadani1997.blazingkraft.authserver.dto.in.authserver;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginApiRequest {
    private String email;
    private String password;
    private String client_id;
    private String grant_type;
}
