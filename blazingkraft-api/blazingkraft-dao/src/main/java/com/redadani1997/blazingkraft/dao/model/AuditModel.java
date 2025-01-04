package com.redadani1997.blazingkraft.dao.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "audit_log")
@Getter
@Setter
@NoArgsConstructor
public class AuditModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private Long id;

    private String action;

    private String entityType;

    private String entity;

    private String subject;

    private long timestamp;

    private String userIdentifier;

    private String userDisplayedName;

    private String auditLevel;

    private String severity;

    private String settledMessage;
}
