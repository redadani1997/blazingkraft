import { Grid } from '@mantine/core';
import { IPaging } from 'common/types/paging';
import { CommonTimeUtils } from 'common/utils/CommonTimeUtils ';
import { useEffect, useMemo, useState } from 'react';
import { IAuditLog, IAuditLogPage } from 'scenes/audit/redux';
import { SearchAuditLogRequest } from 'scenes/audit/redux/actions';
import CommonButton from 'scenes/common/button/CommonButton';
import AuditLogFilters from './filters/AuditLogFilters';
import AuditLogPreview from './preview/AuditLogPreview';
import AuditLogResults from './results/AuditLogResults';
import AuditLogSettings from './settings/AuditLogSettings';

interface AuditLogBodyComponentProps {
    searchAuditLog: (request: SearchAuditLogRequest) => any;
    isSearchAuditLogPending: boolean;
}

export type AuditLogDisplayedField =
    | 'action'
    | 'entityType'
    | 'entity'
    | 'subject'
    | 'timestamp'
    | 'userIdentifier'
    | 'userDisplayedName'
    | 'auditLevel'
    | 'severity'
    | 'settledMessage';

const initialPaging: IPaging = {
    page: 0,
    size: 10,
    totalElements: 0,
};

const AuditLogBodyComponent = ({
    searchAuditLog,
    isSearchAuditLogPending,
}: AuditLogBodyComponentProps) => {
    const [displayedFields, setDisplayedFields] = useState<
        AuditLogDisplayedField[]
    >(['action', 'subject', 'userIdentifier', 'timestamp']);

    const [action, setAction] = useState('');
    const [entityType, setEntityType] = useState('');
    const [entity, setEntity] = useState('');
    const [subject, setSubject] = useState('');
    const [startTimestamp, setStartTimestamp] = useState(null);
    const [endTimestamp, setEndTimestamp] = useState(null);
    const [userIdentifier, setUserIdentifier] = useState('');
    const [userDisplayedName, setUserDisplayedName] = useState('');
    const [auditLevel, setAuditLevel] = useState('');
    const [severity, setSeverity] = useState('');
    const [settledMessage, setSettledMessage] = useState('');
    const [startEnabled, setStartEnabled] = useState(false);
    const [endEnabled, setEndEnabled] = useState(false);
    const [selectedAuditLogId, setSelectedAuditLogId] = useState<number>(null);
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const [selectedAuditLog, setSelectedAuditLog] = useState<IAuditLog>(null);

    const [auditLogs, setAuditLogs] = useState<IAuditLog[]>([]);
    const [auditLogPaging, setAuditLogPaging] = useState<IPaging>({
        ...initialPaging,
    });

    const [timezone, setTimezone] = useState<string>(
        CommonTimeUtils.CURRENT_TIMEZONE,
    );

    const [dateFormat, setDateFormat] = useState<string>(
        CommonTimeUtils.COMMON_DATE_FORMAT,
    );

    const hasMoreElements = useMemo(
        () =>
            auditLogPaging.totalElements >
            (auditLogPaging.page + 1) * auditLogPaging.size,
        [auditLogPaging],
    );

    function applySearch(page): Promise<IAuditLogPage> {
        return searchAuditLog({
            action,
            entityType,
            entity,
            subject,
            startTimestamp,
            endTimestamp,
            userIdentifier,
            userDisplayedName,
            auditLevel,
            severity,
            settledMessage,
            page,
        }).then(res => res.value);
    }

    function doSearch() {
        setAuditLogs([]);
        applySearch(0).then(res => {
            setAuditLogs([...res.data]);
            setAuditLogPaging({
                ...res.paging,
            });
        });
    }

    function fetchNextPage() {
        applySearch(auditLogPaging.page + 1).then(res => {
            setAuditLogs([...auditLogs, ...res.data]);
            setAuditLogPaging({
                ...res.paging,
            });
        });
    }

    function doClear() {
        setAuditLogs([]);
        setAuditLogPaging({
            ...initialPaging,
        });
        setAction('');
        setEntityType('');
        setEntity('');
        setSubject('');
        setStartEnabled(false);
        setEndEnabled(false);
        setUserIdentifier('');
        setUserDisplayedName('');
        setAuditLevel('');
        setSeverity('');
        setSettledMessage('');
        setSelectedAuditLogId(null);
        setSelectedAuditLog(null);
    }

    useEffect(() => {
        applySearch(0).then(res => {
            setAuditLogs([...res.data]);
            setAuditLogPaging({
                ...res.paging,
            });
        });
    }, []);

    useEffect(() => {
        if (selectedAuditLogId === null && auditLogs.length > 0) {
            setSelectedAuditLogId(auditLogs[0].id);
        }
    }, [auditLogs]);

    return (
        <>
            <div className="h-full w-full flex flex-col">
                <Grid className="h-auto">
                    <Grid.Col span={12} md={4} lg={3} xl={2}>
                        <AuditLogSettings
                            setTimeFormat={setDateFormat}
                            setTimezone={setTimezone}
                            timeFormat={dateFormat}
                            timezone={timezone}
                            displayedFields={displayedFields}
                            setDisplayedFields={setDisplayedFields}
                        />
                    </Grid.Col>
                    <Grid.Col span={12} md={4} lg={3} xl={2}>
                        <AuditLogFilters
                            action={action}
                            setAction={setAction}
                            entityType={entityType}
                            setEntityType={setEntityType}
                            entity={entity}
                            setEntity={setEntity}
                            subject={subject}
                            setSubject={setSubject}
                            startTimestamp={startTimestamp}
                            endTimestamp={endTimestamp}
                            setStartTimestamp={setStartTimestamp}
                            setEndTimestamp={setEndTimestamp}
                            userIdentifier={userIdentifier}
                            setUserIdentifier={setUserIdentifier}
                            userDisplayedName={userDisplayedName}
                            setUserDisplayedName={setUserDisplayedName}
                            auditLevel={auditLevel}
                            setAuditLevel={setAuditLevel}
                            severity={severity}
                            setSeverity={setSeverity}
                            settledMessage={settledMessage}
                            setSettledMessage={setSettledMessage}
                            startEnabled={startEnabled}
                            setStartEnabled={setStartEnabled}
                            endEnabled={endEnabled}
                            setEndEnabled={setEndEnabled}
                            timezone={timezone}
                            dateFormat={dateFormat}
                        />
                    </Grid.Col>
                    <Grid.Col span={12} md={4} lg={3} xl={2}>
                        <CommonButton
                            onClick={() => {
                                doSearch();
                            }}
                            loading={isSearchAuditLogPending}
                        >
                            Search
                        </CommonButton>
                    </Grid.Col>
                    <Grid.Col span={12} md={4} lg={3} xl={2}>
                        <CommonButton
                            variant="light"
                            onClick={() => {
                                doClear();
                            }}
                            loading={isSearchAuditLogPending}
                        >
                            Clear
                        </CommonButton>
                    </Grid.Col>
                </Grid>

                <AuditLogResults
                    auditLogs={auditLogs}
                    displayedFields={displayedFields}
                    isLoading={isSearchAuditLogPending}
                    selectedAuditLogId={selectedAuditLogId}
                    setSelectedAuditLogId={setSelectedAuditLogId}
                    setIsPreviewModalOpen={setIsPreviewModalOpen}
                    setSelectedAuditLog={setSelectedAuditLog}
                    fetchNextPage={fetchNextPage}
                    timezone={timezone}
                    timeFormat={dateFormat}
                    hasMoreElements={hasMoreElements}
                />
            </div>
            <AuditLogPreview
                auditLog={selectedAuditLog}
                isModalOpen={isPreviewModalOpen}
                setIsModalOpen={setIsPreviewModalOpen}
                timezone={timezone}
                timeFormat={dateFormat}
            />
        </>
    );
};

export default AuditLogBodyComponent;
