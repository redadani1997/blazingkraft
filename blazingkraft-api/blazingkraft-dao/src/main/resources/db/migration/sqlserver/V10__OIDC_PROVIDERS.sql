IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='oidc_providers_seq' and xtype='SO')
    CREATE SEQUENCE oidc_providers_seq
        START WITH 1
        INCREMENT BY 1;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='oidc_providers' and xtype='U')
    CREATE TABLE oidc_providers (
        id BIGINT NOT NULL DEFAULT NEXT VALUE FOR oidc_providers_seq,
        code VARCHAR(255) UNIQUE,
        name TEXT,
    
        client_id TEXT,
        client_secret TEXT,
    
        issuer TEXT,
        provider_type TEXT,
        scopes TEXT,
        pkce_enabled BIT,
    
        PRIMARY KEY (id)
    );