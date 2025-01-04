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
public class KsqlDbEditorRequest {
    private String sql;

    private Map<String, Object> properties;
}
