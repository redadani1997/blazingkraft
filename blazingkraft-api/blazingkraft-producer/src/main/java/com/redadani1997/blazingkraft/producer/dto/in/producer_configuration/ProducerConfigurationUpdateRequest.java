package com.redadani1997.blazingkraft.producer.dto.in.producer_configuration;

import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import java.util.HashMap;
import java.util.Map;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ProducerConfigurationUpdateRequest {

    private Boolean perRequestKeySerializer;
    private CommonSerde keySerializer;
    private Map<String, Object> keySerializerConfiguration;

    private Boolean perRequestValueSerializer;
    private CommonSerde valueSerializer;
    private Map<String, Object> valueSerializerConfiguration;

    private Map<String, Object> mainConfiguration;

    public Map<String, Object> mergedConfiguration() {
        Map<String, Object> mergedConfiguration = new HashMap<>();

        mergedConfiguration.putAll(this.mainConfiguration);

        return mergedConfiguration;
    }
}
