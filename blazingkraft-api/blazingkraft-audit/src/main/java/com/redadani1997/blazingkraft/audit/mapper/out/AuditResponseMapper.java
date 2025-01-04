package com.redadani1997.blazingkraft.audit.mapper.out;

import com.redadani1997.blazingkraft.audit.mapper.out.search.AuditSearchResponseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuditResponseMapper {
    private final AuditSearchResponseMapper auditSearchResponseMapper;

    public AuditSearchResponseMapper auditSearchResponseMapper() {
        return this.auditSearchResponseMapper;
    }
}
