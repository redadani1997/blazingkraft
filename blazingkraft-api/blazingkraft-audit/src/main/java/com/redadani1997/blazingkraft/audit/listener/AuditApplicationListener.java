package com.redadani1997.blazingkraft.audit.listener;

import com.redadani1997.blazingkraft.audit.service.AuditLogService;
import com.redadani1997.blazingkraft.common.application_event.CleanUpApplicationEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuditApplicationListener {
    private final AuditLogService auditLogService;

    @EventListener
    public void cleanUpApplicationEvent(CleanUpApplicationEvent eventData) {
        this.auditLogService.cleanUp();
    }
}
