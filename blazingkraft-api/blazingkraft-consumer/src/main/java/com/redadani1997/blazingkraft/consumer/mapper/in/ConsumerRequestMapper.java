package com.redadani1997.blazingkraft.consumer.mapper.in;

import com.redadani1997.blazingkraft.consumer.mapper.in.blazing_consumer.BlazingConsumerRequestMapper;
import com.redadani1997.blazingkraft.consumer.mapper.in.consumer_configuration.ConsumerConfigurationRequestMapper;
import com.redadani1997.blazingkraft.consumer.mapper.in.consumer_export.ConsumerExportRequestMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ConsumerRequestMapper {
    private final ConsumerConfigurationRequestMapper consumerConfigurationRequestMapper;
    private final BlazingConsumerRequestMapper blazingConsumerRequestMapper;
    private final ConsumerExportRequestMapper consumerExportRequestMapper;

    public ConsumerConfigurationRequestMapper consumerConfigurationRequestMapper() {
        return this.consumerConfigurationRequestMapper;
    }

    public BlazingConsumerRequestMapper blazingConsumerRequestMapper() {
        return this.blazingConsumerRequestMapper;
    }

    public ConsumerExportRequestMapper consumerExportRequestMapper() {
        return this.consumerExportRequestMapper;
    }
}
