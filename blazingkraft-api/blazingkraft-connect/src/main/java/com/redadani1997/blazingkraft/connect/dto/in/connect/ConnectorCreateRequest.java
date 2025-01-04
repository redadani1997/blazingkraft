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
public class ConnectorCreateRequest {

    private Map<String, String> config;

    private String name;
}
