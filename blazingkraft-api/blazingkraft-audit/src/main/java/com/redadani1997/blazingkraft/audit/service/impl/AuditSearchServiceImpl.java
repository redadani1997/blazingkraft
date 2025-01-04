package com.redadani1997.blazingkraft.audit.service.impl;

import com.redadani1997.blazingkraft.audit.audit_search.openapi.model.AuditSearchLogPageApiResponse;
import com.redadani1997.blazingkraft.audit.dto.in.audit.AuditSearchLogRequest;
import com.redadani1997.blazingkraft.audit.mapper.out.AuditResponseMapper;
import com.redadani1997.blazingkraft.audit.mapper.out.search.AuditSearchResponseMapper;
import com.redadani1997.blazingkraft.audit.service.AuditSearchService;
import com.redadani1997.blazingkraft.dao.dao.AuditDao;
import com.redadani1997.blazingkraft.dao.model.AuditModel;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuditSearchServiceImpl implements AuditSearchService {
    private final AuditDao auditDao;
    private final AuditResponseMapper auditResponseMapper;

    @Override
    public AuditSearchLogPageApiResponse searchAuditLog(AuditSearchLogRequest request) {
        Page<AuditModel> auditPage =
                this.auditDao.search(
                        request.getAction(),
                        request.getEntityType(),
                        request.getEntity(),
                        request.getSubject(),
                        request.getStartTimestamp(),
                        request.getEndTimestamp(),
                        request.getUserIdentifier(),
                        request.getUserDisplayedName(),
                        request.getAuditLevel(),
                        request.getSeverity(),
                        request.getSettledMessage(),
                        request.getPage(),
                        request.getSize());

        return this.auditSearchResponseMapper().auditSearchLogPageApiResponse(auditPage);
    }

    private AuditSearchResponseMapper auditSearchResponseMapper() {
        return this.auditResponseMapper.auditSearchResponseMapper();
    }
}
