CREATE TABLE IF NOT EXISTS oidc_providers (
    id BIGINT NOT NULL AUTO_INCREMENT,
    code VARCHAR(255) UNIQUE,
    name TEXT,

    client_id TEXT,
    client_secret TEXT,

    issuer TEXT,
    provider_type TEXT,
    scopes TEXT,
    pkce_enabled BOOLEAN,

    PRIMARY KEY (id)
);