-- Sequence should be named native to cope with the fact that it is mandatory
-- to use =>
--    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
--    @GenericGenerator(name = "native", strategy = "native")
-- in the entity class, which is the only way to be able to use other jdbc databases.
CREATE SEQUENCE IF NOT EXISTS native START 1 INCREMENT 50;

CREATE SEQUENCE IF NOT EXISTS schema_registries_seq
    INCREMENT BY 50
    START WITH 1;

CREATE TABLE IF NOT EXISTS schema_registries (
    id BIGINT NOT NULL DEFAULT nextval('native'),
    code TEXT UNIQUE,
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