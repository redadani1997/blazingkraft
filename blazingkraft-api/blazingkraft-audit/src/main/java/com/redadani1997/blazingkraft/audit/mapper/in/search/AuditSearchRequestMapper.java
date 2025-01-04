package com.redadani1997.blazingkraft.audit.mapper.in.search;

import com.redadani1997.blazingkraft.audit.audit_search.openapi.model.AuditSearchLogApiRequest;
import com.redadani1997.blazingkraft.audit.dto.in.audit.AuditSearchLogRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class AuditSearchRequestMapper {
    public AuditSearchLogRequest searchAuditLogRequest(
            Integer page, Integer size, AuditSearchLogApiRequest apiRequest) {
        AuditSearchLogRequest request = new AuditSearchLogRequest();

        request.setAuditLevel(this.getOrNull(apiRequest.getAuditLevel()));
        request.setAction(this.getOrNull(apiRequest.getAction()));
        request.setSeverity(this.getOrNull(apiRequest.getSeverity()));
        request.setSubject(this.getOrNull(apiRequest.getSubject()));
        request.setEntity(this.getOrNull(apiRequest.getEntity()));
        request.setEntityType(this.getOrNull(apiRequest.getEntityType()));
        request.setSettledMessage(this.getOrNull(apiRequest.getSettledMessage()));
        request.setUserDisplayedName(this.getOrNull(apiRequest.getUserDisplayedName()));
        request.setUserIdentifier(this.getOrNull(apiRequest.getUserIdentifier()));
        request.setStartTimestamp(apiRequest.getStartTimestamp());
        request.setEndTimestamp(apiRequest.getEndTimestamp());
        request.setPage(page != null ? page : 1);
        request.setSize(size != null ? size : 100);

        return request;
    }

    private String getOrNull(String value) {
        return value == null || value.isEmpty() ? null : value;
    }
}
