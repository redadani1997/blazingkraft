package com.redadani1997.blazingkraft.audit.decorator.aspect;

import com.redadani1997.blazingkraft.audit.decorator.WithAudit;
import com.redadani1997.blazingkraft.audit.enums.AuditSeverity;
import com.redadani1997.blazingkraft.audit.service.AuditLogService;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import java.lang.reflect.Method;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Order(1)
@RequiredArgsConstructor
public class WithAuditAspect {
    private final AuditLogService auditLogService;

    @Around("@annotation(com.redadani1997.blazingkraft.audit.decorator.WithAudit)")
    public Object withAuditAspect(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        MethodSignature signature = (MethodSignature) proceedingJoinPoint.getSignature();
        Method method = signature.getMethod();

        WithAudit annotation = method.getAnnotation(WithAudit.class);

        String action = annotation.action();
        EntityType type = annotation.type();
        AuditSeverity severity = annotation.severity();

        this.auditLogService.setEntityType(type);

        try {
            Object result = proceedingJoinPoint.proceed();
            this.auditLogService.logSuccess(action, severity);
            return result;
        } catch (Throwable throwable) {
            this.auditLogService.logFailure(action, severity, throwable);
            throw throwable;
        }
    }
}
