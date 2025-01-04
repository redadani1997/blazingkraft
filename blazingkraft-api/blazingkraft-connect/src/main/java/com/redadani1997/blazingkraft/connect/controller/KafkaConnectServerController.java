package com.redadani1997.blazingkraft.connect.controller;

import com.redadani1997.blazingkraft.audit.decorator.WithAudit;
import com.redadani1997.blazingkraft.audit.enums.AuditSeverity;
import com.redadani1997.blazingkraft.authorization.decorator.WithAuthorization;
import com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp;
import com.redadani1997.blazingkraft.client.decorator.WithKafkaConnectClient;
import com.redadani1997.blazingkraft.client.decorator.WithKafkaConnectCode;
import com.redadani1997.blazingkraft.common.actions.kafka_connect.KafkaConnectDashboardActions;
import com.redadani1997.blazingkraft.common.actions.management.ManagementKafkaConnectActions;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import com.redadani1997.blazingkraft.connect.dto.in.server.*;
import com.redadani1997.blazingkraft.connect.kafka_connect_server.openapi.api.KafkaConnectServerApi;
import com.redadani1997.blazingkraft.connect.kafka_connect_server.openapi.model.*;
import com.redadani1997.blazingkraft.connect.mapper.in.KafkaConnectRequestMapper;
import com.redadani1997.blazingkraft.connect.mapper.in.server.KafkaConnectServerRequestMapper;
import com.redadani1997.blazingkraft.connect.service.KafkaConnectServerService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class KafkaConnectServerController implements KafkaConnectServerApi {

    private final KafkaConnectServerService kafkaConnectServerService;
    private final KafkaConnectRequestMapper kafkaConnectRequestMapper;

    public KafkaConnectServerController(
            KafkaConnectServerService kafkaConnectServerService,
            KafkaConnectRequestMapper kafkaConnectRequestMapper) {
        this.kafkaConnectServerService = kafkaConnectServerService;
        this.kafkaConnectRequestMapper = kafkaConnectRequestMapper;
    }

    @WithCleanUp
    @WithAudit(
            action = ManagementKafkaConnectActions.MANAGEMENT_CREATE_KAFKA_CONNECT,
            type = EntityType.MANAGEMENT,
            severity = AuditSeverity.LOW)
    @WithAuthorization(
            permission = ManagementKafkaConnectActions.MANAGEMENT_CREATE_KAFKA_CONNECT,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<KafkaConnectServerMetaApiResponse> createKafkaConnectServer(
            KafkaConnectServerCreateApiRequest apiRequest) {
        KafkaConnectServerCreateRequest request =
                this.kafkaConnectServerRequestMapper().kafkaConnectServerCreateRequest(apiRequest);

        KafkaConnectServerMetaApiResponse response =
                this.kafkaConnectServerService.createKafkaConnectServer(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @WithCleanUp
    @WithAudit(
            action = ManagementKafkaConnectActions.MANAGEMENT_DELETE_KAFKA_CONNECT,
            type = EntityType.MANAGEMENT,
            severity = AuditSeverity.HIGH)
    @WithAuthorization(
            permission = ManagementKafkaConnectActions.MANAGEMENT_DELETE_KAFKA_CONNECT,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<Void> deleteKafkaConnectServer(String kafkaConnectCode) {
        KafkaConnectServerDeleteRequest request =
                this.kafkaConnectServerRequestMapper().kafkaConnectServerDeleteRequest(kafkaConnectCode);

        this.kafkaConnectServerService.deleteKafkaConnectServer(request);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @WithCleanUp
    @WithKafkaConnectCode
    @WithKafkaConnectClient
    @WithAuthorization(
            permission = ManagementKafkaConnectActions.MANAGEMENT_DESCRIBE_KAFKA_CONNECTS,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<KafkaConnectServerDescriptionApiResponse> describeKafkaConnectServer() {
        KafkaConnectServerDescriptionApiResponse response =
                this.kafkaConnectServerService.describeKafkaConnectServer();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @WithCleanUp
    @WithAuthorization(
            permission = ManagementKafkaConnectActions.MANAGEMENT_DESCRIBE_KAFKA_CONNECTS,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<List<KafkaConnectServerDescriptionApiResponse>>
            describeKafkaConnectServers() {
        List<KafkaConnectServerDescriptionApiResponse> responses =
                this.kafkaConnectServerService.describeKafkaConnectServers();

        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @WithCleanUp
    @WithAudit(
            action = ManagementKafkaConnectActions.MANAGEMENT_EDIT_KAFKA_CONNECT,
            type = EntityType.MANAGEMENT,
            severity = AuditSeverity.MEDIUM)
    @WithAuthorization(
            permission = ManagementKafkaConnectActions.MANAGEMENT_EDIT_KAFKA_CONNECT,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<KafkaConnectServerMetaApiResponse> editKafkaConnectServer(
            String kafkaConnectCode, KafkaConnectServerEditApiRequest apiRequest) {
        KafkaConnectServerEditRequest request =
                this.kafkaConnectServerRequestMapper()
                        .kafkaConnectServerEditRequest(kafkaConnectCode, apiRequest);

        KafkaConnectServerMetaApiResponse response =
                this.kafkaConnectServerService.editKafkaConnectServer(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @WithCleanUp
    @WithAuthorization(
            permission = ManagementKafkaConnectActions.MANAGEMENT_DESCRIBE_KAFKA_CONNECTS,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<List<KafkaConnectServerMetaApiResponse>> getAllKafkaConnectServersMeta() {
        List<KafkaConnectServerMetaApiResponse> responses =
                this.kafkaConnectServerService.getAllKafkaConnectServersMeta();

        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @WithCleanUp
    @WithAuthorization(
            permission = ManagementKafkaConnectActions.MANAGEMENT_DESCRIBE_KAFKA_CONNECTS,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<KafkaConnectServerDetailsApiResponse> getKafkaConnectServerDetails(
            String kafkaConnectCode) {
        KafkaConnectServerDetailsRequest request =
                this.kafkaConnectServerRequestMapper().kafkaConnectServerDetailsRequest(kafkaConnectCode);

        KafkaConnectServerDetailsApiResponse response =
                this.kafkaConnectServerService.getKafkaConnectServerDetails(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @WithCleanUp
    @WithKafkaConnectCode
    @WithKafkaConnectClient
    @WithAuthorization(
            permission = KafkaConnectDashboardActions.VIEW_KAFKA_CONNECT_DASHBOARD,
            type = EntityType.KAFKA_CONNECT)
    @Override
    public ResponseEntity<KafkaConnectServerMonitoringApiResponse>
            monitorKafkaConnectServerDetails() {
        KafkaConnectServerMonitoringApiResponse response =
                this.kafkaConnectServerService.monitorKafkaConnectServerDetails();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @WithCleanUp
    @WithKafkaConnectCode
    @WithKafkaConnectClient
    @WithAuthorization(
            permission = ManagementKafkaConnectActions.MANAGEMENT_DESCRIBE_KAFKA_CONNECTS,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<KafkaConnectServerMetaApiResponse> getKafkaConnectServerMeta() {
        KafkaConnectServerMetaApiResponse response =
                this.kafkaConnectServerService.getKafkaConnectServerMeta();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @WithCleanUp
    @WithAuthorization(
            permission = ManagementKafkaConnectActions.MANAGEMENT_TEST_KAFKA_CONNECT_CONNECTIVITY,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<Void> testKafkaConnectServerClientConnectivity(
            KafkaConnectServerClientConnectivityApiRequest apiRequest) {
        KafkaConnectServerClientConnectivityRequest request =
                this.kafkaConnectServerRequestMapper()
                        .kafkaConnectServerClientConnectivityRequest(apiRequest);

        this.kafkaConnectServerService.testKafkaConnectServerClientConnectivity(request);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @WithCleanUp
    @WithAuthorization(
            permission = ManagementKafkaConnectActions.MANAGEMENT_TEST_KAFKA_CONNECT_CONNECTIVITY,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<Void> testKafkaConnectServerJmxConnectivity(
            KafkaConnectServerJmxConnectivityApiRequest apiRequest) {
        KafkaConnectServerJmxConnectivityRequest request =
                this.kafkaConnectServerRequestMapper().testKafkaConnectServerJmxConnectivity(apiRequest);

        this.kafkaConnectServerService.testKafkaConnectServerJmxConnectivity(request);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    private KafkaConnectServerRequestMapper kafkaConnectServerRequestMapper() {
        return this.kafkaConnectRequestMapper.kafkaConnectServerRequestMapper();
    }
}
