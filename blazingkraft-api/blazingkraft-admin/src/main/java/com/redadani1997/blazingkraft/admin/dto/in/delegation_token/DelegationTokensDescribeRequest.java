package com.redadani1997.blazingkraft.admin.dto.in.delegation_token;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.kafka.common.security.auth.KafkaPrincipal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DelegationTokensDescribeRequest {
    private List<KafkaPrincipal> owners;
}
