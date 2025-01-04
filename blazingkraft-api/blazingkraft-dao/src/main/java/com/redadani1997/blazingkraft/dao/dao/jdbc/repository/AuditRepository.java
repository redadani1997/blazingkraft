package com.redadani1997.blazingkraft.dao.dao.jdbc.repository;

import com.redadani1997.blazingkraft.dao.model.AuditModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AuditRepository extends JpaRepository<AuditModel, Long> {

    @Query(
            value =
                    "SELECT a FROM AuditModel a WHERE "
                            + " (:action IS NULL OR a.action LIKE %:action%) "
                            + " AND "
                            + " (:entityType IS NULL OR a.entityType LIKE %:entityType%) "
                            + " AND "
                            + " (:entity IS NULL OR a.entity LIKE %:entity%) "
                            + " AND "
                            + " (:subject IS NULL OR a.subject LIKE %:subject%) "
                            + " AND "
                            + " (:startTimestamp IS NULL OR a.timestamp >= :startTimestamp) "
                            + " AND "
                            + " (:endTimestamp IS NULL OR a.timestamp <= :endTimestamp) "
                            + " AND "
                            + " (:userIdentifier IS NULL OR a.userIdentifier LIKE %:userIdentifier%) "
                            + " AND "
                            + " (:userDisplayedName IS NULL OR a.userDisplayedName LIKE %:userDisplayedName%) "
                            + " AND "
                            + " (:auditLevel IS NULL OR a.auditLevel LIKE %:auditLevel%) "
                            + " AND "
                            + " (:severity IS NULL OR a.severity LIKE %:severity%) "
                            + " AND "
                            + " (:settledMessage IS NULL OR a.settledMessage LIKE %:settledMessage%) ")
    Page<AuditModel> search(
            @Param("action") String action,
            @Param("entityType") String entityType,
            @Param("entity") String entity,
            @Param("subject") String subject,
            @Param("startTimestamp") Long startTimestamp,
            @Param("endTimestamp") Long endTimestamp,
            @Param("userIdentifier") String userIdentifier,
            @Param("userDisplayedName") String userDisplayedName,
            @Param("auditLevel") String auditLevel,
            @Param("severity") String severity,
            @Param("settledMessage") String settledMessage,
            Pageable pageable);
}
