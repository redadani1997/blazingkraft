package com.redadani1997.blazingkraft.ksqldb.dto.in.connector;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class KsqlDbConnectorDeleteRequest {
    private String connectorName;
}
