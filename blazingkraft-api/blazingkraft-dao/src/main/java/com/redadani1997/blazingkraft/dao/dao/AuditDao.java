package com.redadani1997.blazingkraft.dao.dao;

import com.redadani1997.blazingkraft.dao.model.AuditModel;
import org.springframework.data.domain.Page;

public interface AuditDao {
    AuditModel create(AuditModel auditModel);

    Page<AuditModel> search(
            String action,
            String entityType,
            String entity,
            String subject,
            Long startTimestamp,
            Long endTimestamp,
            String userIdentifier,
            String userDisplayedName,
            String auditLevel,
            String severity,
            String settledMessage,
            Integer page,
            Integer size);
}
