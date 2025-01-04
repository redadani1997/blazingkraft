package com.redadani1997.blazingkraft.client.model.cluster;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ClusterClients {
    private CommonAdminClient adminClient;

    private CommonProducerClient producerClient;
    private CommonConsumerClient consumerClient;
}
