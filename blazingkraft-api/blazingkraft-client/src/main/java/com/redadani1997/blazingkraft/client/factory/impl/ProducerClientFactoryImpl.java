package com.redadani1997.blazingkraft.client.factory.impl;

import com.redadani1997.blazingkraft.client.factory.ProducerClientFactory;
import com.redadani1997.blazingkraft.client.validator.ProducerClientConfigurationValidator;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.common.serialization.ByteArraySerializer;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProducerClientFactoryImpl implements ProducerClientFactory {

    private final ProducerClientConfigurationValidator producerClientConfigurationValidator;

    @Override
    public Producer<byte[], byte[]> createProducerClient(Map<String, Object> configuration) {
        Map<String, Object> computedConfiguration =
                this.producerClientConfigurationValidator.validateAndCompute(configuration);

        KafkaProducer<byte[], byte[]> producer =
                new KafkaProducer<>(
                        computedConfiguration, new ByteArraySerializer(), new ByteArraySerializer());

        return producer;
    }
}
