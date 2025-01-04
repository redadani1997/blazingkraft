package com.redadani1997.blazingkraft.connect.dto.in.connect;

import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ConnectorPutConfigRequest {
    private String connector;
    private Map<String, String> requestBody;
}
