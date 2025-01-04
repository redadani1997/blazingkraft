CREATE SEQUENCE IF NOT EXISTS clusters_seq
    INCREMENT BY 50
    START WITH 1;

CREATE TABLE IF NOT EXISTS clusters (
    id BIGINT NOT NULL DEFAULT nextval('native'),
    code TEXT UNIQUE,
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