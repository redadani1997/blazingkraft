package com.redadani1997.blazingkraft.audit.decorator;

import com.redadani1997.blazingkraft.audit.enums.AuditSeverity;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import java.lang.annotation.*;

@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
public @interface WithAudit {
    EntityType type();

    String action();

    AuditSeverity severity();
}
