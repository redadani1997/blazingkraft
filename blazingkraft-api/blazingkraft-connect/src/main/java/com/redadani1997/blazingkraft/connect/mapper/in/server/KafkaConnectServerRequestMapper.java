package com.redadani1997.blazingkraft.connect.mapper.in.server;

import com.redadani1997.blazingkraft.audit.service.AuditLogService;
import com.redadani1997.blazingkraft.common.validator.CommonValidator;
import com.redadani1997.blazingkraft.connect.dto.in.server.*;
import com.redadani1997.blazingkraft.connect.kafka_connect_server.openapi.model.KafkaConnectServerClientConnectivityApiRequest;
import com.redadani1997.blazingkraft.connect.kafka_connect_server.openapi.model.KafkaConnectServerCreateApiRequest;
import com.redadani1997.blazingkraft.connect.kafka_connect_server.openapi.model.KafkaConnectServerEditApiRequest;
import com.redadani1997.blazingkraft.connect.kafka_connect_server.openapi.model.KafkaConnectServerJmxConnectivityApiRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class KafkaConnectServerRequestMapper {
    private final AuditLogService auditLogService;

    public KafkaConnectServerCreateRequest kafkaConnectServerCreateRequest(
            KafkaConnectServerCreateApiRequest apiRequest) {
        CommonValidator.assertNotNull("Request", apiRequest);

        this.auditLogService.setSubject(apiRequest.getCode());

        CommonValidator.assertNotBlank("Name", apiRequest.getName());
        CommonValidator.assertNotBlank("Code", apiRequest.getCode());
        CommonValidator.assertExpression("Code", apiRequest.getCode(), "^[a-zA-Z0-9]+$");
        CommonValidator.assertNotBlank("Url", apiRequest.getUrl());
        CommonValidator.assertNotBlank("Color", apiRequest.getColor());

        if (apiRequest.getJmxEnabled()) {
            CommonValidator.assertNotBlank("Jmx Url", apiRequest.getJmxUrl());
        }

        return KafkaConnectServerCreateRequest.builder()
                .name(apiRequest.getName())
                .code(apiRequest.getCode())
                .color(apiRequest.getColor())
                .url(apiRequest.getUrl())
                .basicAuthEnabled(apiRequest.getBasicAuthEnabled())
                .basicAuthUsername(apiRequest.getBasicAuthUsername())
                .basicAuthPassword(apiRequest.getBasicAuthPassword())
                .clusterCode(apiRequest.getClusterCode())
                .jmxEnabled(apiRequest.getJmxEnabled())
                .jmxUrl(apiRequest.getJmxUrl())
                .jmxEnvironment(apiRequest.getJmxEnvironment())
                .build();
    }

    public KafkaConnectServerEditRequest kafkaConnectServerEditRequest(
            String kafkaConnectCode, KafkaConnectServerEditApiRequest apiRequest) {
        this.auditLogService.setSubject(kafkaConnectCode);

        CommonValidator.assertNotNull("Request", apiRequest);
        CommonValidator.assertNotBlank("Code", kafkaConnectCode);
        CommonValidator.assertNotBlank("Url", apiRequest.getUrl());
        CommonValidator.assertNotBlank("Color", apiRequest.getColor());

        if (apiRequest.getJmxEnabled()) {
            CommonValidator.assertNotBlank("Jmx Url", apiRequest.getJmxUrl());
        }

        return KafkaConnectServerEditRequest.builder()
                .code(kafkaConnectCode)
                .color(apiRequest.getColor())
                .url(apiRequest.getUrl())
                .basicAuthEnabled(apiRequest.getBasicAuthEnabled())
                .basicAuthUsername(apiRequest.getBasicAuthUsername())
                .basicAuthPassword(apiRequest.getBasicAuthPassword())
                .clusterCode(apiRequest.getClusterCode())
                .jmxEnabled(apiRequest.getJmxEnabled())
                .jmxUrl(apiRequest.getJmxUrl())
                .jmxEnvironment(apiRequest.getJmxEnvironment())
                .build();
    }

    public KafkaConnectServerClientConnectivityRequest kafkaConnectServerClientConnectivityRequest(
            KafkaConnectServerClientConnectivityApiRequest apiRequest) {
        CommonValidator.assertNotNull("Request", apiRequest);
        CommonValidator.assertNotBlank("Url", apiRequest.getUrl());

        return KafkaConnectServerClientConnectivityRequest.builder()
                .url(apiRequest.getUrl())
                .basicAuthEnabled(apiRequest.getBasicAuthEnabled())
                .basicAuthUsername(apiRequest.getBasicAuthUsername())
                .basicAuthPassword(apiRequest.getBasicAuthPassword())
                .build();
    }

    public KafkaConnectServerJmxConnectivityRequest testKafkaConnectServerJmxConnectivity(
            KafkaConnectServerJmxConnectivityApiRequest apiRequest) {
        CommonValidator.assertNotBlank("Jmx Url", apiRequest.getJmxUrl());

        return KafkaConnectServerJmxConnectivityRequest.builder()
                .jmxUrl(apiRequest.getJmxUrl())
                .jmxEnvironment(apiRequest.getJmxEnvironment())
                .build();
    }

    public KafkaConnectServerDeleteRequest kafkaConnectServerDeleteRequest(String kafkaConnectCode) {
        this.auditLogService.setSubject(kafkaConnectCode);

        CommonValidator.assertNotBlank("Code", kafkaConnectCode);

        return KafkaConnectServerDeleteRequest.builder().code(kafkaConnectCode).build();
    }

    public KafkaConnectServerDetailsRequest kafkaConnectServerDetailsRequest(
            String kafkaConnectCode) {
        CommonValidator.assertNotBlank("Code", kafkaConnectCode);

        return KafkaConnectServerDetailsRequest.builder().code(kafkaConnectCode).build();
    }
}
