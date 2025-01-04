CREATE SEQUENCE IF NOT EXISTS producers_seq
    INCREMENT BY 50
    START WITH 1;

CREATE TABLE IF NOT EXISTS producers (
    id BIGINT NOT NULL DEFAULT nextval('producers_seq'),
    code TEXT UNIQUE,

    main_configuration TEXT,

    key_serializer TEXT,
    key_serializer_configuration TEXT,
    per_request_key_serializer BOOLEAN,

    value_serializer TEXT,
    value_serializer_configuration TEXT,
    per_request_value_serializer BOOLEAN,

    cluster_id BIGINT,

    PRIMARY KEY (id),
    FOREIGN KEY (cluster_id) REFERENCES clusters(id)
);