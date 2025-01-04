package com.redadani1997.blazingkraft.connect.controller;

import com.redadani1997.blazingkraft.authorization.decorator.WithAuthorization;
import com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp;
import com.redadani1997.blazingkraft.client.decorator.WithKafkaConnectClient;
import com.redadani1997.blazingkraft.client.decorator.WithKafkaConnectCode;
import com.redadani1997.blazingkraft.common.actions.kafka_connect.PluginActions;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import com.redadani1997.blazingkraft.connect.dto.in.plugin.PluginGetConnectorConfigDefRequest;
import com.redadani1997.blazingkraft.connect.dto.in.plugin.PluginListConnectorPluginsRequest;
import com.redadani1997.blazingkraft.connect.dto.in.plugin.PluginValidateConfigsRequest;
import com.redadani1997.blazingkraft.connect.mapper.in.KafkaConnectRequestMapper;
import com.redadani1997.blazingkraft.connect.mapper.in.plugin.PluginRequestMapper;
import com.redadani1997.blazingkraft.connect.plugin.openapi.api.KafkaConnectPluginApi;
import com.redadani1997.blazingkraft.connect.plugin.openapi.model.ConfigInfosApiResponse;
import com.redadani1997.blazingkraft.connect.plugin.openapi.model.ConfigKeyInfoApiResponse;
import com.redadani1997.blazingkraft.connect.plugin.openapi.model.PluginInfoApiResponse;
import com.redadani1997.blazingkraft.connect.service.PluginService;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class KafkaConnectPluginController implements KafkaConnectPluginApi {

    private final PluginService pluginService;
    private final KafkaConnectRequestMapper kafkaConnectRequestMapper;

    @WithCleanUp
    @WithKafkaConnectCode
    @WithKafkaConnectClient
    @WithAuthorization(permission = PluginActions.DESCRIBE_PLUGINS, type = EntityType.KAFKA_CONNECT)
    @Override
    public ResponseEntity<List<ConfigKeyInfoApiResponse>> getConnectorConfigDef(String pluginName) {

        PluginGetConnectorConfigDefRequest request =
                this.pluginRequestMapper().pluginGetConnectorConfigDefRequest(pluginName);

        List<ConfigKeyInfoApiResponse> responses = this.pluginService.getConnectorConfigDef(request);

        return ResponseEntity.ok(responses);
    }

    @WithCleanUp
    @WithKafkaConnectCode
    @WithKafkaConnectClient
    @WithAuthorization(permission = PluginActions.DESCRIBE_PLUGINS, type = EntityType.KAFKA_CONNECT)
    @Override
    public ResponseEntity<List<PluginInfoApiResponse>> listConnectorPlugins(Boolean connectorsOnly) {

        PluginListConnectorPluginsRequest request =
                this.pluginRequestMapper().pluginListConnectorPluginsRequest(connectorsOnly);

        List<PluginInfoApiResponse> responses = this.pluginService.listConnectorPlugins(request);

        return ResponseEntity.ok(responses);
    }

    @WithCleanUp
    @WithKafkaConnectCode
    @WithKafkaConnectClient
    @WithAuthorization(
            permission = PluginActions.VALIDATE_PLUGIN_CONFIG,
            type = EntityType.KAFKA_CONNECT)
    @Override
    public ResponseEntity<ConfigInfosApiResponse> validateConfigs(
            String pluginName, Map<String, String> requestBody) {

        PluginValidateConfigsRequest request =
                this.pluginRequestMapper().pluginValidateConfigsRequest(pluginName, requestBody);

        ConfigInfosApiResponse response = this.pluginService.validateConfigs(request);

        return ResponseEntity.ok(response);
    }

    private PluginRequestMapper pluginRequestMapper() {
        return this.kafkaConnectRequestMapper.pluginRequestMapper();
    }
}
