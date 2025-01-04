CREATE SEQUENCE IF NOT EXISTS kafka_connects_seq
    INCREMENT BY 50
    START WITH 1;

CREATE TABLE IF NOT EXISTS kafka_connects (
    id BIGINT NOT NULL DEFAULT nextval('kafka_connects_seq'),
    code TEXT UNIQUE,
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