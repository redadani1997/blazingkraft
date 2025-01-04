CREATE TABLE IF NOT EXISTS schema_registries (
    id BIGINT NOT NULL AUTO_INCREMENT,
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