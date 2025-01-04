package com.redadani1997.blazingkraft.audit.service;

import com.redadani1997.blazingkraft.audit.audit_search.openapi.model.AuditSearchLogPageApiResponse;
import com.redadani1997.blazingkraft.audit.dto.in.audit.AuditSearchLogRequest;

public interface AuditSearchService {

    AuditSearchLogPageApiResponse searchAuditLog(AuditSearchLogRequest request);
}
