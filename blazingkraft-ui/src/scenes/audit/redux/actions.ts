import { POST } from 'rest/RestCalls';
import auditLogTypes from './types';

export interface SearchAuditLogRequest {
    action: string;
    entityType: string;
    entity: string;
    subject: string;
    startTimestamp: number;
    endTimestamp: number;
    userIdentifier: string;
    userDisplayedName: string;
    auditLevel: string;
    severity: string;
    settledMessage: string;
    page: number;
}

function searchAuditLog(request: SearchAuditLogRequest) {
    return {
        type: auditLogTypes.SEARCH_AUDIT_LOG,
        payload: POST(`/audit/log`, request, {
            params: { page: request.page, size: 100 },
        }),
        meta: { context: 'Audit Log' },
    };
}

function clearAuditLog() {
    return {
        type: auditLogTypes.CLEAR_AUDIT_LOG,
    };
}

const auditLogActions = { searchAuditLog, clearAuditLog };

export default auditLogActions;
