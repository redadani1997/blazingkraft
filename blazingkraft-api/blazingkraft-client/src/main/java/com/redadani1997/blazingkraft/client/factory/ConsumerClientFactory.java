package com.redadani1997.blazingkraft.client.factory;

import java.util.Map;
import org.apache.kafka.clients.consumer.Consumer;

public interface ConsumerClientFactory {
    Consumer<byte[], byte[]> createConsumerClient(Map<String, Object> configuration);
}
