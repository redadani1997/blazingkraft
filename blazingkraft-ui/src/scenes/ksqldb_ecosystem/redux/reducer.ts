import { ReduxAction } from 'redux_config/.';
import { KsqlDbEcosystemReducerState } from '.';
import ksqlDbEcosystemTypes from './types';

const initialState: KsqlDbEcosystemReducerState = {
    isCreateKsqlDbConnectorPending: false,
    isDeleteKsqlDbConnectorPending: false,
    isGetAllKsqlDbConnectorsPending: false,
    isGetAllKsqlDbQueriesPending: false,
    isGetAllKsqlDbStreamsPending: false,
    isGetAllKsqlDbTablesPending: false,
    isGetAllKsqlDbTopicsPending: false,
    isKsqlDbEditorExecuteQueryPending: false,
    isKsqlDbEditorExecuteStatementPending: false,
    ksqlDbConnectors: [],
    ksqlDbQueries: [],
    ksqlDbStreams: [],
    ksqlDbTables: [],
    ksqlDbTopics: [],
    ksqldbEditorResultRows: [],
};

function ksqlDbEcosystemReducer(
    state = initialState,
    action: ReduxAction,
): KsqlDbEcosystemReducerState {
    switch (action.type) {
        // GET_ALL_KSQLDB_CONNECTORS
        case ksqlDbEcosystemTypes.GET_ALL_KSQLDB_CONNECTORS_PENDING:
            return {
                ...state,
                isGetAllKsqlDbConnectorsPending: true,
            };
        case ksqlDbEcosystemTypes.GET_ALL_KSQLDB_CONNECTORS_FULFILLED:
            return {
                ...state,
                ksqlDbConnectors: action.payload,
                isGetAllKsqlDbConnectorsPending: false,
            };
        case ksqlDbEcosystemTypes.GET_ALL_KSQLDB_CONNECTORS_REJECTED:
            return {
                ...state,
                ksqlDbConnectors: [],
                isGetAllKsqlDbConnectorsPending: false,
            };

        // GET_ALL_KSQLDB_TOPICS
        case ksqlDbEcosystemTypes.GET_ALL_KSQLDB_TOPICS_PENDING:
            return {
                ...state,
                isGetAllKsqlDbTopicsPending: true,
            };
        case ksqlDbEcosystemTypes.GET_ALL_KSQLDB_TOPICS_FULFILLED:
            return {
                ...state,
                ksqlDbTopics: action.payload,
                isGetAllKsqlDbTopicsPending: false,
            };
        case ksqlDbEcosystemTypes.GET_ALL_KSQLDB_TOPICS_REJECTED:
            return {
                ...state,
                ksqlDbTopics: [],
                isGetAllKsqlDbTopicsPending: false,
            };

        // GET_ALL_KSQLDB_TABLES
        case ksqlDbEcosystemTypes.GET_ALL_KSQLDB_TABLES_PENDING:
            return {
                ...state,
                isGetAllKsqlDbTablesPending: true,
            };
        case ksqlDbEcosystemTypes.GET_ALL_KSQLDB_TABLES_FULFILLED:
            return {
                ...state,
                ksqlDbTables: action.payload,
                isGetAllKsqlDbTablesPending: false,
            };
        case ksqlDbEcosystemTypes.GET_ALL_KSQLDB_TABLES_REJECTED:
            return {
                ...state,
                ksqlDbTables: [],
                isGetAllKsqlDbTablesPending: false,
            };

        // GET_ALL_KSQLDB_STREAMS
        case ksqlDbEcosystemTypes.GET_ALL_KSQLDB_STREAMS_PENDING:
            return {
                ...state,
                isGetAllKsqlDbStreamsPending: true,
            };
        case ksqlDbEcosystemTypes.GET_ALL_KSQLDB_STREAMS_FULFILLED:
            return {
                ...state,
                ksqlDbStreams: action.payload,
                isGetAllKsqlDbStreamsPending: false,
            };
        case ksqlDbEcosystemTypes.GET_ALL_KSQLDB_STREAMS_REJECTED:
            return {
                ...state,
                ksqlDbStreams: [],
                isGetAllKsqlDbStreamsPending: false,
            };

        // GET_ALL_KSQLDB_QUERIES
        case ksqlDbEcosystemTypes.GET_ALL_KSQLDB_QUERIES_PENDING:
            return {
                ...state,
                isGetAllKsqlDbQueriesPending: true,
            };
        case ksqlDbEcosystemTypes.GET_ALL_KSQLDB_QUERIES_FULFILLED:
            return {
                ...state,
                ksqlDbQueries: action.payload,
                isGetAllKsqlDbQueriesPending: false,
            };
        case ksqlDbEcosystemTypes.GET_ALL_KSQLDB_QUERIES_REJECTED:
            return {
                ...state,
                ksqlDbQueries: [],
                isGetAllKsqlDbQueriesPending: false,
            };

        // CREATE_KSQLDB_CONNECTOR
        case ksqlDbEcosystemTypes.CREATE_KSQLDB_CONNECTOR_PENDING:
            return {
                ...state,
                isCreateKsqlDbConnectorPending: true,
            };
        case ksqlDbEcosystemTypes.CREATE_KSQLDB_CONNECTOR_FULFILLED:
            return {
                ...state,
                isCreateKsqlDbConnectorPending: false,
            };
        case ksqlDbEcosystemTypes.CREATE_KSQLDB_CONNECTOR_REJECTED:
            return {
                ...state,
                isCreateKsqlDbConnectorPending: false,
            };

        // DELETE_KSQLDB_CONNECTOR
        case ksqlDbEcosystemTypes.DELETE_KSQLDB_CONNECTOR_PENDING:
            return {
                ...state,
                isDeleteKsqlDbConnectorPending: true,
            };
        case ksqlDbEcosystemTypes.DELETE_KSQLDB_CONNECTOR_FULFILLED:
            return {
                ...state,
                isDeleteKsqlDbConnectorPending: false,
            };
        case ksqlDbEcosystemTypes.DELETE_KSQLDB_CONNECTOR_REJECTED:
            return {
                ...state,
                isDeleteKsqlDbConnectorPending: false,
            };

        // KSQLDB_EDITOR_EXECUTE_QUERY
        case ksqlDbEcosystemTypes.KSQLDB_EDITOR_EXECUTE_QUERY_PENDING:
            return {
                ...state,
                isKsqlDbEditorExecuteQueryPending: true,
            };
        case ksqlDbEcosystemTypes.KSQLDB_EDITOR_EXECUTE_QUERY_FULFILLED:
            return {
                ...state,
                ksqldbEditorResultRows: action.payload,
                isKsqlDbEditorExecuteQueryPending: false,
            };
        case ksqlDbEcosystemTypes.KSQLDB_EDITOR_EXECUTE_QUERY_REJECTED:
            return {
                ...state,
                ksqldbEditorResultRows: [],
                isKsqlDbEditorExecuteQueryPending: false,
            };

        // KSQLDB_EDITOR_EXECUTE_STATEMENT
        case ksqlDbEcosystemTypes.KSQLDB_EDITOR_EXECUTE_STATEMENT_PENDING:
            return {
                ...state,
                isKsqlDbEditorExecuteStatementPending: true,
            };
        case ksqlDbEcosystemTypes.KSQLDB_EDITOR_EXECUTE_STATEMENT_FULFILLED:
            return {
                ...state,
                isKsqlDbEditorExecuteStatementPending: false,
            };
        case ksqlDbEcosystemTypes.KSQLDB_EDITOR_EXECUTE_STATEMENT_REJECTED:
            return {
                ...state,
                isKsqlDbEditorExecuteStatementPending: false,
            };

        // KSQLDB_EDITOR_CLEAR_ROWS
        case ksqlDbEcosystemTypes.KSQLDB_EDITOR_CLEAR_ROWS:
            return {
                ...state,
                ksqldbEditorResultRows: [],
            };

        default:
            return state;
    }
}

export default ksqlDbEcosystemReducer;
