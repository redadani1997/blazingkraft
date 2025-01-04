import {
    ActionIcon,
    Alert,
    Anchor,
    Checkbox,
    Grid,
    Text,
    Tooltip,
} from '@mantine/core';
import { CommonTimeUtils } from 'common/utils/CommonTimeUtils ';
import { useState } from 'react';
import { TbAlertCircle, TbSettings } from 'react-icons/tb';
import CommonModal from 'scenes/common/modal/CommonModal';
import CommonSelect from 'scenes/common/select/CommonSelect';
import { BlazingProducerDisplayField } from '../BlazingProducerRecordsComponent';

interface BlazingProducerRecordsSettingsProps {
    timezone: string;
    setTimezone: (timezone: string) => void;
    timeFormat: string;
    setTimeFormat: (timeFormat: string) => void;
    displayedFields: BlazingProducerDisplayField[];
    setDisplayedFields: (
        displayedFields: BlazingProducerDisplayField[],
    ) => void;
}

function modalBody(
    timezone: string,
    setTimezone: (timezone: string) => void,
    timeFormat: string,
    setTimeFormat: (timeFormat: string) => void,
    displayedFields: BlazingProducerDisplayField[],
    setDisplayedFields: (
        displayedFields: BlazingProducerDisplayField[],
    ) => void,
) {
    function onDisplayFieldsChange(
        e: React.ChangeEvent<HTMLInputElement>,
        field: BlazingProducerDisplayField,
    ) {
        if (e.target.checked && displayedFields.length < 3) {
            setDisplayedFields([...displayedFields, field]);
        } else if (!e.target.checked && displayedFields.length > 2) {
            setDisplayedFields(displayedFields.filter(f => f !== field));
        }
    }
    const partitionSelected = displayedFields.includes('partition');
    const offsetSelected = displayedFields.includes('offset');
    const timestampSelected = displayedFields.includes('timestamp');
    const keySelected = displayedFields.includes('key');
    const valueSelected = displayedFields.includes('value');
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
                    * The timezone selected will be used to convert the record's
                    timestamp.
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
                        checked={partitionSelected}
                        onChange={e => onDisplayFieldsChange(e, 'partition')}
                        label="Partition"
                    />
                </Grid.Col>
                <Grid.Col span={12} md={6} lg={4}>
                    <Checkbox
                        className="my-2"
                        checked={offsetSelected}
                        onChange={e => onDisplayFieldsChange(e, 'offset')}
                        label="Offset"
                    />
                </Grid.Col>
                <Grid.Col span={12} md={6} lg={4}>
                    <Checkbox
                        className="my-2"
                        checked={timestampSelected}
                        onChange={e => onDisplayFieldsChange(e, 'timestamp')}
                        label="timestamp"
                    />
                </Grid.Col>
                <Grid.Col span={12} md={6} lg={4}>
                    <Checkbox
                        className="my-2"
                        checked={keySelected}
                        onChange={e => onDisplayFieldsChange(e, 'key')}
                        label="Key Preview"
                    />
                </Grid.Col>
                <Grid.Col span={12} md={6} lg={4}>
                    <Checkbox
                        className="my-2"
                        checked={valueSelected}
                        onChange={e => onDisplayFieldsChange(e, 'value')}
                        label="Value Preview"
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
                    choose at least 2 and at most 3 keys.
                </Text>
            </Alert>
        </div>
    );
}

function BlazingProducerRecordsSettings({
    timezone,
    setTimezone,
    timeFormat,
    setTimeFormat,
    displayedFields,
    setDisplayedFields,
}: BlazingProducerRecordsSettingsProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Tooltip label="Settings">
                <ActionIcon
                    onClick={() => {
                        setIsModalOpen(true);
                    }}
                >
                    <TbSettings size="1.4rem" />
                </ActionIcon>
            </Tooltip>
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

export default BlazingProducerRecordsSettings;
