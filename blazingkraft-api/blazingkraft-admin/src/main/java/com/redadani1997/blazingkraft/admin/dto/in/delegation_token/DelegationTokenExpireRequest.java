package com.redadani1997.blazingkraft.admin.dto.in.delegation_token;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DelegationTokenExpireRequest {
    private byte[] hmac;
    private Long expiryTimePeriodMs;
}
