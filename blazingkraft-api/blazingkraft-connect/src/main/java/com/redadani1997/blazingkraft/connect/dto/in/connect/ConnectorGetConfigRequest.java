package com.redadani1997.blazingkraft.connect.dto.in.connect;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ConnectorGetConfigRequest {
    private String connector;
}
