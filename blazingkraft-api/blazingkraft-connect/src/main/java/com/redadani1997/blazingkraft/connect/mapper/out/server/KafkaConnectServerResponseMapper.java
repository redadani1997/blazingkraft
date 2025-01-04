package com.redadani1997.blazingkraft.connect.mapper.out.server;

import com.redadani1997.blazingkraft.common.util.CommonCastingUtils;
import com.redadani1997.blazingkraft.connect.kafka_connect_server.openapi.model.KafkaConnectServerDescriptionApiResponse;
import com.redadani1997.blazingkraft.connect.kafka_connect_server.openapi.model.KafkaConnectServerDetailsApiResponse;
import com.redadani1997.blazingkraft.connect.kafka_connect_server.openapi.model.KafkaConnectServerMetaApiResponse;
import com.redadani1997.blazingkraft.connect.kafka_connect_server.openapi.model.KafkaConnectServerMonitoringApiResponse;
import com.redadani1997.blazingkraft.dao.model.ClusterModel;
import com.redadani1997.blazingkraft.dao.model.KafkaConnectModel;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class KafkaConnectServerResponseMapper {
    public List<KafkaConnectServerMetaApiResponse> kafkaConnectServerMetaApiResponses(
            List<KafkaConnectModel> models) {
        if (models == null) {
            return Collections.emptyList();
        }
        return models.stream().map(this::kafkaConnectServerMetaApiResponse).toList();
    }

    public KafkaConnectServerMetaApiResponse kafkaConnectServerMetaApiResponse(
            KafkaConnectModel model) {
        if (model == null) {
            return null;
        }
        KafkaConnectServerMetaApiResponse response = new KafkaConnectServerMetaApiResponse();
        ClusterModel clusterModel = model.getClusterModel();
        if (clusterModel != null) {
            response.setClusterCode(clusterModel.getCode());
            response.setClusterName(clusterModel.getName());
        }
        response.setName(model.getName());
        response.setCode(model.getCode());
        response.setColor(model.getColor());
        response.setJmxEnabled(model.getJmxEnabled());

        return response;
    }

    public KafkaConnectServerDetailsApiResponse kafkaConnectServerDetailsApiResponse(
            KafkaConnectModel model) {
        if (model == null) {
            return null;
        }
        KafkaConnectServerDetailsApiResponse response = new KafkaConnectServerDetailsApiResponse();

        ClusterModel clusterModel = model.getClusterModel();
        if (clusterModel != null) {
            response.setClusterCode(clusterModel.getCode());
            response.setClusterName(clusterModel.getName());
        }

        response.setName(model.getName());
        response.setCode(model.getCode());
        response.setColor(model.getColor());
        response.setBasicAuthEnabled(model.getBasicAuthEnabled());
        response.setBasicAuthUsername(model.getBasicAuthUsername());
        response.setBasicAuthPassword(model.getBasicAuthPassword());
        response.setUrl(model.getUrl());
        response.setJmxEnabled(model.getJmxEnabled());
        response.setJmxUrl(model.getJmxUrl());
        response.setJmxEnvironment(model.jmxEnvironment());

        return response;
    }

    public KafkaConnectServerDescriptionApiResponse kafkaConnectServerDescriptionApiResponse(
            String json) {
        return CommonCastingUtils.cast(json, KafkaConnectServerDescriptionApiResponse.class);
    }

    public KafkaConnectServerMonitoringApiResponse kafkaConnectServerMonitoringApiResponse(
            String connectorCount,
            String connectorStartupAttemptsTotal,
            String connectorStartupFailurePercentage,
            String connectorStartupFailureTotal,
            String connectorStartupSuccessPercentage,
            String connectorStartupSuccessTotal,
            String taskCount,
            String taskStartupAttemptsTotal,
            String taskStartupFailurePercentage,
            String taskStartupFailureTotal,
            String taskStartupSuccessPercentage,
            String taskStartupSuccessTotal) {
        KafkaConnectServerMonitoringApiResponse response =
                new KafkaConnectServerMonitoringApiResponse();
        response.setConnectorCount(connectorCount);
        response.setConnectorStartupAttemptsTotal(connectorStartupAttemptsTotal);
        response.setConnectorStartupFailurePercentage(connectorStartupFailurePercentage);
        response.setConnectorStartupFailureTotal(connectorStartupFailureTotal);
        response.setConnectorStartupSuccessPercentage(connectorStartupSuccessPercentage);
        response.setConnectorStartupSuccessTotal(connectorStartupSuccessTotal);
        response.setTaskCount(taskCount);
        response.setTaskStartupAttemptsTotal(taskStartupAttemptsTotal);
        response.setTaskStartupFailurePercentage(taskStartupFailurePercentage);
        response.setTaskStartupFailureTotal(taskStartupFailureTotal);
        response.setTaskStartupSuccessPercentage(taskStartupSuccessPercentage);
        response.setTaskStartupSuccessTotal(taskStartupSuccessTotal);
        return response;
    }
}
