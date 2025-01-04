package com.redadani1997.blazingkraft.management.dto.in.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserEditPasswordWithoutCurrentRequest {
    private String email;
    private String password;
    private String passwordConfirm;
}
