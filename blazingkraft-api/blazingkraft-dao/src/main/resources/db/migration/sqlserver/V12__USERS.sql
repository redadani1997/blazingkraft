IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='blazing_users_seq' and xtype='SO')
    CREATE SEQUENCE blazing_users_seq
        START WITH 2
        INCREMENT BY 1;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='blazing_users' and xtype='U')
    CREATE TABLE blazing_users (
        id BIGINT NOT NULL DEFAULT NEXT VALUE FOR blazing_users_seq,
    
        created_by TEXT,
        updated_by TEXT,
        creation_time BIGINT,
        update_time BIGINT,
    
        email VARCHAR(255) UNIQUE,
        password TEXT,
        first_name TEXT,
        last_name TEXT,
    
        group_id BIGINT,
    
        PRIMARY KEY (id) WITH (IGNORE_DUP_KEY = ON),
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