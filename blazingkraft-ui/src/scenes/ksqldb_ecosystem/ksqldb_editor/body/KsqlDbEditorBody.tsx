import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import ksqlDbEcosystemActions from 'scenes/ksqldb_ecosystem/redux/actions';
import KsqlDbEditorBodyComponent from './KsqlDbEditorBodyComponent';

const KsqlDbEditorBody = () => {
    // Map State To Props
    const { isKsqlDbEditorExecuteQueryPending, ksqldbEditorResultRows } =
        useSelector((store: ReduxStore) => {
            return {
                isKsqlDbEditorExecuteQueryPending:
                    store.ksqlDbEcosystemReducer
                        .isKsqlDbEditorExecuteQueryPending,
                ksqldbEditorResultRows:
                    store.ksqlDbEcosystemReducer.ksqldbEditorResultRows,
            };
        }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch();

    const clearRows = () => dispatch(ksqlDbEcosystemActions.clearRows());

    // Authorization

    return (
        <>
            <KsqlDbEditorBodyComponent
                ksqldbEditorResultRows={ksqldbEditorResultRows}
                isKsqlDbEditorExecuteQueryPending={
                    isKsqlDbEditorExecuteQueryPending
                }
                clearRows={clearRows}
            />
        </>
    );
};

export default KsqlDbEditorBody;
