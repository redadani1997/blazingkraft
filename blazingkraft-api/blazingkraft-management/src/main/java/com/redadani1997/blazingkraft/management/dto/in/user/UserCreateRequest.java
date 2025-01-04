package com.redadani1997.blazingkraft.management.dto.in.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserCreateRequest {
    private String email;
    private String password;
    private String passwordConfirm;
    private String firstName;
    private String lastName;
    private String groupCode;
}
