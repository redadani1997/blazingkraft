package com.redadani1997.blazingkraft.ksqldb.controller;

import com.redadani1997.blazingkraft.audit.decorator.WithAudit;
import com.redadani1997.blazingkraft.audit.enums.AuditSeverity;
import com.redadani1997.blazingkraft.authorization.decorator.WithAuthorization;
import com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp;
import com.redadani1997.blazingkraft.client.decorator.WithKsqlDbClient;
import com.redadani1997.blazingkraft.client.decorator.WithKsqlDbCode;
import com.redadani1997.blazingkraft.common.actions.ksqldb.KsqlDbEditorActions;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import com.redadani1997.blazingkraft.ksqldb.dto.in.editor.KsqlDbEditorRequest;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_editor.openapi.api.KsqlDbEditorApi;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_editor.openapi.model.KsqlDbEditorApiRequest;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_editor.openapi.model.KsqlDbEditorQueryApiResponse;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_editor.openapi.model.KsqlDbEditorStatementApiResponse;
import com.redadani1997.blazingkraft.ksqldb.mapper.in.KsqlDbRequestMapper;
import com.redadani1997.blazingkraft.ksqldb.mapper.in.editor.KsqlDbEditorRequestMapper;
import com.redadani1997.blazingkraft.ksqldb.service.KsqlDbEditorService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class KsqlDbEditorController implements KsqlDbEditorApi {

    private final KsqlDbEditorService ksqlDbEditorService;
    private final KsqlDbRequestMapper ksqlDbRequestMapper;

    @WithCleanUp
    @WithKsqlDbCode
    @WithAudit(
            action = KsqlDbEditorActions.KSQLDB_EDITOR_EXECUTE_QUERY,
            type = EntityType.KSQLDB,
            severity = AuditSeverity.LOW)
    @WithKsqlDbClient
    @WithAuthorization(
            permission = KsqlDbEditorActions.KSQLDB_EDITOR_EXECUTE_QUERY,
            type = EntityType.KSQLDB)
    @Override
    public ResponseEntity<List<KsqlDbEditorQueryApiResponse>> executeQuery(
            KsqlDbEditorApiRequest apiRequest) {
        KsqlDbEditorRequest request = this.ksqlDbEditorRequestMapper().ksqlDbEditorRequest(apiRequest);

        List<KsqlDbEditorQueryApiResponse> responses = this.ksqlDbEditorService.executeQuery(request);

        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @WithCleanUp
    @WithKsqlDbCode
    @WithAudit(
            action = KsqlDbEditorActions.KSQLDB_EDITOR_EXECUTE_STATEMENT,
            type = EntityType.KSQLDB,
            severity = AuditSeverity.MEDIUM)
    @WithKsqlDbClient
    @WithAuthorization(
            permission = KsqlDbEditorActions.KSQLDB_EDITOR_EXECUTE_STATEMENT,
            type = EntityType.KSQLDB)
    @Override
    public ResponseEntity<KsqlDbEditorStatementApiResponse> executeStatement(
            KsqlDbEditorApiRequest apiRequest) {

        KsqlDbEditorRequest request = this.ksqlDbEditorRequestMapper().ksqlDbEditorRequest(apiRequest);

        KsqlDbEditorStatementApiResponse response = this.ksqlDbEditorService.executeStatement(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    private KsqlDbEditorRequestMapper ksqlDbEditorRequestMapper() {
        return this.ksqlDbRequestMapper.ksqlDbEditorRequestMapper();
    }
}
