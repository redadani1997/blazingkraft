IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='ksqldbs_seq' and xtype='SO')
    CREATE SEQUENCE ksqldbs_seq
        START WITH 1
        INCREMENT BY 1;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='ksqldbs' and xtype='U')
    CREATE TABLE ksqldbs (
        id BIGINT NOT NULL DEFAULT NEXT VALUE FOR ksqldbs_seq,
        code VARCHAR(255) UNIQUE,
        name TEXT,
        color TEXT,
    
        host TEXT,
        execute_query_max_result_rows INT,
        port INT,
        use_alpn BIT,
        use_tls BIT,
        verify_host BIT,
    
        basic_auth_enabled BIT,
        basic_auth_username TEXT,
        basic_auth_password TEXT,
    
        key_store_enabled BIT,
        key_store TEXT,
        key_store_password TEXT,
    
        trust_store_enabled BIT,
        trust_store TEXT,
        trust_store_password TEXT,

        jmx_enabled BOOLEAN,
        jmx_url TEXT,
        jmx_environment TEXT,
    
        PRIMARY KEY (id)
    );