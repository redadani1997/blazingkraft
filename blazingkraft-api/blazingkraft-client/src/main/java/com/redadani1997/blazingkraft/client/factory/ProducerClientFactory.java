package com.redadani1997.blazingkraft.client.factory;

import java.util.Map;
import org.apache.kafka.clients.producer.Producer;

public interface ProducerClientFactory {
    Producer<byte[], byte[]> createProducerClient(Map<String, Object> configuration);
}
