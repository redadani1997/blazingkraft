package com.redadani1997.blazingkraft.admin.mapper.in.cluster;

import com.redadani1997.blazingkraft.admin.cluster.openapi.model.ClusterClientConnectivityApiRequest;
import com.redadani1997.blazingkraft.admin.cluster.openapi.model.ClusterCreateApiRequest;
import com.redadani1997.blazingkraft.admin.cluster.openapi.model.ClusterEditApiRequest;
import com.redadani1997.blazingkraft.admin.cluster.openapi.model.ClusterJmxConnectivityApiRequest;
import com.redadani1997.blazingkraft.admin.dto.in.cluster.*;
import com.redadani1997.blazingkraft.audit.service.AuditLogService;
import com.redadani1997.blazingkraft.common.validator.CommonValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class ClusterRequestMapper {
    private final AuditLogService auditLogService;

    public ClusterCreateRequest clusterCreateRequest(ClusterCreateApiRequest apiRequest) {
        CommonValidator.assertNotNull("Request", apiRequest);

        this.handleSubject(apiRequest.getCode());

        CommonValidator.assertNotBlank("Code", apiRequest.getCode());
        CommonValidator.assertExpression("Code", apiRequest.getCode(), "^[a-zA-Z0-9]+$");
        CommonValidator.assertNotBlank("Name", apiRequest.getName());
        CommonValidator.assertNotBlank("Color", apiRequest.getColor());

        if (apiRequest.getJmxEnabled()) {
            CommonValidator.assertNotBlank("Jmx Url", apiRequest.getJmxUrl());
        }

        return ClusterCreateRequest.builder()
                .code(apiRequest.getCode())
                .name(apiRequest.getName())
                .color(apiRequest.getColor())
                .schemaRegistryCode(apiRequest.getSchemaRegistryCode())
                .commonConfiguration(apiRequest.getCommonConfiguration())
                .jmxEnabled(apiRequest.getJmxEnabled())
                .jmxUrl(apiRequest.getJmxUrl())
                .jmxEnvironment(apiRequest.getJmxEnvironment())
                .build();
    }

    public ClusterEditRequest clusterEditRequest(
            String clusterCode, ClusterEditApiRequest apiRequest) {
        this.handleSubject(clusterCode);

        CommonValidator.assertNotNull("Request", apiRequest);
        CommonValidator.assertNotBlank("Code", clusterCode);
        CommonValidator.assertNotBlank("Color", apiRequest.getColor());

        if (apiRequest.getJmxEnabled()) {
            CommonValidator.assertNotBlank("Jmx Url", apiRequest.getJmxUrl());
        }

        return ClusterEditRequest.builder()
                .code(clusterCode)
                .color(apiRequest.getColor())
                .schemaRegistryCode(apiRequest.getSchemaRegistryCode())
                .commonConfiguration(apiRequest.getCommonConfiguration())
                .jmxEnabled(apiRequest.getJmxEnabled())
                .jmxUrl(apiRequest.getJmxUrl())
                .jmxEnvironment(apiRequest.getJmxEnvironment())
                .build();
    }

    public ClusterClientConnectivityRequest testClusterClientConnectivity(
            ClusterClientConnectivityApiRequest apiRequest) {
        return ClusterClientConnectivityRequest.builder()
                .commonConfiguration(apiRequest.getCommonConfiguration())
                .build();
    }

    public ClusterJmxConnectivityRequest testClusterJmxConnectivity(
            ClusterJmxConnectivityApiRequest apiRequest) {
        CommonValidator.assertNotBlank("Jmx Url", apiRequest.getJmxUrl());

        return ClusterJmxConnectivityRequest.builder()
                .jmxUrl(apiRequest.getJmxUrl())
                .jmxEnvironment(apiRequest.getJmxEnvironment())
                .build();
    }

    public ClusterDeleteRequest clusterDeleteRequest(String clusterCode) {
        this.handleSubject(clusterCode);

        CommonValidator.assertNotBlank("Code", clusterCode);

        return ClusterDeleteRequest.builder().code(clusterCode).build();
    }

    public ClusterDetailsRequest clusterConfigurationRequest(String clusterCode) {
        CommonValidator.assertNotBlank("Code", clusterCode);
        return ClusterDetailsRequest.builder().code(clusterCode).build();
    }

    public ClusterBrokerConfigurationRequest clusterBrokerConfigurationRequest(Integer id) {
        CommonValidator.assertNotNull("Broker Id", id);
        return ClusterBrokerConfigurationRequest.builder().id(id).build();
    }

    private void handleSubject(String code) {
        this.auditLogService.setSubject(code);
    }
}
