import { Alert, Anchor, Checkbox, Grid, Text } from '@mantine/core';
import { CommonTimeUtils } from 'common/utils/CommonTimeUtils ';
import { useState } from 'react';
import { TbAlertCircle } from 'react-icons/tb';
import CommonButton from 'scenes/common/button/CommonButton';
import CommonModal from 'scenes/common/modal/CommonModal';
import CommonSelect from 'scenes/common/select/CommonSelect';
import { AuditLogDisplayedField } from '../AuditLogBodyComponent';

interface AuditLogSettingsComponentProps {
    timezone: string;
    setTimezone: (timezone: string) => void;
    timeFormat: string;
    setTimeFormat: (timeFormat: string) => void;
    displayedFields: AuditLogDisplayedField[];
    setDisplayedFields: (displayedFields: AuditLogDisplayedField[]) => void;
}

function modalBody(
    timezone: string,
    setTimezone: (timezone: string) => void,
    timeFormat: string,
    setTimeFormat: (timeFormat: string) => void,
    displayedFields: AuditLogDisplayedField[],
    setDisplayedFields: (displayedFields: AuditLogDisplayedField[]) => void,
) {
    function onDisplayFieldsChange(
        e: React.ChangeEvent<HTMLInputElement>,
        field: AuditLogDisplayedField,
    ) {
        if (e.target.checked && displayedFields.length < 5) {
            setDisplayedFields([...displayedFields, field]);
        } else if (!e.target.checked && displayedFields.length > 3) {
            setDisplayedFields(displayedFields.filter(f => f !== field));
        }
    }
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
    return (
        <div className="flex flex-col">
            <Grid>
                <Grid.Col span={12} md={6}>
                    <CommonSelect
                        placeholder="Select Timezone"
                        label="Timezone"
                        creatable
                        searchable
                        value={timezone}
                        data={CommonTimeUtils.TIMEZONES_OPTIONS}
                        onChange={value => setTimezone(value)}
                        clearable={false}
                    />
                </Grid.Col>
                <Grid.Col span={12} md={6}>
                    <CommonSelect
                        placeholder="Select Time format"
                        label="Time Format"
                        creatable
                        searchable
                        value={timeFormat}
                        data={CommonTimeUtils.COMMON_DATE_FORMAT_OPTIONS}
                        onChange={value => setTimeFormat(value)}
                        clearable={false}
                    />
                </Grid.Col>
            </Grid>
            <Alert
                className="mt-2"
                icon={<TbAlertCircle size={20} />}
                title="Info"
                color="blue"
            >
                <Text>
                    * The timezone selected will be used to convert the audit
                    log entry's timestamp, and to convert the dates used in the
                    filter section.
                </Text>
                <Text>
                    * Select a time format or write your own format following{' '}
                    <Anchor
                        href="https://momentjs.com/docs/#/displaying/format/"
                        target="_blank"
                    >
                        this specification.
                    </Anchor>
                </Text>
            </Alert>
            <Grid className="pt-3">
                <Grid.Col span={12} md={6} lg={4}>
                    <Checkbox
                        className="my-2"
                        checked={actionSelected}
                        onChange={e => onDisplayFieldsChange(e, 'action')}
                        label="Action"
                    />
                </Grid.Col>
                <Grid.Col span={12} md={6} lg={4}>
                    <Checkbox
                        className="my-2"
                        checked={entityTypeSelected}
                        onChange={e => onDisplayFieldsChange(e, 'entityType')}
                        label="Entity Type"
                    />
                </Grid.Col>
                <Grid.Col span={12} md={6} lg={4}>
                    <Checkbox
                        className="my-2"
                        checked={entitySelected}
                        onChange={e => onDisplayFieldsChange(e, 'entity')}
                        label="Entity"
                    />
                </Grid.Col>
                <Grid.Col span={12} md={6} lg={4}>
                    <Checkbox
                        className="my-2"
                        checked={subjectSelected}
                        onChange={e => onDisplayFieldsChange(e, 'subject')}
                        label="Subject"
                    />
                </Grid.Col>
                <Grid.Col span={12} md={6} lg={4}>
                    <Checkbox
                        className="my-2"
                        checked={timestampSelected}
                        onChange={e => onDisplayFieldsChange(e, 'timestamp')}
                        label="Timestamp"
                    />
                </Grid.Col>
                <Grid.Col span={12} md={6} lg={4}>
                    <Checkbox
                        className="my-2"
                        checked={userIdentifierSelected}
                        onChange={e =>
                            onDisplayFieldsChange(e, 'userIdentifier')
                        }
                        label="User Identifier"
                    />
                </Grid.Col>
                <Grid.Col span={12} md={6} lg={4}>
                    <Checkbox
                        className="my-2"
                        checked={userDisplayedNameSelected}
                        onChange={e =>
                            onDisplayFieldsChange(e, 'userDisplayedName')
                        }
                        label="User Displayed Name"
                    />
                </Grid.Col>
                <Grid.Col span={12} md={6} lg={4}>
                    <Checkbox
                        className="my-2"
                        checked={auditLevelSelected}
                        onChange={e => onDisplayFieldsChange(e, 'auditLevel')}
                        label="Audit Level"
                    />
                </Grid.Col>
                <Grid.Col span={12} md={6} lg={4}>
                    <Checkbox
                        className="my-2"
                        checked={severitySelected}
                        onChange={e => onDisplayFieldsChange(e, 'severity')}
                        label="Severity"
                    />
                </Grid.Col>
                <Grid.Col span={12} md={6} lg={4}>
                    <Checkbox
                        className="my-2"
                        checked={settledMessageSelected}
                        onChange={e =>
                            onDisplayFieldsChange(e, 'settledMessage')
                        }
                        label="Settled Message"
                    />
                </Grid.Col>
            </Grid>
            <Alert
                className="mt-2"
                icon={<TbAlertCircle size={20} />}
                title="Info"
                color="blue"
            >
                <Text>
                    * Choose the data to be displayed in the records list,
                    choose at least 3 and at most 5 keys.
                </Text>
            </Alert>
        </div>
    );
}

function AuditLogSettingsComponent({
    timezone,
    setTimezone,
    timeFormat,
    setTimeFormat,
    displayedFields,
    setDisplayedFields,
}: AuditLogSettingsComponentProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <CommonButton
                onClick={() => {
                    setIsModalOpen(true);
                }}
                variant="outline"
            >
                Settings
            </CommonButton>
            <CommonModal
                modalTitle="Display Settings"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                modalBody={modalBody(
                    timezone,
                    setTimezone,
                    timeFormat,
                    setTimeFormat,
                    displayedFields,
                    setDisplayedFields,
                )}
            />
        </>
    );
}

export default AuditLogSettingsComponent;
