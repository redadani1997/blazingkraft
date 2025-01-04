package com.redadani1997.blazingkraft.connect.mapper.in;

import com.redadani1997.blazingkraft.connect.mapper.in.connector.ConnectorRequestMapper;
import com.redadani1997.blazingkraft.connect.mapper.in.plugin.PluginRequestMapper;
import com.redadani1997.blazingkraft.connect.mapper.in.server.KafkaConnectServerRequestMapper;
import com.redadani1997.blazingkraft.connect.mapper.in.task.TaskRequestMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class KafkaConnectRequestMapper {
    private final PluginRequestMapper pluginRequestMapper;
    private final ConnectorRequestMapper connectorRequestMapper;
    private final TaskRequestMapper taskRequestMapper;
    private final KafkaConnectServerRequestMapper kafkaConnectServerRequestMapper;

    public TaskRequestMapper taskRequestMapper() {
        return this.taskRequestMapper;
    }

    public PluginRequestMapper pluginRequestMapper() {
        return this.pluginRequestMapper;
    }

    public ConnectorRequestMapper connectorRequestMapper() {
        return this.connectorRequestMapper;
    }

    public KafkaConnectServerRequestMapper kafkaConnectServerRequestMapper() {
        return this.kafkaConnectServerRequestMapper;
    }
}
