IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='producers_seq' and xtype='SO')
    CREATE SEQUENCE producers_seq
        START WITH 1
        INCREMENT BY 1;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='producers' and xtype='U')
    CREATE TABLE producers (
        id BIGINT NOT NULL DEFAULT NEXT VALUE FOR producers_seq,
        code VARCHAR(255) UNIQUE,

        main_configuration TEXT,

        key_serializer TEXT,
        key_serializer_configuration TEXT,
        per_request_key_serializer BIT,

        value_serializer TEXT,
        value_serializer_configuration TEXT,
        per_request_value_serializer BIT,

        cluster_id BIGINT,

        PRIMARY KEY (id),
        FOREIGN KEY (cluster_id) REFERENCES clusters(id)
    );