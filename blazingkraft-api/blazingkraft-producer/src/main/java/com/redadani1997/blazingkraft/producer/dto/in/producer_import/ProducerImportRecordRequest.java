package com.redadani1997.blazingkraft.producer.dto.in.producer_import;

import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProducerImportRecordRequest {
    private Object key;

    private Object value;

    private Map<String, Object> headers;

    private Map<String, Object> metadata;
}
