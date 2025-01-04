package com.redadani1997.blazingkraft.ksqldb.controller;

import com.redadani1997.blazingkraft.audit.decorator.WithAudit;
import com.redadani1997.blazingkraft.audit.enums.AuditSeverity;
import com.redadani1997.blazingkraft.authorization.decorator.WithAuthorization;
import com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp;
import com.redadani1997.blazingkraft.client.decorator.WithKsqlDbClient;
import com.redadani1997.blazingkraft.client.decorator.WithKsqlDbCode;
import com.redadani1997.blazingkraft.common.actions.ksqldb.KsqlDbDashboardActions;
import com.redadani1997.blazingkraft.common.actions.management.ManagementKsqlDbActions;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import com.redadani1997.blazingkraft.ksqldb.dto.in.server.*;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_server.openapi.api.KsqlDbServerApi;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_server.openapi.model.*;
import com.redadani1997.blazingkraft.ksqldb.mapper.in.KsqlDbRequestMapper;
import com.redadani1997.blazingkraft.ksqldb.mapper.in.server.KsqlDbServerRequestMapper;
import com.redadani1997.blazingkraft.ksqldb.service.KsqlDbServerService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class KsqlDbServerController implements KsqlDbServerApi {

    private final KsqlDbServerService ksqlDbServerService;
    private final KsqlDbRequestMapper ksqlDbRequestMapper;

    public KsqlDbServerController(
            KsqlDbServerService ksqlDbServerService, KsqlDbRequestMapper ksqlDbRequestMapper) {
        this.ksqlDbServerService = ksqlDbServerService;
        this.ksqlDbRequestMapper = ksqlDbRequestMapper;
    }

    @WithCleanUp
    @WithAudit(
            action = ManagementKsqlDbActions.MANAGEMENT_CREATE_KSQLDB,
            type = EntityType.MANAGEMENT,
            severity = AuditSeverity.LOW)
    @WithAuthorization(
            permission = ManagementKsqlDbActions.MANAGEMENT_CREATE_KSQLDB,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<KsqlDbServerMetaApiResponse> createKsqlDbServer(
            KsqlDbServerCreateApiRequest apiRequest) {
        KsqlDbServerCreateRequest request =
                this.ksqlDbServerRequestMapper().ksqlDbServerCreateRequest(apiRequest);

        KsqlDbServerMetaApiResponse response = this.ksqlDbServerService.createKsqlDbServer(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @WithCleanUp
    @WithAudit(
            action = ManagementKsqlDbActions.MANAGEMENT_DELETE_KSQLDB,
            type = EntityType.MANAGEMENT,
            severity = AuditSeverity.HIGH)
    @WithAuthorization(
            permission = ManagementKsqlDbActions.MANAGEMENT_DELETE_KSQLDB,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<Void> deleteKsqlDbServer(String ksqlDbCode) {
        KsqlDbServerDeleteRequest request =
                this.ksqlDbServerRequestMapper().ksqlDbServerDeleteRequest(ksqlDbCode);

        this.ksqlDbServerService.deleteKsqlDbServer(request);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @WithCleanUp
    @WithKsqlDbCode
    @WithKsqlDbClient
    @WithAuthorization(
            permission = ManagementKsqlDbActions.MANAGEMENT_DESCRIBE_KSQLDBS,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<KsqlDbServerDescriptionApiResponse> describeKsqlDbServer() {
        KsqlDbServerDescriptionApiResponse response = this.ksqlDbServerService.describeKsqlDbServer();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @WithCleanUp
    @WithAuthorization(
            permission = ManagementKsqlDbActions.MANAGEMENT_DESCRIBE_KSQLDBS,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<List<KsqlDbServerDescriptionApiResponse>> describeKsqlDbServers() {
        List<KsqlDbServerDescriptionApiResponse> responses =
                this.ksqlDbServerService.describeKsqlDbServers();

        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @WithCleanUp
    @WithAudit(
            action = ManagementKsqlDbActions.MANAGEMENT_EDIT_KSQLDB,
            type = EntityType.MANAGEMENT,
            severity = AuditSeverity.MEDIUM)
    @WithAuthorization(
            permission = ManagementKsqlDbActions.MANAGEMENT_EDIT_KSQLDB,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<KsqlDbServerMetaApiResponse> editKsqlDbServer(
            String ksqlDbCode, KsqlDbServerEditApiRequest apiRequest) {
        KsqlDbServerEditRequest request =
                this.ksqlDbServerRequestMapper().ksqlDbServerEditRequest(ksqlDbCode, apiRequest);

        KsqlDbServerMetaApiResponse response = this.ksqlDbServerService.editKsqlDbServer(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @WithCleanUp
    @WithAuthorization(
            permission = ManagementKsqlDbActions.MANAGEMENT_DESCRIBE_KSQLDBS,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<List<KsqlDbServerMetaApiResponse>> getAllKsqlDbServersMeta() {
        List<KsqlDbServerMetaApiResponse> responses =
                this.ksqlDbServerService.getAllKsqlDbServersMeta();

        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @WithCleanUp
    @WithAuthorization(
            permission = ManagementKsqlDbActions.MANAGEMENT_DESCRIBE_KSQLDBS,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<KsqlDbServerDetailsApiResponse> getKsqlDbServerDetails(String ksqlDbCode) {
        KsqlDbServerDetailsRequest request =
                this.ksqlDbServerRequestMapper().ksqlDbServerDetailsRequest(ksqlDbCode);

        KsqlDbServerDetailsApiResponse response =
                this.ksqlDbServerService.getKsqlDbServerDetails(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @WithCleanUp
    @WithKsqlDbCode
    @WithKsqlDbClient
    @WithAuthorization(
            permission = ManagementKsqlDbActions.MANAGEMENT_DESCRIBE_KSQLDBS,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<KsqlDbServerMetaApiResponse> getKsqlDbServerMeta() {
        KsqlDbServerMetaApiResponse response = this.ksqlDbServerService.getKsqlDbServerMeta();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @WithCleanUp
    @WithKsqlDbCode
    @WithKsqlDbClient
    @WithAuthorization(
            permission = KsqlDbDashboardActions.VIEW_KSQLDB_DASHBOARD,
            type = EntityType.KSQLDB)
    @Override
    public ResponseEntity<KsqlDbServerMonitoringApiResponse> monitorKsqlDbServerDetails() {
        KsqlDbServerMonitoringApiResponse response =
                this.ksqlDbServerService.monitorKsqlDbServerDetails();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @WithCleanUp
    @WithAuthorization(
            permission = ManagementKsqlDbActions.MANAGEMENT_TEST_KSQLDB_CONNECTIVITY,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<Void> testKsqlDbServerClientConnectivity(
            KsqlDbServerClientConnectivityApiRequest apiRequest) {
        KsqlDbServerClientConnectivityRequest request =
                this.ksqlDbServerRequestMapper().ksqlDbServerClientConnectivityRequest(apiRequest);

        this.ksqlDbServerService.testKsqlDbServerClientConnectivity(request);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @WithCleanUp
    @WithAuthorization(
            permission = ManagementKsqlDbActions.MANAGEMENT_TEST_KSQLDB_CONNECTIVITY,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<Void> testKsqlDbServerJmxConnectivity(
            KsqlDbServerJmxConnectivityApiRequest apiRequest) {
        KsqlDbServerJmxConnectivityRequest request =
                this.ksqlDbServerRequestMapper().ksqlDbServerJmxConnectivityRequest(apiRequest);

        this.ksqlDbServerService.testKsqlDbServerJmxConnectivity(request);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    private KsqlDbServerRequestMapper ksqlDbServerRequestMapper() {
        return this.ksqlDbRequestMapper.ksqlDbServerRequestMapper();
    }
}
