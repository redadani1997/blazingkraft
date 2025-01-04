CREATE SEQUENCE IF NOT EXISTS blazing_users_seq
    INCREMENT BY 50
    START WITH 1;

CREATE TABLE IF NOT EXISTS blazing_users (
    id BIGINT NOT NULL DEFAULT nextval('blazing_users_seq'),

    created_by TEXT,
    updated_by TEXT,
    creation_time BIGINT,
    update_time BIGINT,

    email TEXT UNIQUE,
    password TEXT,
    first_name TEXT,
    last_name TEXT,

    group_id BIGINT,

    PRIMARY KEY (id),
    FOREIGN KEY (group_id) REFERENCES blazing_groups(id)
);

INSERT INTO blazing_users
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
    0,
    'Blazing Schema Initializer',
    'Blazing Schema Initializer',
    0,
    0,
    'admin@blazingkraft.com',
    '$2a$10$bXDc/XqPwUfgpCnzKxDoBu09EDiYNeKPVOQCpN29samDIdgzhX56K',
    'Admin',
    'Admin',
    0
);