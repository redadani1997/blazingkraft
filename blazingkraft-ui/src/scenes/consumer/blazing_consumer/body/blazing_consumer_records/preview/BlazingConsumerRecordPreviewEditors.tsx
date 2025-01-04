import { ActionIcon, Tooltip } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import {
    BlazingConsumptionResponse,
    ConsumerDeserializer,
} from 'common/types/consumer';
import { CommonTimeUtils } from 'common/utils/CommonTimeUtils ';
import { CommonUtils } from 'common/utils/CommonUtils';
import { useState } from 'react';
import { TbCopy } from 'react-icons/tb';
import CommonEditor from 'scenes/common/editor/CommonEditor';
import CommonEditorWrapper from 'scenes/common/editor/CommonEditorWrapper';
import CommonTabs, { CommonTabsItemProps } from 'scenes/common/tabs/CommonTabs';

interface BlazingConsumerRecordPreviewEditorsProps {
    record: BlazingConsumptionResponse | null;
    keyDeserializer: ConsumerDeserializer;
    valueDeserializer: ConsumerDeserializer;
    timezone: string;
    timeFormat: string;
}

function computeAdditionalContent(
    record: BlazingConsumptionResponse,
    timezone: string,
    timeFormat: string,
) {
    const additionalContent = record
        ? CommonUtils.beautifyJson({
              Topic: record.metadata?.topic,
              Partition: record.metadata?.partition,
              Offset: record.metadata?.offset,
              Timestamp: CommonTimeUtils.timestampToFormattedDate(
                  record.metadata?.timestamp,
                  timezone,
                  timeFormat,
              ),
              ['Timestamp Type']: record.metadata?.timestampType,
              ['Serialized Key Size']: CommonUtils.beautifyBytes(
                  record.metadata?.serializedKeySize,
              ),
              ['Serialized Value Size']: CommonUtils.beautifyBytes(
                  record.metadata?.serializedValueSize,
              ),
              ['Leader Epoch']: record.metadata?.leaderEpoch,
          })
        : '';
    return additionalContent;
}

function computeContent(content, errorMessage, succeeded) {
    if (succeeded) {
        return CommonUtils.beautifyJsonString(content);
    } else {
        return (
            '* Error Message:\n\n' +
            CommonUtils.beautifyJsonString(errorMessage) +
            '\n\n* Fallback Stringified Content:\n\n' +
            CommonUtils.beautifyJsonString(content)
        );
    }
}

function BlazingConsumerRecordPreviewEditors({
    record,
    timezone,
    timeFormat,
}: BlazingConsumerRecordPreviewEditorsProps) {
    const [selectedTab, setSelectedTab] = useState('value');
    const clipboard = useClipboard();

    const additionalContent = computeAdditionalContent(
        record,
        timezone,
        timeFormat,
    );

    if (!record) return null;

    const key = computeContent(
        record.key.payload,
        record.key.errorMessage,
        record.key.succeeded,
    );
    const value = computeContent(
        record.value.payload,
        record.value.errorMessage,
        record.value.succeeded,
    );

    const items: CommonTabsItemProps[] = [
        {
            label: 'Key',
            value: 'key',
            children: (
                <CommonEditorWrapper minHeight="23rem">
                    <CommonEditor
                        content={key}
                        language={'json'}
                        defaultValue={key}
                        readOnly
                    />
                </CommonEditorWrapper>
            ),
        },
        {
            label: 'Value',
            value: 'value',
            children: (
                <CommonEditorWrapper minHeight="23rem">
                    <CommonEditor
                        content={value}
                        language={'json'}
                        defaultValue={value}
                        readOnly
                    />
                </CommonEditorWrapper>
            ),
        },
        {
            label: 'Headers',
            value: 'headers',
            children: (
                <CommonEditorWrapper minHeight="23rem">
                    <CommonEditor
                        content={CommonUtils.beautifyJson(record.headers)}
                        language={'json'}
                        defaultValue={CommonUtils.beautifyJson(record.headers)}
                        readOnly
                    />
                </CommonEditorWrapper>
            ),
        },
        {
            label: record ? 'Metadata' : 'Error Message',
            value: 'additional',
            children: (
                <CommonEditorWrapper minHeight="23rem">
                    <CommonEditor
                        content={additionalContent}
                        defaultValue={additionalContent}
                        language={record ? 'json' : 'text'}
                        readOnly
                    />
                </CommonEditorWrapper>
            ),
        },
    ];

    return (
        <CommonTabs
            container={{
                variant: 'outline',
                value: selectedTab,
                onTabChange: setSelectedTab,
                className: 'h-full',
            }}
            items={items}
            additionalActions={
                <div className="ml-auto flex items-end">
                    <Tooltip label="Copy Current Content">
                        <ActionIcon
                            className="ml-2"
                            onClick={() => {
                                if (selectedTab === 'key') {
                                    clipboard.copy(key);
                                } else if (selectedTab === 'value') {
                                    clipboard.copy(value);
                                } else if (selectedTab === 'headers') {
                                    clipboard.copy(record.headers);
                                } else if (selectedTab === 'additional') {
                                    clipboard.copy(additionalContent);
                                }
                            }}
                        >
                            <TbCopy size="1.4rem" />
                        </ActionIcon>
                    </Tooltip>
                </div>
            }
        />
    );
}

export default BlazingConsumerRecordPreviewEditors;
