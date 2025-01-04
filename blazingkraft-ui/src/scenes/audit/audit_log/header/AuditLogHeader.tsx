import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import AuditLogHeaderComponent from './AuditLogHeaderComponent';

const AuditLogHeader = () => {
    // Map State To Props
    const { auditLogTotalElements } = useSelector((store: ReduxStore) => {
        return {
            auditLogTotalElements:
                store.auditLogReducer.auditLog.paging.totalElements,
        };
    }, shallowEqual);
    // Map Dispatch To Props

    return (
        <AuditLogHeaderComponent
            auditLogTotalElements={auditLogTotalElements}
        />
    );
};

export default AuditLogHeader;
