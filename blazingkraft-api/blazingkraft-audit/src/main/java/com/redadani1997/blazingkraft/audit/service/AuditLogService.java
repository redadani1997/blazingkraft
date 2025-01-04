package com.redadani1997.blazingkraft.audit.service;

import com.redadani1997.blazingkraft.audit.enums.AuditSeverity;
import com.redadani1997.blazingkraft.common.enums.EntityType;

public interface AuditLogService {
    void logSuccess(String action, AuditSeverity severity);

    void logFailure(String action, AuditSeverity severity, Throwable throwable);

    void setSubject(String subject);

    void setEntityType(EntityType type);

    void setEntity(String entity);

    void cleanUp();
}
