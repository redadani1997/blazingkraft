package com.redadani1997.blazingkraft.connect.mapper.out;

import com.redadani1997.blazingkraft.connect.mapper.out.connector.ConnectorResponseMapper;
import com.redadani1997.blazingkraft.connect.mapper.out.plugin.PluginResponseMapper;
import com.redadani1997.blazingkraft.connect.mapper.out.server.KafkaConnectServerResponseMapper;
import com.redadani1997.blazingkraft.connect.mapper.out.task.TaskResponseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class KafkaConnectResponseMapper {
    private final PluginResponseMapper pluginResponseMapper;
    private final ConnectorResponseMapper connectorResponseMapper;
    private final TaskResponseMapper taskResponseMapper;
    private final KafkaConnectServerResponseMapper kafkaConnectServerResponseMapper;

    public TaskResponseMapper taskResponseMapper() {
        return this.taskResponseMapper;
    }

    public PluginResponseMapper pluginResponseMapper() {
        return this.pluginResponseMapper;
    }

    public ConnectorResponseMapper connectorResponseMapper() {
        return this.connectorResponseMapper;
    }

    public KafkaConnectServerResponseMapper kafkaConnectServerResponseMapper() {
        return this.kafkaConnectServerResponseMapper;
    }
}
