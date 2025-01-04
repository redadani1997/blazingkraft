CREATE TABLE IF NOT EXISTS audit_log (
    id BIGINT NOT NULL AUTO_INCREMENT,
    action TEXT,
    audit_level TEXT,
    entity TEXT,
    entity_type TEXT,
    settled_message TEXT,
    severity TEXT,
    subject TEXT,
    timestamp BIGINT,
    user_displayed_name TEXT,
    user_identifier TEXT,

    PRIMARY KEY (id)
);