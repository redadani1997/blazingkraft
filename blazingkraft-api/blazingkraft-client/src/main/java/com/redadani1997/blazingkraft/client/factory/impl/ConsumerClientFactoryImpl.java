package com.redadani1997.blazingkraft.client.factory.impl;

import com.redadani1997.blazingkraft.client.factory.ConsumerClientFactory;
import com.redadani1997.blazingkraft.client.validator.ConsumerClientConfigurationValidator;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.consumer.Consumer;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.common.serialization.ByteArrayDeserializer;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ConsumerClientFactoryImpl implements ConsumerClientFactory {

    private final ConsumerClientConfigurationValidator consumerClientConfigurationValidator;

    @Override
    public Consumer<byte[], byte[]> createConsumerClient(Map<String, Object> configuration) {
        Map<String, Object> computedConfiguration =
                this.consumerClientConfigurationValidator.validateAndCompute(configuration);

        Consumer<byte[], byte[]> consumer =
                new KafkaConsumer<>(
                        computedConfiguration, new ByteArrayDeserializer(), new ByteArrayDeserializer());

        return consumer;
    }
}
