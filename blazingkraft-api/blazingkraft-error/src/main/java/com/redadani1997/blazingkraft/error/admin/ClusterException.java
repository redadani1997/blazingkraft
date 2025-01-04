package com.redadani1997.blazingkraft.error.admin;

public class ClusterException extends AdminException {
    public ClusterException(String message) {
        super(message);
    }

    public ClusterException(Throwable cause) {
        super(cause);
    }

    public ClusterException(Throwable cause, String message) {
        super(cause, message);
    }
}
