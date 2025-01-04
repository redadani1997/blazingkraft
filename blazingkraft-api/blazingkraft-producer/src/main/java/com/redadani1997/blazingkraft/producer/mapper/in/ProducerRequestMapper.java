package com.redadani1997.blazingkraft.producer.mapper.in;

import com.redadani1997.blazingkraft.producer.mapper.in.blazing_producer.BlazingProducerRequestMapper;
import com.redadani1997.blazingkraft.producer.mapper.in.producer_configuration.ProducerConfigurationRequestMapper;
import com.redadani1997.blazingkraft.producer.mapper.in.producer_import.ProducerImportRequestMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProducerRequestMapper {
    private final ProducerConfigurationRequestMapper producerConfigurationRequestMapper;
    private final BlazingProducerRequestMapper blazingProducerRequestMapper;
    private final ProducerImportRequestMapper producerImportRequestMapper;

    public ProducerConfigurationRequestMapper producerConfigurationRequestMapper() {
        return this.producerConfigurationRequestMapper;
    }

    public BlazingProducerRequestMapper simpleProducerRequestMapper() {
        return this.blazingProducerRequestMapper;
    }

    public ProducerImportRequestMapper producerImportRequestMapper() {
        return this.producerImportRequestMapper;
    }
}
