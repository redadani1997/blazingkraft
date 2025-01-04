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
import { ConsumerUtils } from 'common/utils/ConsumerUtils';
import { useState } from 'react';
import { TbAlertCircle, TbSettings } from 'react-icons/tb';
import CommonCheckbox from 'scenes/common/input/CommonCheckbox';
import CommonNumberInput from 'scenes/common/input/CommonNumberInput';
import CommonModal from 'scenes/common/modal/CommonModal';
import CommonSelect from 'scenes/common/select/CommonSelect';
import { BlazingConsumerDisplayField } from '../BlazingConsumerRecordsComponent';

interface BlazingConsumerRecordsSettingsProps {
    timezone: string;
    setTimezone: (timezone: string) => void;
    timeFormat: string;
    setTimeFormat: (timeFormat: string) => void;
    displayedFields: BlazingConsumerDisplayField[];
    setDisplayedFields: (
        displayedFields: BlazingConsumerDisplayField[],
    ) => void;
    resultsSize: number;
    setResultsSize: (resultsSize: number) => void;
}

function modalBody(
    timezone: string,
    setTimezone: (timezone: string) => void,
    timeFormat: string,
    setTimeFormat: (timeFormat: string) => void,
    displayedFields: BlazingConsumerDisplayField[],
    setDisplayedFields: (
        displayedFields: BlazingConsumerDisplayField[],
    ) => void,
    resultsSize: number,
    setResultsSize: (resultsSize: number) => void,
) {
    function onDisplayFieldsChange(
        e: React.ChangeEvent<HTMLInputElement>,
        field: BlazingConsumerDisplayField,
    ) {
        if (e.target.checked && displayedFields.length < 4) {
            setDisplayedFields([...displayedFields, field]);
        } else if (!e.target.checked && displayedFields.length > 2) {
            setDisplayedFields(displayedFields.filter(f => f !== field));
        }
    }
    const topicSelected = displayedFields.includes('topic');
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
                    timestamp, and to convert the dates used in the filter
                    section.
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
                        checked={topicSelected}
                        onChange={e => onDisplayFieldsChange(e, 'topic')}
                        label="Topic (in multi-topic mode)"
                    />
                </Grid.Col>
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
                    choose at least 2 and at most 4 keys.
                </Text>
            </Alert>
            <Grid className="pt-3">
                <Grid.Col span={12} md={6}>
                    <CommonNumberInput
                        label="Results Size"
                        value={resultsSize}
                        onChange={value => setResultsSize(value)}
                        min={-1}
                        max={ConsumerUtils.MAX_RESULTS_SIZE}
                    />
                </Grid.Col>
                <Grid.Col span={12} md={3}>
                    <CommonCheckbox
                        label="Count All Records"
                        checked={resultsSize === 0}
                        onChange={checked =>
                            setResultsSize(
                                checked
                                    ? 0
                                    : ConsumerUtils.DEFAULT_RESULTS_SIZE,
                            )
                        }
                    />
                </Grid.Col>
                <Grid.Col span={12} md={3}>
                    <CommonCheckbox
                        label="Get All Records"
                        checked={resultsSize === -1}
                        onChange={checked =>
                            setResultsSize(
                                checked
                                    ? -1
                                    : ConsumerUtils.DEFAULT_RESULTS_SIZE,
                            )
                        }
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
                    * Choose the number of records to be displayed in the
                    records list.
                </Text>
                <Text>
                    * Choose a number between -1 and{' '}
                    {ConsumerUtils.MAX_RESULTS_SIZE}, the default is{' '}
                    {ConsumerUtils.DEFAULT_RESULTS_SIZE}.
                </Text>
                <Text>
                    * Selecting 0 or 'Count All Records' option allows you to
                    execute a count with no records returned.
                </Text>
                <Text>
                    * Selecting -1 or 'Get All Records' option allows you to
                    return all records matching your criteria (In case you want
                    to export all records).
                </Text>
            </Alert>
        </div>
    );
}

function BlazingConsumerRecordsSettings({
    timezone,
    setTimezone,
    timeFormat,
    setTimeFormat,
    displayedFields,
    setDisplayedFields,
    resultsSize,
    setResultsSize,
}: BlazingConsumerRecordsSettingsProps) {
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
                    resultsSize,
                    setResultsSize,
                )}
            />
        </>
    );
}

export default BlazingConsumerRecordsSettings;
