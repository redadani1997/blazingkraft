package com.redadani1997.blazingkraft.producer.dto.in.producer_import;

import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProducerImportImprovedRecordRequest {
    private String key;

    private String value;

    private Map<String, Object> headers;

    private String topic;
    private Integer partition;
}
