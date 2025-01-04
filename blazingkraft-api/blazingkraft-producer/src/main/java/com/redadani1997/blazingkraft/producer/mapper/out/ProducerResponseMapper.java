package com.redadani1997.blazingkraft.producer.mapper.out;

import com.redadani1997.blazingkraft.producer.mapper.out.blazing_producer.BlazingProducerResponseMapper;
import com.redadani1997.blazingkraft.producer.mapper.out.producer_configuration.ProducerConfigurationResponseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProducerResponseMapper {
    private final ProducerConfigurationResponseMapper producerConfigurationResponseMapper;
    private final BlazingProducerResponseMapper blazingProducerResponseMapper;

    public ProducerConfigurationResponseMapper producerConfigurationResponseMapper() {
        return this.producerConfigurationResponseMapper;
    }

    public BlazingProducerResponseMapper blazingProducerResponseMapper() {
        return this.blazingProducerResponseMapper;
    }
}
