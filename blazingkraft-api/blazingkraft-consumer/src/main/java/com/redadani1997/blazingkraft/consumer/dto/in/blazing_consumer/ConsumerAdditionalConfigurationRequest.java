package com.redadani1997.blazingkraft.consumer.dto.in.blazing_consumer;

import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ConsumerAdditionalConfigurationRequest {

    private String schemaRegistryCode;

    private CommonSerde keyDeserializer;
    private Map<String, Object> keyDeserializerConfiguration;

    private CommonSerde valueDeserializer;
    private Map<String, Object> valueDeserializerConfiguration;
}
