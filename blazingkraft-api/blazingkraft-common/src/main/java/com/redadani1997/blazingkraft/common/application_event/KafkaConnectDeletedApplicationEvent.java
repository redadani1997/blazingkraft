package com.redadani1997.blazingkraft.common.application_event;

import lombok.Data;

@Data
public class KafkaConnectDeletedApplicationEvent {
    private final String kafkaConnectCode;
}
