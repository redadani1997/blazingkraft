import {
    notifyLoading,
    notifyUpdateToError,
    notifyUpdateToSuccess,
} from 'common/notifications/Notifications';
import { CommonUtils } from 'common/utils/CommonUtils';
import { DELETE, GET, POST, PUT } from 'rest/RestCalls';
import ksqlDbTypes from './types';

function testKsqlDbClientConnectivity(
    host,
    port,
    basicAuthEnabled,
    basicAuthUsername,
    basicAuthPassword,
    keyStoreEnabled,
    keyStore,
    keyStorePassword,
    trustStoreEnabled,
    trustStore,
    trustStorePassword,
    useTls,
    verifyHost,
    useAlpn,
    executeQueryMaxResultRows,
) {
    const loadingId = notifyLoading({
        title: 'KsqlDb Client Connectivity',
        message: 'Testing KsqlDb connectivity in progress...',
    });
    return {
        type: ksqlDbTypes.TEST_KSQLDB_CLIENT_CONNECTIVITY,
        payload: POST('/ksqldbs/servers/connectivity/client', {
            host,
            port,
            basicAuthEnabled,
            basicAuthUsername,
            basicAuthPassword,
            keyStoreEnabled,
            keyStore,
            keyStorePassword,
            trustStoreEnabled,
            trustStore,
            trustStorePassword,
            useTls,
            verifyHost,
            useAlpn,
            executeQueryMaxResultRows,
        })
            .then(() => {
                notifyUpdateToSuccess({
                    id: loadingId,
                    title: 'KsqlDb Client Connectivity',
                    message: 'KsqlDb Connection successful',
                });
            })
            .catch(err => {
                notifyUpdateToError({
                    id: loadingId,
                    title: 'KsqlDb Client Connectivity',
                    message: CommonUtils.getRestErrorMessage(err),
                });
                throw err;
            }),
        meta: {
            context: 'KsqlDb Client Connectivity',
            ignoreNotification: true,
        },
    };
}

function testKsqlDbJmxConnectivity(jmxUrl: string, jmxEnvironment: string) {
    const loadingId = notifyLoading({
        title: 'KsqlDb JMX Connectivity',
        message: 'Testing cluster jmx connectivity in progress...',
    });
    return {
        type: ksqlDbTypes.TEST_KSQLDB_JMX_CONNECTIVITY,
        payload: POST('/admin/clusters/connectivity/jmx', {
            jmxUrl,
            jmxEnvironment: CommonUtils.stringToObject(jmxEnvironment),
        })
            .then(() => {
                notifyUpdateToSuccess({
                    id: loadingId,
                    title: 'KsqlDb JMX Connectivity',
                    message: 'KsqlDb JMX Connection successful',
                });
            })
            .catch(err => {
                notifyUpdateToError({
                    id: loadingId,
                    title: 'KsqlDb JMX Connectivity',
                    message: CommonUtils.getRestErrorMessage(err),
                });
                throw err;
            }),
        meta: {
            context: 'KsqlDb JMX Connectivity',
            ignoreNotification: true,
        },
    };
}

function createKsqlDb(
    name,
    code,
    color,
    host,
    port,
    basicAuthEnabled,
    basicAuthUsername,
    basicAuthPassword,
    keyStoreEnabled,
    keyStore,
    keyStorePassword,
    trustStoreEnabled,
    trustStore,
    trustStorePassword,
    useTls,
    verifyHost,
    useAlpn,
    executeQueryMaxResultRows,
    jmxEnabled,
    jmxUrl,
    jmxEnvironment: string,
) {
    return {
        type: ksqlDbTypes.CREATE_KSQLDB,
        payload: POST('/ksqldbs/servers', {
            name,
            code,
            color,
            host,
            port,
            basicAuthEnabled,
            basicAuthUsername,
            basicAuthPassword,
            keyStoreEnabled,
            keyStore,
            keyStorePassword,
            trustStoreEnabled,
            trustStore,
            trustStorePassword,
            useTls,
            verifyHost,
            useAlpn,
            executeQueryMaxResultRows,
            jmxEnabled,
            jmxUrl,
            jmxEnvironment: CommonUtils.stringToObject(jmxEnvironment),
        }),
        meta: { ksqlDbCode: code, context: 'KsqlDb Creation' },
    };
}

function editKsqlDb(
    code,
    color,
    host,
    port,
    basicAuthEnabled,
    basicAuthUsername,
    basicAuthPassword,
    keyStoreEnabled,
    keyStore,
    keyStorePassword,
    trustStoreEnabled,
    trustStore,
    trustStorePassword,
    useTls,
    verifyHost,
    useAlpn,
    executeQueryMaxResultRows,
    jmxEnabled,
    jmxUrl,
    jmxEnvironment: string,
) {
    return {
        type: ksqlDbTypes.EDIT_KSQLDB,
        payload: PUT(`/ksqldbs/servers/${code}/edit`, {
            color,
            host,
            port,
            basicAuthEnabled,
            basicAuthUsername,
            basicAuthPassword,
            keyStoreEnabled,
            keyStore,
            keyStorePassword,
            trustStoreEnabled,
            trustStore,
            trustStorePassword,
            useTls,
            verifyHost,
            useAlpn,
            executeQueryMaxResultRows,
            jmxEnabled,
            jmxUrl,
            jmxEnvironment: CommonUtils.stringToObject(jmxEnvironment),
        }),
        meta: { ksqlDbCode: code, context: 'KsqlDb Edit' },
    };
}

function deleteKsqlDb(code) {
    return {
        type: ksqlDbTypes.DELETE_KSQLDB,
        payload: DELETE(`/ksqldbs/servers/${code}/delete`),
        meta: { ksqlDbCode: code, context: 'KsqlDb Deletion' },
    };
}

function getKsqlDbDetails(code) {
    return {
        type: ksqlDbTypes.GET_KSQLDB_DETAILS,
        payload: GET(`/ksqldbs/servers/${code}/details`),
        meta: { ksqlDbCode: code, context: 'KsqlDb' },
    };
}

function monitorKsqlDbServer(code) {
    return {
        type: ksqlDbTypes.MONITOR_KSQLDB,
        payload: GET(`/ksqldbs/servers/monitoring`, {
            headers: { ksqlDbCode: code },
        }),
        meta: { ksqlDbCode: code, context: 'KsqlDb Monitoring' },
    };
}

function getKsqlDbDescription(code) {
    return {
        type: ksqlDbTypes.GET_KSQLDB_DESCRIPTION,
        payload: GET(`/ksqldbs/servers/description`, {
            headers: { ksqlDbCode: code },
        }),
        meta: {
            ksqlDbCode: code,
            context: 'KsqlDb Description',
            ignoreNotification: true,
            concurrencyIdentifier: code,
        },
    };
}

function getAllKsqlDbs() {
    return {
        type: ksqlDbTypes.GET_ALL_KSQLDBS,
        payload: GET('/ksqldbs/servers'),
        meta: { context: 'KsqlDb' },
    };
}

function getKsqlDbMeta(ksqlDbCode) {
    return {
        type: ksqlDbTypes.GET_KSQLDB_META,
        payload: GET(`/ksqldbs/servers/meta`, {
            headers: { ksqlDbCode },
        }),
        meta: { context: 'KsqlDb' },
    };
}

const ksqlDbActions = {
    testKsqlDbClientConnectivity,
    testKsqlDbJmxConnectivity,
    createKsqlDb,
    editKsqlDb,
    getAllKsqlDbs,
    getKsqlDbMeta,
    deleteKsqlDb,
    getKsqlDbDetails,
    getKsqlDbDescription,
    monitorKsqlDbServer,
};

export default ksqlDbActions;
