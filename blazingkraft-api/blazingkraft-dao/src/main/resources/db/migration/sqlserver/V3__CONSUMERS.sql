IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='consumers_seq' and xtype='SO')
    CREATE SEQUENCE consumers_seq
        START WITH 1
        INCREMENT BY 1;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='consumers' and xtype='U')
    CREATE TABLE consumers (
        id BIGINT NOT NULL DEFAULT NEXT VALUE FOR consumers_seq,
        code VARCHAR(255) UNIQUE,

        main_configuration TEXT,

        poll_timeout_ms BIGINT,

        key_deserializer TEXT,
        key_deserializer_configuration TEXT,
        per_request_key_deserializer BIT,

        value_deserializer TEXT,
        value_deserializer_configuration TEXT,
        per_request_value_deserializer BIT,

        cluster_id BIGINT,

        PRIMARY KEY (id),
        FOREIGN KEY (cluster_id) REFERENCES clusters(id)
    );