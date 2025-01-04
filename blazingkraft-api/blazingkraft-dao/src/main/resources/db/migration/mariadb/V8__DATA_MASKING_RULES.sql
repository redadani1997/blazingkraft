CREATE TABLE IF NOT EXISTS data_masking_rules (
    id BIGINT NOT NULL AUTO_INCREMENT,
    code VARCHAR(255) UNIQUE,
    name TEXT,

    data_masking_type TEXT,
    result TEXT,

    blazing_rule TEXT,
    rule_type TEXT,

    topic TEXT,
    topic_type TEXT,

    PRIMARY KEY (id)
);