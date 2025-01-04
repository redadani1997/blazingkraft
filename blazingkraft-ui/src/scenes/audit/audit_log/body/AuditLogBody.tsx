import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import auditLogActions, {
    SearchAuditLogRequest,
} from 'scenes/audit/redux/actions';
import AuditLogBodyComponent from './AuditLogBodyComponent';

const AuditLogBody = () => {
    // Map State To Props
    const { isSearchAuditLogPending } = useSelector((store: ReduxStore) => {
        return {
            isSearchAuditLogPending:
                store.auditLogReducer.isSearchAuditLogPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch();
    const searchAuditLog = (request: SearchAuditLogRequest) => {
        return dispatch(auditLogActions.searchAuditLog(request));
    };

    return (
        <AuditLogBodyComponent
            searchAuditLog={searchAuditLog}
            isSearchAuditLogPending={isSearchAuditLogPending}
        />
    );
};

export default AuditLogBody;
