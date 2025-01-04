IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='data_masking_rules_seq' and xtype='SO')
    CREATE SEQUENCE data_masking_rules_seq
        START WITH 1
        INCREMENT BY 1;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='data_masking_rules' and xtype='U')
    CREATE TABLE data_masking_rules (
        id BIGINT NOT NULL DEFAULT NEXT VALUE FOR data_masking_rules_seq,
        code VARCHAR(255) UNIQUE,
        name TEXT,
    
        data_masking_type TEXT,
        result TEXT,
    
        blazing_rule TEXT,
        rule_type TEXT,
    
        topic TEXT,
        topic_type TEXT,
    
        PRIMARY KEY (id)
    );