CREATE TABLE IF NOT EXISTS blazing_users (
    id BIGINT NOT NULL AUTO_INCREMENT,

    created_by TEXT,
    updated_by TEXT,
    creation_time BIGINT,
    update_time BIGINT,

    email VARCHAR(255) UNIQUE,
    password TEXT,
    first_name TEXT,
    last_name TEXT,

    group_id BIGINT,

    PRIMARY KEY (id),
    FOREIGN KEY (group_id) REFERENCES blazing_groups(id)
);

ALTER TABLE blazing_users AUTO_INCREMENT = 2;

INSERT IGNORE INTO blazing_users
(
    id,
    created_by,
    updated_by,
    creation_time,
    update_time,
    email,
    password,
    first_name,
    last_name,
    group_id
)
VALUES (
    1,
    'Blazing Schema Initializer',
    'Blazing Schema Initializer',
    0,
    0,
    'admin@blazingkraft.com',
    '$2a$10$bXDc/XqPwUfgpCnzKxDoBu09EDiYNeKPVOQCpN29samDIdgzhX56K',
    'Admin',
    'Admin',
    1
);