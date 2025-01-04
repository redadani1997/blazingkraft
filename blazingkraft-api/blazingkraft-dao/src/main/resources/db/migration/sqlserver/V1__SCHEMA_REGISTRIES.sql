IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='schema_registries_seq' and xtype='SO')
    CREATE SEQUENCE schema_registries_seq
        START WITH 1
        INCREMENT BY 1;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='schema_registries' and xtype='U')
    CREATE TABLE schema_registries (
        id BIGINT NOT NULL DEFAULT NEXT VALUE FOR schema_registries_seq,
        code VARCHAR(255) UNIQUE,
        name TEXT,
        color TEXT,
        schema_registry_urls TEXT,
        schemas_cache_size INT,
        main_configuration TEXT,

        jmx_enabled BOOLEAN,
        jmx_url TEXT,
        jmx_environment TEXT,

        PRIMARY KEY (id)
    );
