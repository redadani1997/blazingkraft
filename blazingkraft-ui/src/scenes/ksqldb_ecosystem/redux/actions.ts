import {
    notifyLoading,
    notifyUpdateToError,
    notifyUpdateToSuccess,
} from 'common/notifications/Notifications';
import { CommonUtils } from 'common/utils/CommonUtils';
import { DELETE, GET, POST } from 'rest/RestCalls';
import { IKsqlDbRow } from '.';
import ksqlDbEcosystemTypes from './types';

function createKsqlDbConnector(
    ksqlDbCode,
    connectorName,
    isSource,
    properties,
) {
    return {
        type: ksqlDbEcosystemTypes.CREATE_KSQLDB_CONNECTOR,
        payload: POST(
            `/ksqldbs/connectors`,
            {
                connectorName,
                isSource,
                properties: CommonUtils.stringToObject(properties),
            },
            {
                headers: { ksqlDbCode },
            },
        ),
        meta: {
            ksqlDbCode,
            connectorName,
            context: 'KsqlDb Connector Creation',
        },
    };
}

function deleteKsqlDbConnector(ksqlDbCode, connectorName) {
    return {
        type: ksqlDbEcosystemTypes.DELETE_KSQLDB_CONNECTOR,
        payload: DELETE(`/ksqldbs/connectors/${connectorName}`, {
            headers: { ksqlDbCode },
        }),
        meta: {
            ksqlDbCode,
            connectorName,
            context: 'KsqlDb Connector Deletion',
        },
    };
}

function getAllKsqlDbConnectors(ksqlDbCode) {
    return {
        type: ksqlDbEcosystemTypes.GET_ALL_KSQLDB_CONNECTORS,
        payload: GET(`/ksqldbs/connectors`, {
            headers: { ksqlDbCode },
        }),
        meta: { context: 'KsqlDb Connectors' },
    };
}

function getAllKsqlDbTables(ksqlDbCode) {
    return {
        type: ksqlDbEcosystemTypes.GET_ALL_KSQLDB_TABLES,
        payload: GET(`/ksqldbs/tables`, {
            headers: { ksqlDbCode },
        }),
        meta: { context: 'KsqlDb Tables' },
    };
}

function getAllKsqlDbStreams(ksqlDbCode) {
    return {
        type: ksqlDbEcosystemTypes.GET_ALL_KSQLDB_STREAMS,
        payload: GET(`/ksqldbs/streams`, {
            headers: { ksqlDbCode },
        }),
        meta: { context: 'KsqlDb Streams' },
    };
}

function getAllKsqlDbQueries(ksqlDbCode) {
    return {
        type: ksqlDbEcosystemTypes.GET_ALL_KSQLDB_QUERIES,
        payload: GET(`/ksqldbs/queries`, {
            headers: { ksqlDbCode },
        }),
        meta: { context: 'KsqlDb Queries' },
    };
}

function getAllKsqlDbTopics(ksqlDbCode) {
    return {
        type: ksqlDbEcosystemTypes.GET_ALL_KSQLDB_TOPICS,
        payload: GET(`/ksqldbs/topics`, {
            headers: { ksqlDbCode },
        }),
        meta: { context: 'KsqlDb Topics' },
    };
}

function executeQuery(ksqlDbCode, sql, properties) {
    const loadingId = notifyLoading({
        title: 'KsqlDb Editor',
        message: 'Query Execution in progress...',
    });
    return {
        type: ksqlDbEcosystemTypes.KSQLDB_EDITOR_EXECUTE_QUERY,
        payload: POST(
            `/ksqldbs/editor/query`,
            { sql, properties: CommonUtils.stringToObject(properties) },
            { headers: { ksqlDbCode } },
        )
            .then((res: IKsqlDbRow[]) => {
                notifyUpdateToSuccess({
                    id: loadingId,
                    title: 'KsqlDb Editor',
                    message: `Successfully retrieved '${res.length}' rows`,
                });
                return res;
            })
            .catch(err => {
                notifyUpdateToError({
                    id: loadingId,
                    title: 'KsqlDb Editor',
                    message: CommonUtils.getRestErrorMessage(err),
                });
                throw err;
            }),
        meta: { context: 'KsqlDb Editor', ignoreNotification: true },
    };
}

function executeStatement(ksqlDbCode, sql, properties) {
    const loadingId = notifyLoading({
        title: 'KsqlDb Editor',
        message: 'Statement Execution in progress...',
    });
    return {
        type: ksqlDbEcosystemTypes.KSQLDB_EDITOR_EXECUTE_STATEMENT,
        payload: POST(
            `/ksqldbs/editor/statement`,
            { sql, properties: CommonUtils.stringToObject(properties) },
            { headers: { ksqlDbCode } },
        )
            .then(res => {
                notifyUpdateToSuccess({
                    id: loadingId,
                    title: 'KsqlDb Editor',
                    message: `Successfully exectuted statement`,
                });
                return res;
            })
            .catch(err => {
                notifyUpdateToError({
                    id: loadingId,
                    title: 'KsqlDb Editor',
                    message: CommonUtils.getRestErrorMessage(err),
                });
                throw err;
            }),
        meta: { context: 'KsqlDb Editor', ignoreNotification: true },
    };
}

function clearRows() {
    return {
        type: ksqlDbEcosystemTypes.KSQLDB_EDITOR_CLEAR_ROWS,
        meta: { context: 'KsqlDb Editor' },
    };
}

const ksqlDbEcosystemActions = {
    createKsqlDbConnector,
    deleteKsqlDbConnector,
    getAllKsqlDbConnectors,
    getAllKsqlDbTables,
    getAllKsqlDbStreams,
    getAllKsqlDbQueries,
    getAllKsqlDbTopics,
    executeQuery,
    executeStatement,
    clearRows,
};

export default ksqlDbEcosystemActions;
