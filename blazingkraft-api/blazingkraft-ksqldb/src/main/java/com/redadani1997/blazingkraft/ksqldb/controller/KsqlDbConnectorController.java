package com.redadani1997.blazingkraft.ksqldb.controller;

import com.redadani1997.blazingkraft.audit.decorator.WithAudit;
import com.redadani1997.blazingkraft.audit.enums.AuditSeverity;
import com.redadani1997.blazingkraft.authorization.decorator.WithAuthorization;
import com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp;
import com.redadani1997.blazingkraft.client.decorator.WithKsqlDbClient;
import com.redadani1997.blazingkraft.client.decorator.WithKsqlDbCode;
import com.redadani1997.blazingkraft.common.actions.ksqldb.KsqlDbConnectorActions;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import com.redadani1997.blazingkraft.ksqldb.dto.in.connector.KsqlDbConnectorCreateRequest;
import com.redadani1997.blazingkraft.ksqldb.dto.in.connector.KsqlDbConnectorDeleteRequest;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_connector.openapi.api.KsqlDbConnectorApi;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_connector.openapi.model.KsqlDbConnectorApiResponse;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_connector.openapi.model.KsqlDbConnectorCreateApiRequest;
import com.redadani1997.blazingkraft.ksqldb.mapper.in.KsqlDbRequestMapper;
import com.redadani1997.blazingkraft.ksqldb.mapper.in.connector.KsqlDbConnectorRequestMapper;
import com.redadani1997.blazingkraft.ksqldb.service.KsqlDbConnectorService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class KsqlDbConnectorController implements KsqlDbConnectorApi {

    private final KsqlDbConnectorService ksqlDbConnectorService;
    private final KsqlDbRequestMapper ksqlDbRequestMapper;

    @WithCleanUp
    @WithKsqlDbCode
    @WithKsqlDbClient
    @WithAuthorization(
            permission = KsqlDbConnectorActions.DESCRIBE_KSQLDB_CONNECTORS,
            type = EntityType.KSQLDB)
    @Override
    public ResponseEntity<List<KsqlDbConnectorApiResponse>> getAllKsqlDbConnectors() {
        List<KsqlDbConnectorApiResponse> responses =
                this.ksqlDbConnectorService.getAllKsqlDbConnectors();

        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @WithCleanUp
    @WithKsqlDbCode
    @WithAudit(
            action = KsqlDbConnectorActions.CREATE_KSQLDB_CONNECTOR,
            type = EntityType.KSQLDB,
            severity = AuditSeverity.MEDIUM)
    @WithKsqlDbClient
    @WithAuthorization(
            permission = KsqlDbConnectorActions.CREATE_KSQLDB_CONNECTOR,
            type = EntityType.KSQLDB)
    @Override
    public ResponseEntity<Void> createKsqlDbConnector(KsqlDbConnectorCreateApiRequest apiRequest) {
        KsqlDbConnectorCreateRequest request =
                this.ksqlDbConnectorRequestMapper().ksqlDbConnectorCreateRequest(apiRequest);

        this.ksqlDbConnectorService.createKsqlDbConnector(request);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @WithCleanUp
    @WithKsqlDbCode
    @WithAudit(
            action = KsqlDbConnectorActions.DELETE_KSQLDB_CONNECTOR,
            type = EntityType.KSQLDB,
            severity = AuditSeverity.HIGH)
    @WithKsqlDbClient
    @WithAuthorization(
            permission = KsqlDbConnectorActions.DELETE_KSQLDB_CONNECTOR,
            type = EntityType.KSQLDB)
    @Override
    public ResponseEntity<Void> deleteKsqlDbConnector(String connectorName) {
        KsqlDbConnectorDeleteRequest request =
                this.ksqlDbConnectorRequestMapper().ksqlDbConnectorDeleteRequest(connectorName);

        this.ksqlDbConnectorService.deleteKsqlDbConnector(request);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    private KsqlDbConnectorRequestMapper ksqlDbConnectorRequestMapper() {
        return this.ksqlDbRequestMapper.ksqlDbConnectorRequestMapper();
    }
}
