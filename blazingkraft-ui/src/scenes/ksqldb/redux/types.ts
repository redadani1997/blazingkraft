const ksqlDbTypes = {
    GET_ALL_KSQLDBS: 'GET_ALL_KSQLDBS',
    GET_ALL_KSQLDBS_PENDING: 'GET_ALL_KSQLDBS_PENDING',
    GET_ALL_KSQLDBS_FULFILLED: 'GET_ALL_KSQLDBS_FULFILLED',
    GET_ALL_KSQLDBS_REJECTED: 'GET_ALL_KSQLDBS_REJECTED',

    CREATE_KSQLDB: 'CREATE_KSQLDB',
    CREATE_KSQLDB_PENDING: 'CREATE_KSQLDB_PENDING',
    CREATE_KSQLDB_FULFILLED: 'CREATE_KSQLDB_FULFILLED',
    CREATE_KSQLDB_REJECTED: 'CREATE_KSQLDB_REJECTED',

    TEST_KSQLDB_CLIENT_CONNECTIVITY: 'TEST_KSQLDB_CLIENT_CONNECTIVITY',
    TEST_KSQLDB_CLIENT_CONNECTIVITY_PENDING:
        'TEST_KSQLDB_CLIENT_CONNECTIVITY_PENDING',
    TEST_KSQLDB_CLIENT_CONNECTIVITY_FULFILLED:
        'TEST_KSQLDB_CLIENT_CONNECTIVITY_FULFILLED',
    TEST_KSQLDB_CLIENT_CONNECTIVITY_REJECTED:
        'TEST_KSQLDB_CLIENT_CONNECTIVITY_REJECTED',

    TEST_KSQLDB_JMX_CONNECTIVITY: 'TEST_KSQLDB_JMX_CONNECTIVITY',
    TEST_KSQLDB_JMX_CONNECTIVITY_PENDING:
        'TEST_KSQLDB_JMX_CONNECTIVITY_PENDING',
    TEST_KSQLDB_JMX_CONNECTIVITY_FULFILLED:
        'TEST_KSQLDB_JMX_CONNECTIVITY_FULFILLED',
    TEST_KSQLDB_JMX_CONNECTIVITY_REJECTED:
        'TEST_KSQLDB_JMX_CONNECTIVITY_REJECTED',

    GET_KSQLDB_META: 'GET_KSQLDB_META',
    GET_KSQLDB_META_PENDING: 'GET_KSQLDB_META_PENDING',
    GET_KSQLDB_META_FULFILLED: 'GET_KSQLDB_META_FULFILLED',
    GET_KSQLDB_META_REJECTED: 'GET_KSQLDB_META_REJECTED',

    GET_KSQLDB_DETAILS: 'GET_KSQLDB_DETAILS',
    GET_KSQLDB_DETAILS_PENDING: 'GET_KSQLDB_DETAILS_PENDING',
    GET_KSQLDB_DETAILS_FULFILLED: 'GET_KSQLDB_DETAILS_FULFILLED',
    GET_KSQLDB_DETAILS_REJECTED: 'GET_KSQLDB_DETAILS_REJECTED',

    MONITOR_KSQLDB: 'MONITOR_KSQLDB',
    MONITOR_KSQLDB_PENDING: 'MONITOR_KSQLDB_PENDING',
    MONITOR_KSQLDB_FULFILLED: 'MONITOR_KSQLDB_FULFILLED',
    MONITOR_KSQLDB_REJECTED: 'MONITOR_KSQLDB_REJECTED',

    GET_KSQLDB_DESCRIPTION: 'GET_KSQLDB_DESCRIPTION',
    GET_KSQLDB_DESCRIPTION_PENDING: 'GET_KSQLDB_DESCRIPTION_PENDING',
    GET_KSQLDB_DESCRIPTION_FULFILLED: 'GET_KSQLDB_DESCRIPTION_FULFILLED',
    GET_KSQLDB_DESCRIPTION_REJECTED: 'GET_KSQLDB_DESCRIPTION_REJECTED',

    DELETE_KSQLDB: 'DELETE_KSQLDB',
    DELETE_KSQLDB_PENDING: 'DELETE_KSQLDB_PENDING',
    DELETE_KSQLDB_FULFILLED: 'DELETE_KSQLDB_FULFILLED',
    DELETE_KSQLDB_REJECTED: 'DELETE_KSQLDB_REJECTED',

    EDIT_KSQLDB: 'EDIT_KSQLDB',
    EDIT_KSQLDB_PENDING: 'EDIT_KSQLDB_PENDING',
    EDIT_KSQLDB_FULFILLED: 'EDIT_KSQLDB_FULFILLED',
    EDIT_KSQLDB_REJECTED: 'EDIT_KSQLDB_REJECTED',
};

export default ksqlDbTypes;
