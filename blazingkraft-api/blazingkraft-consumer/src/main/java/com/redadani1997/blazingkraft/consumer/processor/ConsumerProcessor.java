package com.redadani1997.blazingkraft.consumer.processor;

import com.redadani1997.blazingkraft.consumer.dto.out.blazing_consumer.BlazingConsumptionResponse;
import java.util.Map;
import org.apache.kafka.clients.consumer.Consumer;

public interface ConsumerProcessor {

    default void preProcess(Map<String, Object> overrides) {}

    default Boolean doProcess(BlazingConsumptionResponse response) {
        return true;
    }

    default void postProcess(Consumer<byte[], byte[]> consumer) {}
}
