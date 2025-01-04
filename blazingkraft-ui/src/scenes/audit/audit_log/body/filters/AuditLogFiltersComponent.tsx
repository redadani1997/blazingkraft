import { Checkbox, Grid, SimpleGrid, Text } from '@mantine/core';
import { AuditUtils } from 'common/utils/AuditUtils';
import { CommonTimeUtils } from 'common/utils/CommonTimeUtils ';
import { useEffect, useMemo, useState } from 'react';
import CommonButton from 'scenes/common/button/CommonButton';
import CommonCalendar from 'scenes/common/date/CommonCalendar';
import CommonTimePicker from 'scenes/common/date/CommonTimePicker';
import CommonTextInput from 'scenes/common/input/CommonTextInput';
import CommonModal from 'scenes/common/modal/CommonModal';
import CommonSelect from 'scenes/common/select/CommonSelect';
import CommonTabs from 'scenes/common/tabs/CommonTabs';
import CommonTooltip from 'scenes/common/tooltip/CommonTooltip';

interface AuditLogFiltersComponentProps {
    action: string;
    setAction: (value: string) => void;
    entityType: string;
    setEntityType: (value: string) => void;
    entity: string;
    setEntity: (value: string) => void;
    subject: string;
    setSubject: (value: string) => void;
    startTimestamp: number;
    setStartTimestamp: (value: number) => void;
    endTimestamp: number;
    setEndTimestamp: (value: number) => void;
    userIdentifier: string;
    setUserIdentifier: (value: string) => void;
    userDisplayedName: string;
    setUserDisplayedName: (value: string) => void;
    auditLevel: string;
    setAuditLevel: (value: string) => void;
    severity: string;
    setSeverity: (value: string) => void;
    settledMessage: string;
    setSettledMessage: (value: string) => void;
    startEnabled: boolean;
    setStartEnabled: (value: boolean) => void;
    endEnabled: boolean;
    setEndEnabled: (value: boolean) => void;
    timezone: string;
    dateFormat: string;
}

const AuditLogFiltersComponent = ({
    action,
    setAction,
    entityType,
    setEntityType,
    entity,
    setEntity,
    auditLevel,
    setAuditLevel,
    severity,
    setSeverity,
    subject,
    setSubject,
    endTimestamp,
    setEndTimestamp,
    setSettledMessage,
    startTimestamp,
    setStartTimestamp,
    setUserDisplayedName,
    setUserIdentifier,
    settledMessage,
    userDisplayedName,
    userIdentifier,
    endEnabled,
    setEndEnabled,
    setStartEnabled,
    startEnabled,
    timezone,
    dateFormat,
}: AuditLogFiltersComponentProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState('text');
    const [startDate, setStartDate] = useState<Date>(
        CommonTimeUtils.nowAsDate(timezone),
    );
    const [startTime, setStartTime] = useState<string>(
        CommonTimeUtils.nowAsTimeString(timezone),
    );
    const [endDate, setEndDate] = useState<Date>(
        CommonTimeUtils.nowAsDate(timezone),
    );
    const [endTime, setEndTime] = useState<string>(
        CommonTimeUtils.nowAsTimeString(timezone),
    );

    const actionsOptions: {
        label: string;
        value: string;
        group: string;
    }[] = useMemo(() => {
        return AuditUtils.getAuditActionsOptions();
    }, []);

    const auditLevelOptions: {
        label: string;
        value: string;
    }[] = useMemo(() => {
        return AuditUtils.getAuditLevelOptions();
    }, []);

    const severityOptions: {
        label: string;
        value: string;
    }[] = useMemo(() => {
        return AuditUtils.getSeverityOptions();
    }, []);

    const entityTypeOptions: {
        label: string;
        value: string;
    }[] = useMemo(() => {
        return AuditUtils.getEntityTypeOptions();
    }, []);

    useEffect(() => {
        if (startEnabled) {
            setStartTimestamp(
                CommonTimeUtils.datesToTimestamp(
                    startDate,
                    startTime,
                    timezone,
                ),
            );
        } else {
            setStartTimestamp(null);
        }
    }, [startDate, startTime, startEnabled]);

    useEffect(() => {
        if (endEnabled) {
            setEndTimestamp(
                CommonTimeUtils.datesToTimestamp(endDate, endTime, timezone),
            );
        } else {
            setEndTimestamp(null);
        }
    }, [endDate, endTime, endEnabled]);

    const modalBody = (
        <CommonTabs
            container={{
                defaultValue: selectedTab,
                value: selectedTab,
                onTabChange: setSelectedTab,
            }}
            items={[
                {
                    label: 'Text',
                    value: 'text',
                    children: (
                        <Grid>
                            <Grid.Col span={12}>
                                <CommonSelect
                                    data={actionsOptions}
                                    label="Action"
                                    value={action}
                                    onChange={setAction}
                                    placeholder="Select an Action"
                                    clearable
                                />
                            </Grid.Col>
                            <Grid.Col span={12}>
                                <CommonTextInput
                                    label="Subject"
                                    value={subject}
                                    onChange={setSubject}
                                    placeholder="Select a Subject"
                                />
                            </Grid.Col>
                            <Grid.Col span={12} sm={6}>
                                <CommonSelect
                                    data={severityOptions}
                                    label="Severity"
                                    value={severity}
                                    onChange={setSeverity}
                                    placeholder="Select a Severity Level"
                                    clearable
                                />
                            </Grid.Col>
                            <Grid.Col span={12} sm={6}>
                                <CommonSelect
                                    data={auditLevelOptions}
                                    label="Audit Level"
                                    value={auditLevel}
                                    onChange={setAuditLevel}
                                    placeholder="Select an Audit Level"
                                    clearable
                                />
                            </Grid.Col>
                            <Grid.Col span={12} sm={6}>
                                <CommonSelect
                                    data={entityTypeOptions}
                                    label="Entity Type"
                                    value={entityType}
                                    onChange={setEntityType}
                                    placeholder="Select an Entity Type"
                                    clearable
                                />
                            </Grid.Col>
                            <Grid.Col span={12} sm={6}>
                                <CommonTextInput
                                    label="Entity"
                                    value={entity}
                                    onChange={setEntity}
                                    placeholder="Select an Entity"
                                />
                            </Grid.Col>
                            <Grid.Col span={12} sm={6}>
                                <CommonTextInput
                                    label="User Identifier"
                                    value={userIdentifier}
                                    onChange={setUserIdentifier}
                                    placeholder="Select an Idendifier"
                                />
                            </Grid.Col>
                            <Grid.Col span={12} sm={6}>
                                <CommonTextInput
                                    label="User Displayed Name"
                                    value={userDisplayedName}
                                    onChange={setUserDisplayedName}
                                    placeholder="Select a Username"
                                />
                            </Grid.Col>
                            <Grid.Col span={12}>
                                <CommonTextInput
                                    label="Settled Message"
                                    value={settledMessage}
                                    onChange={setSettledMessage}
                                    placeholder="Select a Settled Message"
                                />
                            </Grid.Col>
                        </Grid>
                    ),
                },
                {
                    label: 'Time',
                    value: 'time',
                    children: (
                        <Grid>
                            <Grid.Col span={12} md={12} xl={4}>
                                <SimpleGrid
                                    cols={1}
                                    spacing="sm"
                                    breakpoints={[
                                        {
                                            maxWidth: 'xl',
                                            cols: 2,
                                            spacing: 'sm',
                                        },
                                        {
                                            maxWidth: 'sm',
                                            cols: 1,
                                            spacing: 'sm',
                                        },
                                    ]}
                                >
                                    <Checkbox
                                        label="Start"
                                        className=" pt-4"
                                        checked={startEnabled}
                                        onChange={() => {
                                            setStartEnabled(!startEnabled);
                                        }}
                                    />
                                    <Checkbox
                                        label="End"
                                        className=" pt-4"
                                        checked={endEnabled}
                                        onChange={() => {
                                            setEndEnabled(!endEnabled);
                                        }}
                                    />
                                </SimpleGrid>
                            </Grid.Col>
                            <Grid.Col span={12} sm={6} xl={4}>
                                <div className="flex flex-col items-start h-full justify-between">
                                    <CommonCalendar
                                        label="Start"
                                        disabled={!startEnabled}
                                        value={startDate}
                                        onChange={setStartDate}
                                    />
                                    <CommonTimePicker
                                        disabled={!startEnabled}
                                        value={startTime}
                                        onTimeChange={setStartTime}
                                        className="mt-2"
                                    />
                                </div>
                            </Grid.Col>
                            <Grid.Col span={12} sm={6} xl={4}>
                                <div className="flex flex-col items-start h-full justify-between">
                                    <CommonCalendar
                                        label="End"
                                        disabled={!endEnabled}
                                        value={endDate}
                                        onChange={setEndDate}
                                    />
                                    <CommonTimePicker
                                        withSeconds
                                        disabled={!endEnabled}
                                        value={endTime}
                                        onTimeChange={setEndTime}
                                        className="mt-2"
                                    />
                                </div>
                            </Grid.Col>
                        </Grid>
                    ),
                },
            ]}
        />
    );
    function labelOrNA(label: string, value: string) {
        return (
            <div className="text-sm flex">
                <span className="font-bold">{label}: </span>
                <span className="break-words pl-1">
                    {value ? value : 'N/A'}
                </span>
            </div>
        );
    }

    return (
        <>
            <CommonTooltip
                maxWidth="20rem"
                label={
                    <div className="flex flex-col">
                        {labelOrNA(
                            'Action',
                            AuditUtils.getAuditActionLabelByAction(action),
                        )}
                        {labelOrNA('Subject', subject)}
                        {labelOrNA(
                            'Severity',
                            AuditUtils.getSeverityLabelBySeverity(severity),
                        )}
                        {labelOrNA(
                            'Audit Level',
                            AuditUtils.getAuditLevelLabelByAuditLevel(
                                auditLevel,
                            ),
                        )}
                        {labelOrNA(
                            'Entity Type',
                            AuditUtils.getEntityTypeLabelByEntityType(
                                entityType,
                            ),
                        )}
                        {labelOrNA('Entity', entity)}
                        {labelOrNA('Identifier', userIdentifier)}
                        {labelOrNA('Displayed Name', userDisplayedName)}
                        <div className="text-sm flex">
                            <span className="font-bold">Settled Message: </span>
                            <span className="break-words pl-1">
                                {settledMessage ? 'Enabled' : 'N/A'}
                            </span>
                        </div>
                        <div className="text-sm flex">
                            <span className="font-bold">Start: </span>
                            <span className="break-words pl-1">
                                {startEnabled
                                    ? CommonTimeUtils.timestampToFormattedDate(
                                          startTimestamp,
                                          timezone,
                                          dateFormat,
                                      )
                                    : 'N/A'}
                            </span>
                        </div>
                        <div className="text-sm flex">
                            <span className="font-bold">End: </span>
                            <span className="break-words pl-1">
                                {endEnabled
                                    ? CommonTimeUtils.timestampToFormattedDate(
                                          endTimestamp,
                                          timezone,
                                          dateFormat,
                                      )
                                    : 'N/A'}
                            </span>
                        </div>
                    </div>
                }
            >
                <CommonButton
                    onClick={() => {
                        setIsModalOpen(true);
                    }}
                    variant="outline"
                >
                    Filters
                </CommonButton>
            </CommonTooltip>
            <CommonModal
                isOpen={isModalOpen}
                modalBody={modalBody}
                modalTitle={
                    <div className="flex items-center">
                        <Text className="pr-2">Audit Log Filters</Text>
                    </div>
                }
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default AuditLogFiltersComponent;
