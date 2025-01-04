package com.redadani1997.blazingkraft.audit.controller;

import com.redadani1997.blazingkraft.audit.audit_search.openapi.api.AuditSearchApi;
import com.redadani1997.blazingkraft.audit.audit_search.openapi.model.AuditSearchLogApiRequest;
import com.redadani1997.blazingkraft.audit.audit_search.openapi.model.AuditSearchLogPageApiResponse;
import com.redadani1997.blazingkraft.audit.dto.in.audit.AuditSearchLogRequest;
import com.redadani1997.blazingkraft.audit.mapper.in.AuditRequestMapper;
import com.redadani1997.blazingkraft.audit.mapper.in.search.AuditSearchRequestMapper;
import com.redadani1997.blazingkraft.audit.service.AuditSearchService;
import com.redadani1997.blazingkraft.authorization.decorator.WithAuthorization;
import com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp;
import com.redadani1997.blazingkraft.common.actions.management.AuditActions;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuditSearchController implements AuditSearchApi {
    private final AuditSearchService auditSearchService;
    private final AuditRequestMapper auditRequestMapper;

    @WithCleanUp
    @WithAuthorization(permission = AuditActions.SEARCH_AUDIT_LOG, type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<AuditSearchLogPageApiResponse> searchAuditLog(
            Integer page, Integer size, AuditSearchLogApiRequest apiRequest) {
        AuditSearchLogRequest request =
                this.auditRequestMapper
                        .auditSearchRequestMapper()
                        .searchAuditLogRequest(page, size, apiRequest);

        AuditSearchLogPageApiResponse response = this.auditSearchService.searchAuditLog(request);

        return ResponseEntity.ok(response);
    }

    private AuditSearchRequestMapper auditSearchRequestMapper() {
        return this.auditRequestMapper.auditSearchRequestMapper();
    }
}
