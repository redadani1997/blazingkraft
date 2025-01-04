package com.redadani1997.blazingkraft.audit.configuration;

import com.redadani1997.blazingkraft.audit.enums.AuditLevel;
import com.redadani1997.blazingkraft.audit.service.AuditLogService;
import com.redadani1997.blazingkraft.audit.service.impl.AuditLogServiceImpl;
import com.redadani1997.blazingkraft.authorization.facade.CurrentUserFacade;
import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.common.constant.CommonEnvConstants;
import com.redadani1997.blazingkraft.common.enums.EnumUtils;
import com.redadani1997.blazingkraft.common.util.CommonLogUtils;
import com.redadani1997.blazingkraft.dao.dao.AuditDao;
import com.redadani1997.blazingkraft.error.audit.AuditConfigurationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class AuditConfiguration {
    private final AuditDao auditDao;
    private final ClientsFactory clientsFactory;
    private final CurrentUserFacade currentUserFacade;
    private final Environment environment;

    @Bean
    public AuditLogService auditLogService() {
        String auditLevelString =
                this.environment.getProperty(CommonEnvConstants.BLAZINGKRAFT_AUDIT_LEVEL, "NONE");

        AuditLevel auditLevel;

        try {
            auditLevel = EnumUtils.fromName(AuditLevel.class, auditLevelString, AuditLevel.NONE);
        } catch (Exception ex) {
            throw new AuditConfigurationException(
                    ex,
                    String.format(
                            "Error while evaluating audit level: '%s' for environment variable '%s'. Valid values are INFO, ERROR, NONE or by default NONE.",
                            auditLevelString, CommonEnvConstants.BLAZINGKRAFT_AUDIT_LEVEL));
        }
        log.info(
                CommonLogUtils.getInfo(
                        String.format("Blazing KRaft Audit level set to: '%s'", auditLevel)));
        return new AuditLogServiceImpl(auditDao, clientsFactory, currentUserFacade, auditLevel);
    }
}
