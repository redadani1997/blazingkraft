package com.redadani1997.blazingkraft.ksqldb.dto.in.editor;

import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class KsqlDbStreamQueryRequest {
    private String ksqlDbCode;
    private String sql;

    private Map<String, Object> properties;
}
