IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='clusters_seq' and xtype='SO')
    CREATE SEQUENCE clusters_seq
        START WITH 1
        INCREMENT BY 1;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='clusters' and xtype='U')
    CREATE TABLE clusters (
        id BIGINT NOT NULL DEFAULT NEXT VALUE FOR clusters_seq,
        code VARCHAR(255) UNIQUE,
        name TEXT,
        color TEXT,
        common_configuration TEXT,

        jmx_enabled BOOLEAN,
        jmx_url TEXT,
        jmx_environment TEXT,

        schema_registry_id BIGINT,

        PRIMARY KEY (id),
        FOREIGN KEY (schema_registry_id) REFERENCES schema_registries(id)
    );