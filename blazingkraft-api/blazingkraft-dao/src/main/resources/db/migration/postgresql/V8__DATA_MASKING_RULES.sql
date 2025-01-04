CREATE SEQUENCE IF NOT EXISTS data_masking_rules_seq
    INCREMENT BY 50
    START WITH 1;

CREATE TABLE IF NOT EXISTS data_masking_rules (
    id BIGINT NOT NULL DEFAULT nextval('native'),
    code TEXT UNIQUE,
    name TEXT,

    data_masking_type TEXT,
    result TEXT,

    blazing_rule TEXT,
    rule_type TEXT,

    topic TEXT,
    topic_type TEXT,

    PRIMARY KEY (id)
);