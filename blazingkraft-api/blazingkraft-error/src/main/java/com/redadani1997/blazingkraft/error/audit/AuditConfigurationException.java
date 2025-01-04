package com.redadani1997.blazingkraft.error.audit;

public class AuditConfigurationException extends AuditException {
    public AuditConfigurationException(String message) {
        super(message);
    }

    public AuditConfigurationException(Throwable cause) {
        super(cause);
    }

    public AuditConfigurationException(Throwable cause, String message) {
        super(cause, message);
    }
}
