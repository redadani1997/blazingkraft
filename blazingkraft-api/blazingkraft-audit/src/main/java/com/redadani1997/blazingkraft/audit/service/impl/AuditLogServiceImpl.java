package com.redadani1997.blazingkraft.audit.service.impl;

import com.redadani1997.blazingkraft.audit.enums.AuditLevel;
import com.redadani1997.blazingkraft.audit.enums.AuditSeverity;
import com.redadani1997.blazingkraft.audit.service.AuditLogService;
import com.redadani1997.blazingkraft.authorization.facade.CurrentUserFacade;
import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.currentcode.CurrentCode;
import com.redadani1997.blazingkraft.common.current_user.CurrentUser;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import com.redadani1997.blazingkraft.common.util.CommonLogUtils;
import com.redadani1997.blazingkraft.dao.dao.AuditDao;
import com.redadani1997.blazingkraft.dao.model.AuditModel;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class AuditLogServiceImpl implements AuditLogService {
    private final AuditDao auditDao;
    private final ClientsFactory clientsFactory;
    private final CurrentUserFacade currentUserFacade;
    private final boolean isErrorLevel;
    private final boolean isInfoLevel;
    private final boolean isDisabled;
    private ThreadLocal<EntityType> entityType = new ThreadLocal<>();
    private ThreadLocal<String> entity = new ThreadLocal<>();
    private ThreadLocal<String> subject = new ThreadLocal<>();

    public AuditLogServiceImpl(
            AuditDao auditDao,
            ClientsFactory clientsFactory,
            CurrentUserFacade currentUserFacade,
            AuditLevel auditLevel) {
        this.auditDao = auditDao;
        this.clientsFactory = clientsFactory;
        this.currentUserFacade = currentUserFacade;
        this.isErrorLevel = auditLevel == AuditLevel.ERROR;
        this.isInfoLevel = this.isErrorLevel || auditLevel == AuditLevel.INFO;
        this.isDisabled = auditLevel == null || auditLevel == AuditLevel.NONE;
    }

    @Override
    public void logSuccess(String action, AuditSeverity severity) {
        if (!this.isInfoLevel) {
            return;
        }
        try {
            AuditModel auditModel = constructBaseAuditModel(action, severity);

            auditModel.setAuditLevel(AuditLevel.INFO.name());
            // TODO: Handle on success or leave as null?
            auditModel.setSettledMessage(null);

            this.auditDao.create(auditModel);
        } catch (Exception ex) {
            String error =
                    String.format(
                            "Error while adding a INFO entry to the audit log: '%s', ignoring error...",
                            ex.getMessage());
            log.error(CommonLogUtils.getError(error));
        }
    }

    @Override
    public void logFailure(String action, AuditSeverity severity, Throwable throwable) {
        if (!this.isErrorLevel) {
            return;
        }
        try {
            AuditModel auditModel = constructBaseAuditModel(action, severity);

            auditModel.setAuditLevel(AuditLevel.ERROR.name());
            auditModel.setSettledMessage(throwable.getMessage());

            this.auditDao.create(auditModel);
        } catch (Exception ex) {
            String error =
                    String.format(
                            "Error while adding a ERROR entry to the audit log: '%s', ignoring error...",
                            ex.getMessage());
            log.error(CommonLogUtils.getError(error));
        }
    }

    private AuditModel constructBaseAuditModel(String action, AuditSeverity severity) {
        CurrentUser currentUser = this.currentUserFacade.currentUser();

        String entityType = this.entityType.get().name();

        AuditModel auditModel = new AuditModel();

        auditModel.setSeverity(severity.name());
        auditModel.setAction(action);
        auditModel.setEntityType(entityType);
        auditModel.setEntity(this.getEntity());
        auditModel.setSubject(this.subject.get());
        auditModel.setTimestamp(System.currentTimeMillis());
        auditModel.setUserDisplayedName(currentUser.getDisplayedName());
        auditModel.setUserIdentifier(currentUser.getIdentifier());

        return auditModel;
    }

    @Override
    public void setSubject(String subject) {
        if (!this.isDisabled) {
            this.subject.set(subject);
        }
    }

    @Override
    public void setEntityType(EntityType type) {
        if (!this.isDisabled) {
            this.entityType.set(type);
        }
    }

    @Override
    public void setEntity(String entity) {
        if (!this.isDisabled) {
            return;
        }
        this.entity.set(entity);
    }

    @Override
    public void cleanUp() {
        this.entityType.remove();
        this.entity.remove();
        this.subject.remove();
    }

    private String getEntity() {
        String entity = this.entity.get();
        if (entity != null) {
            return entity;
        }
        CurrentCode currentCode = this.clientsFactory.currentCode();
        if (currentCode != null) {
            return currentCode.getCode();
        }
        return null;
    }
}
