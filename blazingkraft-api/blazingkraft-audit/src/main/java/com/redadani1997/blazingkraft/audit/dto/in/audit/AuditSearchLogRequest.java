package com.redadani1997.blazingkraft.audit.dto.in.audit;

import lombok.Data;

@Data
public class AuditSearchLogRequest {
    private String action;

    private String entityType;

    private String entity;

    private String subject;

    private Long startTimestamp;

    private Long endTimestamp;

    private String userIdentifier;

    private String userDisplayedName;

    private String auditLevel;

    private String severity;

    private String settledMessage;

    private Integer page;

    private Integer size;
}
