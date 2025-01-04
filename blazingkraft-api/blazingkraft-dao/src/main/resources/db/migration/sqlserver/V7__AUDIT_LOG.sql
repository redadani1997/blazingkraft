IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='audit_log_seq' and xtype='SO')
    CREATE SEQUENCE audit_log_seq
        START WITH 1
        INCREMENT BY 1;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='audit_log' and xtype='U')
    CREATE TABLE audit_log (
        id BIGINT NOT NULL DEFAULT NEXT VALUE FOR audit_log_seq,
        action TEXT,
        audit_level TEXT,
        entity TEXT,
        entity_type TEXT,
        settled_message TEXT,
        severity TEXT,
        subject TEXT,
        timestamp BIGINT,
        user_displayed_name TEXT,
        user_identifier TEXT,
    
        PRIMARY KEY (id)
    );