package com.redadani1997.blazingkraft.connect.service.impl;

import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.connect.CommonKafkaConnectClient;
import com.redadani1997.blazingkraft.connect.dto.in.plugin.PluginGetConnectorConfigDefRequest;
import com.redadani1997.blazingkraft.connect.dto.in.plugin.PluginListConnectorPluginsRequest;
import com.redadani1997.blazingkraft.connect.dto.in.plugin.PluginValidateConfigsRequest;
import com.redadani1997.blazingkraft.connect.mapper.out.KafkaConnectResponseMapper;
import com.redadani1997.blazingkraft.connect.mapper.out.plugin.PluginResponseMapper;
import com.redadani1997.blazingkraft.connect.plugin.openapi.model.ConfigInfosApiResponse;
import com.redadani1997.blazingkraft.connect.plugin.openapi.model.ConfigKeyInfoApiResponse;
import com.redadani1997.blazingkraft.connect.plugin.openapi.model.PluginInfoApiResponse;
import com.redadani1997.blazingkraft.connect.service.PluginService;
import com.redadani1997.blazingkraft.error.connect.PluginException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

@Service
@RequiredArgsConstructor
public class PluginServiceImpl implements PluginService {
    private final KafkaConnectResponseMapper kafkaConnectResponseMapper;
    private final ClientsFactory clientsFactory;

    @Override
    public List<ConfigKeyInfoApiResponse> getConnectorConfigDef(
            PluginGetConnectorConfigDefRequest request) {
        try {
            String url = "/connector-plugins/{pluginName}/config";

            Map<String, String> params = new HashMap<>();
            params.put("pluginName", request.getPluginName());

            String json =
                    this.currentKafkaConnectClient()
                            .restTemplate()
                            .exchange(url, HttpMethod.GET, null, String.class, params)
                            .getBody();

            return this.pluginResponseMapper().configKeyInfoApiResponses(json);
        } catch (HttpClientErrorException ex) {
            if (HttpStatusCode.valueOf(404).isSameCodeAs(ex.getStatusCode())) {
                String error =
                        "GET /connector-plugins/{plugin}/config is not supported by your Kafka Connect version";
                throw new PluginException(error);
            }
            throw new PluginException(ex);
        } catch (Exception ex) {
            throw new PluginException(ex);
        }
    }

    @Override
    public List<PluginInfoApiResponse> listConnectorPlugins(
            PluginListConnectorPluginsRequest request) {
        try {
            String url = "/connector-plugins?connectorsOnly={connectorsOnly}";

            Map<String, Boolean> params = new HashMap<>();
            params.put("connectorsOnly", request.getConnectorsOnly());

            String json =
                    this.currentKafkaConnectClient()
                            .restTemplate()
                            .exchange(url, HttpMethod.GET, null, String.class, params)
                            .getBody();

            return this.pluginResponseMapper().pluginInfoResponses(json);
        } catch (Exception ex) {
            throw new PluginException(ex);
        }
    }

    @Override
    public ConfigInfosApiResponse validateConfigs(PluginValidateConfigsRequest request) {
        try {
            String url = "connector-plugins/{pluginName}/config/validate";

            Map<String, String> params = new HashMap<>();
            params.put("pluginName", request.getPluginName());

            HttpEntity httpEntity = new HttpEntity(request.getRequestBody());

            String json =
                    this.currentKafkaConnectClient()
                            .restTemplate()
                            .exchange(url, HttpMethod.PUT, httpEntity, String.class, params)
                            .getBody();

            return this.pluginResponseMapper().configInfosApiResponse(json);
        } catch (Exception ex) {
            throw new PluginException(ex);
        }
    }

    private CommonKafkaConnectClient currentKafkaConnectClient() {
        return this.clientsFactory.currentKafkaConnectClient();
    }

    private PluginResponseMapper pluginResponseMapper() {
        return this.kafkaConnectResponseMapper.pluginResponseMapper();
    }
}
