package com.redadani1997.blazingkraft.consumer.dto.in.consumer_export;

import java.util.Map;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ConsumerExportRecordRequest {
    private Object key;

    private Object value;

    private Map<String, Object> headers;

    private Map<String, Object> metadata;
}
