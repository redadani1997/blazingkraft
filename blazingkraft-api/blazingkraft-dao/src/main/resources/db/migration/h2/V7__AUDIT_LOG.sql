CREATE SEQUENCE IF NOT EXISTS audit_log_seq
    INCREMENT BY 50
    START WITH 1;

CREATE TABLE IF NOT EXISTS audit_log (
    id BIGINT NOT NULL DEFAULT nextval('audit_log_seq'),
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