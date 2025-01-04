import { KsqlDbEditorPermissions } from 'common/permissions/ksqldb/KsqlDbEditorPermissions';
import { MutableRefObject } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import { IKsqlDbRow } from 'scenes/ksqldb_ecosystem/redux';
import ksqlDbEcosystemActions from 'scenes/ksqldb_ecosystem/redux/actions';
import { KsqlDbEditorType } from '../KsqlDbEditorBodyComponent';
import KsqlDbEditorFilterComponent from './KsqlDbEditorFilterComponent';

interface KsqlDbEditorFilterProps {
    sql: string;
    properties: string;
    editorType: KsqlDbEditorType;
    setEditorType: (editorType: KsqlDbEditorType) => void;
    synchronousSetRows: (rows: IKsqlDbRow[]) => void;
    transitionnedSetRows: (rows: IKsqlDbRow[]) => void;
    isConsuming: boolean;
    setIsConsuming: (isConsuming: boolean) => void;
    rowsInnerState: MutableRefObject<IKsqlDbRow[]>;
}

const KsqlDbEditorFilter = (props: KsqlDbEditorFilterProps) => {
    // Map State To Props
    const {
        isKsqlDbEditorExecuteQueryPending,
        isKsqlDbEditorExecuteStatementPending,
    } = useSelector((store: ReduxStore) => {
        return {
            isKsqlDbEditorExecuteQueryPending:
                store.ksqlDbEcosystemReducer.isKsqlDbEditorExecuteQueryPending,
            isKsqlDbEditorExecuteStatementPending:
                store.ksqlDbEcosystemReducer
                    .isKsqlDbEditorExecuteStatementPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { ksqlDbCode } = useParams();

    const executeQuery = (sql, properties) =>
        dispatch(
            ksqlDbEcosystemActions.executeQuery(ksqlDbCode, sql, properties),
        );

    const clearRows = () => dispatch(ksqlDbEcosystemActions.clearRows());

    const executeStatement = (sql, properties) =>
        dispatch(
            ksqlDbEcosystemActions.executeStatement(
                ksqlDbCode,
                sql,
                properties,
            ),
        );

    // Authorization
    const { isAuthorized: isAuthorizedExecuteStatement } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'KSQLDB',
                permission:
                    KsqlDbEditorPermissions.KSQLDB_EDITOR_PERMISSIONS
                        .KSQLDB_EDITOR_EXECUTE_STATEMENT,
            },
        ],
    });
    const { isAuthorized: isAuthorizedStreamQuery } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'KSQLDB',
                permission:
                    KsqlDbEditorPermissions.KSQLDB_EDITOR_PERMISSIONS
                        .KSQLDB_EDITOR_STREAM_QUERY,
            },
        ],
    });

    return (
        <>
            <KsqlDbEditorFilterComponent
                {...props}
                executeQuery={executeQuery}
                executeStatement={executeStatement}
                isKsqlDbEditorExecuteQueryPending={
                    isKsqlDbEditorExecuteQueryPending
                }
                isKsqlDbEditorExecuteStatementPending={
                    isKsqlDbEditorExecuteStatementPending
                }
                isAuthorizedExecuteStatement={isAuthorizedExecuteStatement}
                isAuthorizedStreamQuery={isAuthorizedStreamQuery}
                clearRows={clearRows}
            />
        </>
    );
};

export default KsqlDbEditorFilter;
