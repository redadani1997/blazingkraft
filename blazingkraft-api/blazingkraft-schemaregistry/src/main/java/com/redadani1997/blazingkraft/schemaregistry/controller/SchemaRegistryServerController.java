package com.redadani1997.blazingkraft.schemaregistry.controller;

import com.redadani1997.blazingkraft.audit.decorator.WithAudit;
import com.redadani1997.blazingkraft.audit.enums.AuditSeverity;
import com.redadani1997.blazingkraft.authorization.decorator.WithAuthorization;
import com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp;
import com.redadani1997.blazingkraft.client.decorator.WithSchemaRegistryClient;
import com.redadani1997.blazingkraft.client.decorator.WithSchemaRegistryCode;
import com.redadani1997.blazingkraft.common.actions.management.ManagementSchemaRegistryActions;
import com.redadani1997.blazingkraft.common.actions.schema_registry.SchemaRegistryServerActions;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import com.redadani1997.blazingkraft.schemaregistry.dto.in.schema_registry_server.*;
import com.redadani1997.blazingkraft.schemaregistry.mapper.in.SchemaRegistryRequestMapper;
import com.redadani1997.blazingkraft.schemaregistry.mapper.in.schema_registry_server.SchemaRegistryServerRequestMapper;
import com.redadani1997.blazingkraft.schemaregistry.openapi.api.SchemaRegistryServerApi;
import com.redadani1997.blazingkraft.schemaregistry.openapi.model.*;
import com.redadani1997.blazingkraft.schemaregistry.service.SchemaRegistryServerService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class SchemaRegistryServerController implements SchemaRegistryServerApi {

    private final SchemaRegistryRequestMapper schemaRegistryRequestMapper;
    private final SchemaRegistryServerService schemaRegistryServerService;

    @WithCleanUp
    @WithAudit(
            action = ManagementSchemaRegistryActions.MANAGEMENT_CREATE_SCHEMA_REGISTRY,
            type = EntityType.MANAGEMENT,
            severity = AuditSeverity.LOW)
    @WithAuthorization(
            permission = ManagementSchemaRegistryActions.MANAGEMENT_CREATE_SCHEMA_REGISTRY,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<SchemaRegistryMetaApiResponse> createSchemaRegistry(
            SchemaRegistryCreateApiRequest schemaRegistryCreateApiRequest) {

        SchemaRegistryCreateRequest request =
                this.schemaRegistryRequestMapper()
                        .schemaRegistryCreateRequest(schemaRegistryCreateApiRequest);

        SchemaRegistryMetaApiResponse response =
                this.schemaRegistryServerService.createSchemaRegistry(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @WithCleanUp
    @WithAudit(
            action = ManagementSchemaRegistryActions.MANAGEMENT_DELETE_SCHEMA_REGISTRY,
            type = EntityType.MANAGEMENT,
            severity = AuditSeverity.HIGH)
    @WithAuthorization(
            permission = ManagementSchemaRegistryActions.MANAGEMENT_DELETE_SCHEMA_REGISTRY,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<Void> deleteSchemaRegistry(String schemaRegistryCode) {
        SchemaRegistryDeleteRequest request =
                this.schemaRegistryRequestMapper().schemaRegistryDeleteRequest(schemaRegistryCode);
        this.schemaRegistryServerService.deleteSchemaRegistry(request);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @WithCleanUp
    @WithSchemaRegistryCode
    @WithSchemaRegistryClient
    @WithAuthorization(
            permission = ManagementSchemaRegistryActions.MANAGEMENT_DESCRIBE_SCHEMA_REGISTRIES,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<SchemaRegistryDescriptionApiResponse> describeSchemaRegistry() {
        SchemaRegistryDescriptionApiResponse response =
                this.schemaRegistryServerService.describeSchemaRegistry();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @WithCleanUp
    @WithAudit(
            action = ManagementSchemaRegistryActions.MANAGEMENT_EDIT_SCHEMA_REGISTRY,
            type = EntityType.MANAGEMENT,
            severity = AuditSeverity.MEDIUM)
    @WithAuthorization(
            permission = ManagementSchemaRegistryActions.MANAGEMENT_EDIT_SCHEMA_REGISTRY,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<SchemaRegistryMetaApiResponse> editSchemaRegistry(
            String schemaRegistryCode, SchemaRegistryEditApiRequest apiRequest) {
        SchemaRegistryEditRequest request =
                this.schemaRegistryRequestMapper()
                        .schemaRegistryEditRequest(schemaRegistryCode, apiRequest);

        SchemaRegistryMetaApiResponse response =
                this.schemaRegistryServerService.editSchemaRegistry(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @WithCleanUp
    @WithAuthorization(
            permission = ManagementSchemaRegistryActions.MANAGEMENT_DESCRIBE_SCHEMA_REGISTRIES,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<List<SchemaRegistryMetaApiResponse>> getSchemaRegistries() {
        List<SchemaRegistryMetaApiResponse> responses =
                this.schemaRegistryServerService.getSchemaRegistries();
        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @WithCleanUp
    @WithSchemaRegistryCode
    @WithSchemaRegistryClient
    @WithAuthorization(
            permission = ManagementSchemaRegistryActions.MANAGEMENT_DESCRIBE_SCHEMA_REGISTRIES,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<SchemaRegistryConfigApiResponse> getSchemaRegistryConfig() {
        SchemaRegistryConfigApiResponse response =
                this.schemaRegistryServerService.getSchemaRegistryConfig();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @WithCleanUp
    @WithAuthorization(
            permission = ManagementSchemaRegistryActions.MANAGEMENT_DESCRIBE_SCHEMA_REGISTRIES,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<SchemaRegistryDetailsApiResponse> getSchemaRegistryDetails(
            String schemaRegistryCode) {

        SchemaRegistryDetailsRequest request =
                this.schemaRegistryRequestMapper().schemaRegistryDetailsRequest(schemaRegistryCode);

        SchemaRegistryDetailsApiResponse response =
                this.schemaRegistryServerService.getSchemaRegistryDetails(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @WithCleanUp
    @WithAuthorization(
            permission = ManagementSchemaRegistryActions.MANAGEMENT_TEST_SCHEMA_REGISTRY_CONNECTIVITY,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<Void> testSchemaRegistryClientConnectivity(
            SchemaRegistryClientConnectivityApiRequest apiRequest) {
        SchemaRegistryClientConnectivityRequest request =
                this.schemaRegistryRequestMapper().schemaRegistryClientConnectivityRequest(apiRequest);

        this.schemaRegistryServerService.testSchemaRegistryClientConnectivity(request);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @WithCleanUp
    @WithAuthorization(
            permission = ManagementSchemaRegistryActions.MANAGEMENT_TEST_SCHEMA_REGISTRY_CONNECTIVITY,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<Void> testSchemaRegistryJmxConnectivity(
            SchemaRegistryJmxConnectivityApiRequest apiRequest) {
        SchemaRegistryJmxConnectivityRequest request =
                this.schemaRegistryRequestMapper().schemaRegistryJmxConnectivityRequest(apiRequest);

        this.schemaRegistryServerService.testSchemaRegistryJmxConnectivity(request);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @WithCleanUp
    @WithSchemaRegistryCode
    @WithAudit(
            action = SchemaRegistryServerActions.UPDATE_SCHEMA_REGISTRY_COMPATIBILITY,
            type = EntityType.SCHEMA_REGISTRY,
            severity = AuditSeverity.HIGH)
    @WithSchemaRegistryClient
    @WithAuthorization(
            permission = SchemaRegistryServerActions.UPDATE_SCHEMA_REGISTRY_COMPATIBILITY,
            type = EntityType.SCHEMA_REGISTRY)
    @Override
    public ResponseEntity<CompatibilityUpdateApiResponse> updateSchemaRegistryCompatibility(
            CompatibilityUpdateApiRequest compatibilityUpdateApiRequest) {
        SchemaRegistryCompatibilityUpdateRequest request =
                this.schemaRegistryRequestMapper()
                        .schemaRegistryCompatibilityUpdateRequest(compatibilityUpdateApiRequest);
        CompatibilityUpdateApiResponse response =
                this.schemaRegistryServerService.updateSchemaRegistryCompatibility(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @WithCleanUp
    @WithSchemaRegistryCode
    @WithAudit(
            action = SchemaRegistryServerActions.UPDATE_SCHEMA_REGISTRY_MODE,
            type = EntityType.SCHEMA_REGISTRY,
            severity = AuditSeverity.HIGH)
    @WithSchemaRegistryClient
    @WithAuthorization(
            permission = SchemaRegistryServerActions.UPDATE_SCHEMA_REGISTRY_MODE,
            type = EntityType.SCHEMA_REGISTRY)
    @Override
    public ResponseEntity<ModeUpdateApiResponse> updateSchemaRegistryMode(
            ModeUpdateApiRequest modeUpdateApiRequest) {
        SchemaRegistryModeUpdateRequest request =
                this.schemaRegistryRequestMapper().schemaRegistryModeUpdateRequest(modeUpdateApiRequest);
        ModeUpdateApiResponse response =
                this.schemaRegistryServerService.updateSchemaRegistryMode(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    private SchemaRegistryServerRequestMapper schemaRegistryRequestMapper() {
        return this.schemaRegistryRequestMapper.schemaRegistryServerRequestMapper();
    }
}
