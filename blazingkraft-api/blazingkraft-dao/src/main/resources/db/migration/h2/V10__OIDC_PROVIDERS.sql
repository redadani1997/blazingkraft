CREATE SEQUENCE IF NOT EXISTS oidc_providers_seq
    INCREMENT BY 50
    START WITH 1;

CREATE TABLE IF NOT EXISTS oidc_providers (
    id BIGINT NOT NULL DEFAULT nextval('oidc_providers_seq'),
    code TEXT UNIQUE,
    name TEXT,

    client_id TEXT,
    client_secret TEXT,

    issuer TEXT,
    provider_type TEXT,
    scopes TEXT,
    pkce_enabled BOOLEAN,

    PRIMARY KEY (id)
);