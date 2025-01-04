package com.redadani1997.blazingkraft.consumer.dto.in.consumer_configuration;

import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import java.util.Map;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ConsumerConfigurationUpdateRequest {

    private Boolean perRequestKeyDeserializer;
    private CommonSerde keyDeserializer;
    private Map<String, Object> keyDeserializerConfiguration;

    private Boolean perRequestValueDeserializer;
    private CommonSerde valueDeserializer;
    private Map<String, Object> valueDeserializerConfiguration;

    private Long pollTimeoutMs;

    private Map<String, Object> mainConfiguration;
}
