package com.redadani1997.blazingkraft.ksqldb.mapper.in.editor;

import com.redadani1997.blazingkraft.audit.service.AuditLogService;
import com.redadani1997.blazingkraft.authorization.facade.CurrentUserFacade;
import com.redadani1997.blazingkraft.authorization.service.impl.CommonAuthorizationService;
import com.redadani1997.blazingkraft.cleanup.service.CleanUpService;
import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.currentcode.CurrentCode;
import com.redadani1997.blazingkraft.common.actions.ksqldb.KsqlDbEditorActions;
import com.redadani1997.blazingkraft.common.current_user.CurrentUser;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import com.redadani1997.blazingkraft.common.util.CommonCastingUtils;
import com.redadani1997.blazingkraft.common.validator.CommonValidator;
import com.redadani1997.blazingkraft.ksqldb.dto.in.editor.KsqlDbEditorRequest;
import com.redadani1997.blazingkraft.ksqldb.dto.in.editor.KsqlDbStreamQueryRequest;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_editor.openapi.model.KsqlDbEditorApiRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class KsqlDbEditorRequestMapper {
    private final ClientsFactory clientsFactory;
    private final CommonAuthorizationService commonAuthorizationService;
    private final CleanUpService cleanUpService;
    private final AuditLogService auditLogService;
    private final CurrentUserFacade currentUserFacade;

    public KsqlDbEditorRequest ksqlDbEditorRequest(KsqlDbEditorApiRequest apiRequest) {
        CommonValidator.assertNotNull("Request", apiRequest);

        this.auditLogService.setSubject(apiRequest.getSql());

        CommonValidator.assertNotBlank("Sql", apiRequest.getSql());

        return KsqlDbEditorRequest.builder()
                .sql(apiRequest.getSql())
                .properties(apiRequest.getProperties())
                .build();
    }

    public KsqlDbStreamQueryRequest ksqlDbStreamQueryRequest(
            String requestBody, CurrentUser currentUser) {
        this.cleanUpService.cleanUp();

        this.currentUserFacade.setCurrentWSUser(currentUser);

        KsqlDbStreamQueryRequest request =
                CommonCastingUtils.cast(requestBody, KsqlDbStreamQueryRequest.class);

        CommonValidator.assertNotNull("Request", request);

        this.auditLogService.setEntityType(EntityType.KSQLDB);

        this.auditLogService.setSubject(request.getSql());

        CommonValidator.assertNotBlank("KsqlDb Code", request.getKsqlDbCode());

        this.handleClientAndEntity(request);

        CommonValidator.assertNotBlank("Sql", request.getSql());

        this.commonAuthorizationService.authorize(
                currentUser,
                KsqlDbEditorActions.KSQLDB_EDITOR_STREAM_QUERY,
                com.redadani1997.blazingkraft.common.enums.EntityType.KSQLDB);

        return request;
    }

    private void handleClientAndEntity(KsqlDbStreamQueryRequest request) {
        CurrentCode currentCode = new CurrentCode(request.getKsqlDbCode(), EntityType.KSQLDB);
        this.clientsFactory.setCurrentCode(currentCode);
        this.auditLogService.setEntity(request.getKsqlDbCode());
        this.clientsFactory.setCurrentKsqlDbClient(request.getKsqlDbCode());
    }
}
