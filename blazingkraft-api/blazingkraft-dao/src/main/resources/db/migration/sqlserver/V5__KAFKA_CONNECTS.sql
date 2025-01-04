IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='kafka_connects_seq' and xtype='SO')
    CREATE SEQUENCE kafka_connects_seq
        START WITH 1
        INCREMENT BY 1;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='kafka_connects' and xtype='U')
    CREATE TABLE kafka_connects (
        id BIGINT NOT NULL DEFAULT NEXT VALUE FOR kafka_connects_seq,
        code VARCHAR(255) UNIQUE,
        name TEXT,
        color TEXT,

        url TEXT,

        basic_auth_enabled BIT,
        basic_auth_username TEXT,
        basic_auth_password TEXT,

        jmx_enabled BOOLEAN,
        jmx_url TEXT,
        jmx_environment TEXT,

        cluster_id BIGINT,

        PRIMARY KEY (id),
        FOREIGN KEY (cluster_id) REFERENCES clusters(id)
    );