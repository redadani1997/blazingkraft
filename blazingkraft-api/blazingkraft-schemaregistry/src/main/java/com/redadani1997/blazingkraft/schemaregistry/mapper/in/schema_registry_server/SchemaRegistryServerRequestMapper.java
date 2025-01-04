package com.redadani1997.blazingkraft.schemaregistry.mapper.in.schema_registry_server;

import com.redadani1997.blazingkraft.audit.service.AuditLogService;
import com.redadani1997.blazingkraft.common.enums.EnumUtils;
import com.redadani1997.blazingkraft.common.enums.SchemaRegistryCompatibility;
import com.redadani1997.blazingkraft.common.enums.SchemaRegistryMode;
import com.redadani1997.blazingkraft.common.validator.CommonValidator;
import com.redadani1997.blazingkraft.schemaregistry.dto.in.schema_registry_server.*;
import com.redadani1997.blazingkraft.schemaregistry.openapi.model.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class SchemaRegistryServerRequestMapper {
    private final AuditLogService auditLogService;

    public SchemaRegistryCreateRequest schemaRegistryCreateRequest(
            SchemaRegistryCreateApiRequest apiRequest) {
        CommonValidator.assertNotNull("Request", apiRequest);

        this.auditLogService.setSubject(apiRequest.getCode());

        CommonValidator.assertNotBlank("Code", apiRequest.getCode());
        CommonValidator.assertExpression("Code", apiRequest.getCode(), "^[a-zA-Z0-9]+$");
        CommonValidator.assertNotBlank("Name", apiRequest.getName());
        CommonValidator.assertNotBlank("Color", apiRequest.getColor());
        CommonValidator.assertNotBlank("Url", apiRequest.getSchemaRegistryUrls());
        CommonValidator.assertNotNull("Cache Size", apiRequest.getSchemasCacheSize());

        if (apiRequest.getJmxEnabled()) {
            CommonValidator.assertNotBlank("Jmx Url", apiRequest.getJmxUrl());
        }

        SchemaRegistryCreateRequest request =
                SchemaRegistryCreateRequest.builder()
                        .code(apiRequest.getCode())
                        .name(apiRequest.getName())
                        .color(apiRequest.getColor())
                        .schemaRegistryUrls(apiRequest.getSchemaRegistryUrls())
                        .schemasCacheSize(apiRequest.getSchemasCacheSize())
                        .mainConfiguration(apiRequest.getMainConfiguration())
                        .jmxEnabled(apiRequest.getJmxEnabled())
                        .jmxUrl(apiRequest.getJmxUrl())
                        .jmxEnvironment(apiRequest.getJmxEnvironment())
                        .build();

        return request;
    }

    public SchemaRegistryEditRequest schemaRegistryEditRequest(
            String schemaRegistryCode, SchemaRegistryEditApiRequest apiRequest) {
        this.auditLogService.setSubject(schemaRegistryCode);

        CommonValidator.assertNotNull("Request", apiRequest);
        CommonValidator.assertNotBlank("Code", schemaRegistryCode);
        CommonValidator.assertNotBlank("Color", apiRequest.getColor());
        CommonValidator.assertNotBlank("Url", apiRequest.getSchemaRegistryUrls());
        CommonValidator.assertNotNull("Cache Size", apiRequest.getSchemasCacheSize());

        if (apiRequest.getJmxEnabled()) {
            CommonValidator.assertNotBlank("Jmx Url", apiRequest.getJmxUrl());
        }

        SchemaRegistryEditRequest request =
                SchemaRegistryEditRequest.builder()
                        .code(schemaRegistryCode)
                        .color(apiRequest.getColor())
                        .schemaRegistryUrls(apiRequest.getSchemaRegistryUrls())
                        .schemasCacheSize(apiRequest.getSchemasCacheSize())
                        .mainConfiguration(apiRequest.getMainConfiguration())
                        .jmxEnabled(apiRequest.getJmxEnabled())
                        .jmxUrl(apiRequest.getJmxUrl())
                        .jmxEnvironment(apiRequest.getJmxEnvironment())
                        .build();

        return request;
    }

    public SchemaRegistryDetailsRequest schemaRegistryDetailsRequest(String schemaRegistryCode) {
        CommonValidator.assertNotBlank("Code", schemaRegistryCode);

        SchemaRegistryDetailsRequest request =
                SchemaRegistryDetailsRequest.builder().code(schemaRegistryCode).build();

        return request;
    }

    public SchemaRegistryDeleteRequest schemaRegistryDeleteRequest(String schemaRegistryCode) {
        this.auditLogService.setSubject(schemaRegistryCode);

        CommonValidator.assertNotBlank("Code", schemaRegistryCode);

        SchemaRegistryDeleteRequest request =
                SchemaRegistryDeleteRequest.builder().code(schemaRegistryCode).build();

        return request;
    }

    public SchemaRegistryClientConnectivityRequest schemaRegistryClientConnectivityRequest(
            SchemaRegistryClientConnectivityApiRequest apiRequest) {
        CommonValidator.assertNotNull("Request", apiRequest);
        CommonValidator.assertNotBlank("Url", apiRequest.getSchemaRegistryUrls());
        CommonValidator.assertNotNull("Cache Size", apiRequest.getSchemasCacheSize());

        SchemaRegistryClientConnectivityRequest request =
                SchemaRegistryClientConnectivityRequest.builder()
                        .schemaRegistryUrls(apiRequest.getSchemaRegistryUrls())
                        .schemasCacheSize(apiRequest.getSchemasCacheSize())
                        .mainConfiguration(apiRequest.getMainConfiguration())
                        .build();

        return request;
    }

    public SchemaRegistryJmxConnectivityRequest schemaRegistryJmxConnectivityRequest(
            SchemaRegistryJmxConnectivityApiRequest apiRequest) {
        CommonValidator.assertNotBlank("Jmx Url", apiRequest.getJmxUrl());

        return SchemaRegistryJmxConnectivityRequest.builder()
                .jmxUrl(apiRequest.getJmxUrl())
                .jmxEnvironment(apiRequest.getJmxEnvironment())
                .build();
    }

    public SchemaRegistryModeUpdateRequest schemaRegistryModeUpdateRequest(
            ModeUpdateApiRequest apiRequest) {
        CommonValidator.assertNotNull("Request", apiRequest);

        this.auditLogService.setSubject(apiRequest.getMode());

        CommonValidator.assertNotBlank("mode", apiRequest.getMode());
        EnumUtils.fromName(SchemaRegistryMode.class, apiRequest.getMode());

        return SchemaRegistryModeUpdateRequest.builder().mode(apiRequest.getMode()).build();
    }

    public SchemaRegistryCompatibilityUpdateRequest schemaRegistryCompatibilityUpdateRequest(
            CompatibilityUpdateApiRequest apiRequest) {
        CommonValidator.assertNotNull("Request", apiRequest);

        this.auditLogService.setSubject(apiRequest.getCompatibility());

        CommonValidator.assertNotBlank("compatibility", apiRequest.getCompatibility());
        EnumUtils.fromName(SchemaRegistryCompatibility.class, apiRequest.getCompatibility());

        return SchemaRegistryCompatibilityUpdateRequest.builder()
                .compatibility(apiRequest.getCompatibility())
                .build();
    }
}
