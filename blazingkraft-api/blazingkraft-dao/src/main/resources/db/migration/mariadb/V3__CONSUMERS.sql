CREATE TABLE IF NOT EXISTS consumers (
    id BIGINT NOT NULL AUTO_INCREMENT,
    code VARCHAR(255) UNIQUE,

    main_configuration TEXT,

    poll_timeout_ms BIGINT,

    key_deserializer TEXT,
    key_deserializer_configuration TEXT,
    per_request_key_deserializer BOOLEAN,

    value_deserializer TEXT,
    value_deserializer_configuration TEXT,
    per_request_value_deserializer BOOLEAN,

    cluster_id BIGINT,

    PRIMARY KEY (id),
    FOREIGN KEY (cluster_id) REFERENCES clusters(id)
);