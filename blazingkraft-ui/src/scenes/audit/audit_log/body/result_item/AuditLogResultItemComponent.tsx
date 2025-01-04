import { Card, Text, useMantineColorScheme } from '@mantine/core';
import { AuditUtils } from 'common/utils/AuditUtils';
import { CommonTimeUtils } from 'common/utils/CommonTimeUtils ';
import React, { useCallback, useMemo } from 'react';
import { IAuditLog } from 'scenes/audit/redux';

interface AuditLogResultItemComponentProps {
    auditLog: IAuditLog;
    setSelectedAuditLogId: (index: number) => void;
    setSelectedAuditLog: (auditLog: IAuditLog) => void;
    selectedAuditLogId: number;
    setIsPreviewModalOpen: (isOpen: boolean) => void;
    timezone: string;
    timeFormat: string;
    actionSelected: boolean;
    auditLevelSelected: boolean;
    entitySelected: boolean;
    entityTypeSelected: boolean;
    settledMessageSelected: boolean;
    severitySelected: boolean;
    subjectSelected: boolean;
    timestampSelected: boolean;
    userDisplayedNameSelected: boolean;
    userIdentifierSelected: boolean;
    colsNumber: number;
}

function AuditLogResultItemComponent({
    auditLog,
    setSelectedAuditLog,
    setSelectedAuditLogId,
    selectedAuditLogId,
    setIsPreviewModalOpen,
    timezone,
    timeFormat,
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
    colsNumber,
}: AuditLogResultItemComponentProps) {
    const memoizedAuditLog = useMemo(() => auditLog, [auditLog]);
    const isSelected = selectedAuditLogId === auditLog.id;
    const memoizedSetSelectedAuditLog = useCallback(
        auditLog => setSelectedAuditLog(auditLog),
        [],
    );
    const memoizedSetSelectedAuditLogIndex = useCallback(
        index => setSelectedAuditLogId(index),
        [setSelectedAuditLogId],
    );
    const memoizedSetIsPreviewModalOpen = useCallback(
        bool => setIsPreviewModalOpen(bool),
        [setIsPreviewModalOpen],
    );
    return (
        <AuditLogResultItemComponentInnerMemo
            auditLog={memoizedAuditLog}
            setSelectedAuditLog={memoizedSetSelectedAuditLog}
            setSelectedAuditLogId={memoizedSetSelectedAuditLogIndex}
            isSelected={isSelected}
            setIsPreviewModalOpen={memoizedSetIsPreviewModalOpen}
            timezone={timezone}
            timeFormat={timeFormat}
            actionSelected={actionSelected}
            auditLevelSelected={auditLevelSelected}
            entitySelected={entitySelected}
            entityTypeSelected={entityTypeSelected}
            settledMessageSelected={settledMessageSelected}
            severitySelected={severitySelected}
            subjectSelected={subjectSelected}
            timestampSelected={timestampSelected}
            userDisplayedNameSelected={userDisplayedNameSelected}
            userIdentifierSelected={userIdentifierSelected}
            colsNumber={colsNumber}
        />
    );
}

function renderUnavailable() {
    return <Text className="italic ">---unavailable---</Text>;
}

function AuditLogResultItemComponentInner({
    auditLog,
    setSelectedAuditLog,
    setSelectedAuditLogId,
    isSelected,
    setIsPreviewModalOpen,
    timezone,
    timeFormat,
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
    colsNumber,
}: {
    auditLog: IAuditLog;
    [x: string]: any;
}) {
    const { colorScheme } = useMantineColorScheme();
    const textColor = colorScheme === 'dark' ? 'darkcyan' : 'lightgreen';

    return (
        // <CommonTransition key={auditLog.id}>
        <Card
            className="cursor-pointer py-3 my-1"
            onClick={() => {
                setSelectedAuditLog(auditLog);
                setSelectedAuditLogId(auditLog.id);
                setIsPreviewModalOpen(true);
            }}
            style={{
                background: !isSelected ? undefined : textColor,
            }}
        >
            <div
                className="grid gap-2 w-full items-center"
                style={{
                    gridTemplateColumns: `repeat(${colsNumber}, minmax(0, 1fr))`,
                }}
            >
                {actionSelected && (
                    <span className="grid-col-span-3">
                        <Text
                            size="sm"
                            className="italic font-semibold common-elipsis"
                        >
                            {AuditUtils.getAuditActionLabelByAction(
                                auditLog.action,
                            )}
                        </Text>
                    </span>
                )}
                {auditLevelSelected && (
                    <span className="grid-col-span-1">
                        <Text
                            size="sm"
                            className="italic font-semibold common-elipsis w-full"
                        >
                            {AuditUtils.getAuditLevelLabelByAuditLevel(
                                auditLog.auditLevel,
                            )}
                        </Text>
                    </span>
                )}
                {entitySelected && (
                    <span className="grid-col-span-1">
                        <Text
                            size="sm"
                            className="italic font-semibold common-elipsis"
                        >
                            {auditLog.entity || renderUnavailable()}
                        </Text>
                    </span>
                )}
                {entityTypeSelected && (
                    <span className="grid-col-span-1">
                        <Text
                            size="sm"
                            className="italic font-semibold common-elipsis"
                        >
                            {AuditUtils.getEntityTypeLabelByEntityType(
                                auditLog.entityType,
                            ) || renderUnavailable()}
                        </Text>
                    </span>
                )}
                {settledMessageSelected && (
                    <span className="grid-col-span-3">
                        <Text
                            size="sm"
                            className="italic font-semibold common-elipsis"
                        >
                            {auditLog.settledMessage || renderUnavailable()}
                        </Text>
                    </span>
                )}
                {severitySelected && (
                    <span className="grid-col-span-1">
                        <Text
                            size="sm"
                            className="italic font-semibold common-elipsis"
                        >
                            {AuditUtils.getSeverityLabelBySeverity(
                                auditLog.severity,
                            )}
                        </Text>
                    </span>
                )}
                {subjectSelected && (
                    <span className="grid-col-span-3">
                        <Text
                            size="sm"
                            className="italic font-semibold common-elipsis"
                        >
                            {auditLog.subject || renderUnavailable()}
                        </Text>
                    </span>
                )}
                {userDisplayedNameSelected && (
                    <span className="grid-col-span-2">
                        <Text
                            size="sm"
                            className="italic font-semibold common-elipsis"
                        >
                            {auditLog.userDisplayedName}
                        </Text>
                    </span>
                )}
                {userIdentifierSelected && (
                    <span className="grid-col-span-2">
                        <Text
                            size="sm"
                            className="italic font-semibold common-elipsis"
                        >
                            {auditLog.userIdentifier}
                        </Text>
                    </span>
                )}
                {timestampSelected && (
                    <span className="grid-col-span-3">
                        <Text
                            size="sm"
                            className="italic pl-1 font-semibold break-words w-full"
                            component="span"
                        >
                            {CommonTimeUtils.timestampToFormattedDate(
                                auditLog.timestamp,
                                timezone,
                                timeFormat,
                            )}
                        </Text>
                    </span>
                )}
            </div>
        </Card>
        // </CommonTransition>
    );
}
const AuditLogResultItemComponentInnerMemo = React.memo(
    AuditLogResultItemComponentInner,
);

export default AuditLogResultItemComponent;
