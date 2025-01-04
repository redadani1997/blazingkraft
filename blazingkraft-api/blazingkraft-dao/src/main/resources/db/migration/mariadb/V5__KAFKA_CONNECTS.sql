CREATE TABLE IF NOT EXISTS kafka_connects (
    id BIGINT NOT NULL AUTO_INCREMENT,
    code VARCHAR(255) UNIQUE,
    name TEXT,
    color TEXT,

    url TEXT,

    basic_auth_enabled BOOLEAN,
    basic_auth_username TEXT,
    basic_auth_password TEXT,

    jmx_enabled BOOLEAN,
    jmx_url TEXT,
    jmx_environment TEXT,

    cluster_id BIGINT,

    PRIMARY KEY (id),
    FOREIGN KEY (cluster_id) REFERENCES clusters(id)
);