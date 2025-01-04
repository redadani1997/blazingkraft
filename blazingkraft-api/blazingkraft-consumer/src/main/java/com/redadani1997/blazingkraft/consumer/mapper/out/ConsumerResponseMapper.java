package com.redadani1997.blazingkraft.consumer.mapper.out;

import com.redadani1997.blazingkraft.consumer.mapper.out.blazing_consumer.BlazingConsumerResponseMapper;
import com.redadani1997.blazingkraft.consumer.mapper.out.consumer_configuration.ConsumerConfigurationResponseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ConsumerResponseMapper {
    private final ConsumerConfigurationResponseMapper consumerConfigurationResponseMapper;
    private final BlazingConsumerResponseMapper blazingConsumerResponseMapper;

    public ConsumerConfigurationResponseMapper consumerConfigurationResponseMapper() {
        return this.consumerConfigurationResponseMapper;
    }

    public BlazingConsumerResponseMapper blazingConsumerResponseMapper() {
        return this.blazingConsumerResponseMapper;
    }
}
