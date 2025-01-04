CREATE TABLE IF NOT EXISTS ksqldbs (
    id BIGINT NOT NULL AUTO_INCREMENT,
    code VARCHAR(255) UNIQUE,
    name TEXT,
    color TEXT,

    host TEXT,
    execute_query_max_result_rows INT,
    port INT,
    use_alpn BOOLEAN,
    use_tls BOOLEAN,
    verify_host BOOLEAN,

    basic_auth_enabled BOOLEAN,
    basic_auth_username TEXT,
    basic_auth_password TEXT,

    key_store_enabled BOOLEAN,
    key_store TEXT,
    key_store_password TEXT,

    trust_store_enabled BOOLEAN,
    trust_store TEXT,
    trust_store_password TEXT,

    jmx_enabled BOOLEAN,
    jmx_url TEXT,
    jmx_environment TEXT,

    PRIMARY KEY (id)
);