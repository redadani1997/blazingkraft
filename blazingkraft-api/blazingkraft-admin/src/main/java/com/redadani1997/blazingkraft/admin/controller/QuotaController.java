package com.redadani1997.blazingkraft.admin.controller;

import com.redadani1997.blazingkraft.admin.dto.in.quota.QuotaAlterRequest;
import com.redadani1997.blazingkraft.admin.dto.in.quota.QuotaDescribeRequest;
import com.redadani1997.blazingkraft.admin.mapper.in.AdminRequestMapper;
import com.redadani1997.blazingkraft.admin.mapper.in.quota.QuotaRequestMapper;
import com.redadani1997.blazingkraft.admin.quota.openapi.api.QuotaApi;
import com.redadani1997.blazingkraft.admin.quota.openapi.model.QuotaAlterApiRequest;
import com.redadani1997.blazingkraft.admin.quota.openapi.model.QuotaDescribeApiRequest;
import com.redadani1997.blazingkraft.admin.quota.openapi.model.QuotaDescribeApiResponse;
import com.redadani1997.blazingkraft.admin.service.QuotaService;
import com.redadani1997.blazingkraft.audit.decorator.WithAudit;
import com.redadani1997.blazingkraft.audit.enums.AuditSeverity;
import com.redadani1997.blazingkraft.authorization.decorator.WithAuthorization;
import com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp;
import com.redadani1997.blazingkraft.client.decorator.WithClusterClient;
import com.redadani1997.blazingkraft.client.decorator.WithClusterCode;
import com.redadani1997.blazingkraft.common.actions.cluster.QuotaActions;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class QuotaController implements QuotaApi {

    private final AdminRequestMapper adminRequestMapper;
    private final QuotaService quotaService;

    @WithCleanUp
    @WithClusterCode
    @WithAudit(
            action = QuotaActions.ALTER_QUOTA,
            type = EntityType.CLUSTER,
            severity = AuditSeverity.HIGH)
    @WithClusterClient
    @WithAuthorization(permission = QuotaActions.ALTER_QUOTA, type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<Void> alterQuotas(QuotaAlterApiRequest apiRequest) {
        QuotaAlterRequest request = this.quotaRequestMapper().quotaAlterRequest(apiRequest);

        this.quotaService.alterQuotas(request);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @WithCleanUp
    @WithClusterCode
    @WithClusterClient
    @WithAuthorization(permission = QuotaActions.DESCRIBE_QUOTAS, type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<List<QuotaDescribeApiResponse>> describeQuotas(
            QuotaDescribeApiRequest apiRequest) {
        QuotaDescribeRequest request = this.quotaRequestMapper().quotaDescribeRequest(apiRequest);

        List<QuotaDescribeApiResponse> responses = this.quotaService.describeQuotas(request);

        return ResponseEntity.ok(responses);
    }

    public QuotaRequestMapper quotaRequestMapper() {
        return this.adminRequestMapper.quotaRequestMapper();
    }
}
