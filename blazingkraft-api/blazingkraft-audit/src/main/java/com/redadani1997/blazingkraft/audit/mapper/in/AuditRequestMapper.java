package com.redadani1997.blazingkraft.audit.mapper.in;

import com.redadani1997.blazingkraft.audit.mapper.in.search.AuditSearchRequestMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class AuditRequestMapper {
    private final AuditSearchRequestMapper auditSearchRequestMapper;

    public AuditSearchRequestMapper auditSearchRequestMapper() {
        return this.auditSearchRequestMapper;
    }
}
