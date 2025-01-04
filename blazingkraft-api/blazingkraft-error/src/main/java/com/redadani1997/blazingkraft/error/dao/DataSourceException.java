package com.redadani1997.blazingkraft.error.dao;

public class DataSourceException extends DaoException {
    public DataSourceException(String message) {
        super(message);
    }

    public DataSourceException(Throwable cause) {
        super(cause);
    }

    public DataSourceException(Throwable cause, String message) {
        super(cause, message);
    }
}
