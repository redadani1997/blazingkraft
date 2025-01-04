package com.redadani1997.blazingkraft.management.dto.in.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserEditRequest {
    private String currentEmail;

    private String newEmail;
    private String firstName;
    private String lastName;
    private String groupCode;
}
