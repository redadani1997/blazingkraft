import { IPaging } from 'common/types/paging';

export interface IAuditLog {
    id: number;
    action: string;
    entityType: string;
    entity: string;
    subject: string;
    timestamp: number;
    userIdentifier: string;
    userDisplayedName: string;
    auditLevel: string;
    severity: string;
    settledMessage: string;
}

export interface IAuditLogPage {
    data: IAuditLog[];
    paging: IPaging;
}

export type AuditLogReducerState = {
    auditLog: IAuditLogPage;
    isSearchAuditLogPending: boolean;
};
