package com.redadani1997.blazingkraft.ksqldb.dto.in.connector;

import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class KsqlDbConnectorCreateRequest {
    private String connectorName;

    private Boolean isSource;

    private Map<String, Object> properties;
}
