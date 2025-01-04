import { Skeleton, Text } from '@mantine/core';
import { useMemo } from 'react';
import { IAuditLog } from 'scenes/audit/redux';
import CommonCode from 'scenes/common/code/CommonCode';
import CommonInfiniteScroll from 'scenes/common/infinitescroll/CommonInfiniteScroll';
import CommonScrollArea from 'scenes/common/scroll_area/CommonScrollArea';
import { AuditLogDisplayedField } from '../AuditLogBodyComponent';
import AuditLogResultItem from '../result_item/AuditLogResultItem';

interface AuditLogResultsComponentProps {
    setSelectedAuditLogId: (index: number) => void;
    setSelectedAuditLog: (auditLog: IAuditLog) => void;
    selectedAuditLogId: number;
    setIsPreviewModalOpen: (isOpen: boolean) => void;
    timezone: string;
    timeFormat: string;
    displayedFields: AuditLogDisplayedField[];
    fetchNextPage: () => void;
    auditLogs: IAuditLog[];
    isLoading: boolean;
    hasMoreElements: boolean;
}

function AuditLogResultsComponent({
    setSelectedAuditLog,
    setSelectedAuditLogId,
    selectedAuditLogId,
    setIsPreviewModalOpen,
    fetchNextPage,
    timezone,
    timeFormat,
    displayedFields,
    auditLogs,
    isLoading,
    hasMoreElements,
}: AuditLogResultsComponentProps) {
    const actionSelected = displayedFields.includes('action');
    const auditLevelSelected = displayedFields.includes('auditLevel');
    const entitySelected = displayedFields.includes('entity');
    const entityTypeSelected = displayedFields.includes('entityType');
    const settledMessageSelected = displayedFields.includes('settledMessage');
    const severitySelected = displayedFields.includes('severity');
    const subjectSelected = displayedFields.includes('subject');
    const timestampSelected = displayedFields.includes('timestamp');
    const userDisplayedNameSelected =
        displayedFields.includes('userDisplayedName');
    const userIdentifierSelected = displayedFields.includes('userIdentifier');

    const colsNumber = useMemo(() => {
        let cols = 0;
        if (actionSelected) {
            cols += 3;
        }
        if (auditLevelSelected) {
            cols += 1;
        }
        if (entitySelected) {
            cols += 1;
        }
        if (entityTypeSelected) {
            cols += 1;
        }
        if (settledMessageSelected) {
            cols += 3;
        }
        if (severitySelected) {
            cols += 1;
        }
        if (subjectSelected) {
            cols += 3;
        }
        if (timestampSelected) {
            cols += 3;
        }
        if (userDisplayedNameSelected) {
            cols += 2;
        }
        if (userIdentifierSelected) {
            cols += 2;
        }
        return cols;
    }, [
        actionSelected,
        auditLevelSelected,
        entitySelected,
        entityTypeSelected,
        settledMessageSelected,
        severitySelected,
        subjectSelected,
        timestampSelected,
        userDisplayedNameSelected,
        userIdentifierSelected,
    ]);

    return (
        <div
            className="flex flex-col w-full flex-1 pt-2"
            style={{
                minHeight: '20rem',
            }}
        >
            <div
                className="grid gap-2 py-3 w-full items-center relative"
                style={{
                    gridTemplateColumns: `repeat(${colsNumber}, minmax(0, 1fr))`,
                }}
            >
                {actionSelected && (
                    <div className="grid-col-span-3 overflow-hidden">
                        <CommonCode className="text-sm common-elipsis">
                            Action
                        </CommonCode>
                    </div>
                )}
                {auditLevelSelected && (
                    <div className="grid-col-span-1 overflow-hidden">
                        <CommonCode className="text-sm common-elipsis">
                            Audit Level
                        </CommonCode>
                    </div>
                )}
                {entitySelected && (
                    <div className="grid-col-span-1 overflow-hidden">
                        <CommonCode className="text-sm common-elipsis">
                            Entity
                        </CommonCode>
                    </div>
                )}
                {entityTypeSelected && (
                    <div className="grid-col-span-1 overflow-hidden">
                        <CommonCode className="text-sm common-elipsis">
                            Entity Type
                        </CommonCode>
                    </div>
                )}
                {settledMessageSelected && (
                    <div className="grid-col-span-3 overflow-hidden">
                        <CommonCode className="text-sm common-elipsis">
                            Settled Message
                        </CommonCode>
                    </div>
                )}
                {severitySelected && (
                    <span className="grid-col-span-1 overflow-hidden">
                        <CommonCode className="text-sm common-elipsis">
                            Severity
                        </CommonCode>
                    </span>
                )}
                {subjectSelected && (
                    <span className="grid-col-span-3 overflow-hidden">
                        <CommonCode className="text-sm common-elipsis">
                            Subject
                        </CommonCode>
                    </span>
                )}
                {userDisplayedNameSelected && (
                    <span className="grid-col-span-2 overflow-hidden">
                        <CommonCode className="text-sm common-elipsis">
                            User Displayed Name
                        </CommonCode>
                    </span>
                )}
                {userIdentifierSelected && (
                    <span className="grid-col-span-2 overflow-hidden">
                        <CommonCode className="text-sm common-elipsis">
                            User Identifier
                        </CommonCode>
                    </span>
                )}
                {timestampSelected && (
                    <span className="grid-col-span-3 overflow-hidden">
                        <CommonCode className="text-sm common-elipsis">
                            Timestamp
                        </CommonCode>
                    </span>
                )}
            </div>
            {isLoading && auditLogs.length === 0 ? (
                <>
                    <Skeleton height="2.5rem" mt={6} radius="sm" />
                    <Skeleton height="2.5rem" mt={6} radius="sm" />
                    <Skeleton height="2.5rem" mt={6} radius="sm" />
                    <Skeleton height="2.5rem" mt={6} radius="sm" />
                    <Skeleton height="2.5rem" mt={6} radius="sm" />
                </>
            ) : auditLogs.length > 0 ? (
                <CommonScrollArea className="h-full w-full">
                    <CommonInfiniteScroll
                        fetchNextPage={fetchNextPage}
                        hasMore={hasMoreElements}
                        isLoading={isLoading}
                    >
                        {auditLogs.map(auditLog => {
                            return (
                                <AuditLogResultItem
                                    key={auditLog.id}
                                    auditLog={auditLog}
                                    colsNumber={colsNumber}
                                    actionSelected={actionSelected}
                                    auditLevelSelected={auditLevelSelected}
                                    entitySelected={entitySelected}
                                    entityTypeSelected={entityTypeSelected}
                                    settledMessageSelected={
                                        settledMessageSelected
                                    }
                                    severitySelected={severitySelected}
                                    subjectSelected={subjectSelected}
                                    timestampSelected={timestampSelected}
                                    userDisplayedNameSelected={
                                        userDisplayedNameSelected
                                    }
                                    userIdentifierSelected={
                                        userIdentifierSelected
                                    }
                                    selectedAuditLogId={selectedAuditLogId}
                                    setSelectedAuditLog={setSelectedAuditLog}
                                    setSelectedAuditLogId={
                                        setSelectedAuditLogId
                                    }
                                    setIsPreviewModalOpen={
                                        setIsPreviewModalOpen
                                    }
                                    timeFormat={timeFormat}
                                    timezone={timezone}
                                />
                            );
                        })}
                    </CommonInfiniteScroll>
                </CommonScrollArea>
            ) : (
                <Text className="text-gray-500 italic pl-4" size="sm">
                    No available data
                </Text>
            )}
        </div>
    );
}

export default AuditLogResultsComponent;
