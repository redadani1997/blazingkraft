CREATE TABLE IF NOT EXISTS producers (
    id BIGINT NOT NULL AUTO_INCREMENT,
    code VARCHAR(255) UNIQUE,

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