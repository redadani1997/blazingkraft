package com.redadani1997.blazingkraft.producer.dto.in.blazing_producer;

import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import java.util.Map;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProducerAdditionalConfigurationRequest {

    private String schemaRegistryCode;

    private CommonSerde keySerializer;
    private Map<String, Object> keySerializerConfiguration;

    private CommonSerde valueSerializer;
    private Map<String, Object> valueSerializerConfiguration;
}
