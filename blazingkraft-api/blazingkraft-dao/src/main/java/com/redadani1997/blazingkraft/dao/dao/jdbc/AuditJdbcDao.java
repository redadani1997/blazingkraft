package com.redadani1997.blazingkraft.dao.dao.jdbc;

import com.redadani1997.blazingkraft.dao.dao.AuditDao;
import com.redadani1997.blazingkraft.dao.dao.jdbc.repository.AuditRepository;
import com.redadani1997.blazingkraft.dao.model.AuditModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public class AuditJdbcDao implements AuditDao {
    private final AuditRepository repository;

    public AuditJdbcDao(AuditRepository repository) {
        this.repository = repository;
    }

    @Override
    public AuditModel create(AuditModel model) {
        return this.repository.save(model);
    }

    @Override
    public Page<AuditModel> search(
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
            Integer size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "timestamp"));
        return this.repository.search(
                action,
                entityType,
                entity,
                subject,
                startTimestamp,
                endTimestamp,
                userIdentifier,
                userDisplayedName,
                auditLevel,
                severity,
                settledMessage,
                pageable);
    }
}
