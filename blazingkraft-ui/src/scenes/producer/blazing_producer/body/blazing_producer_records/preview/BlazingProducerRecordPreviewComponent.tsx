import { ActionIcon, Text, Tooltip } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { CommonTimeUtils } from 'common/utils/CommonTimeUtils ';
import { CommonUtils } from 'common/utils/CommonUtils';
import { ProducerUtils } from 'common/utils/ProducerUtils';
import { useEffect, useState } from 'react';
import { TbCopy } from 'react-icons/tb';
import CommonEditor from 'scenes/common/editor/CommonEditor';
import CommonEditorWrapper from 'scenes/common/editor/CommonEditorWrapper';
import CommonModal from 'scenes/common/modal/CommonModal';
import CommonTabs, { CommonTabsItemProps } from 'scenes/common/tabs/CommonTabs';
import { PublishedRecord } from '../../BlazingProducerBodyComponent';

interface BlazingProducerRecordPreviewComponentProps {
    selectedRecord: PublishedRecord | null;
    isPreviewModalOpen: boolean;
    setIsPreviewModalOpen: (isOpen: boolean) => void;
    timezone: string;
    timeFormat: string;
}

function computeAdditionalContent(
    selectedRecord: PublishedRecord,
    timezone: string,
    timeFormat: string,
) {
    const additionalContent = selectedRecord.succeeded
        ? CommonUtils.beautifyJson({
              Topic: selectedRecord.recordMetadata?.topicPartition?.topic,
              ['Partition']:
                  selectedRecord.recordMetadata?.topicPartition?.partition,
              Offset: selectedRecord.recordMetadata?.offset,
              Timestamp: CommonTimeUtils.timestampToFormattedDate(
                  selectedRecord.recordMetadata?.timestamp,
                  timezone,
                  timeFormat,
              ),
              ['Serialized Key Size']: CommonUtils.beautifyBytes(
                  selectedRecord.recordMetadata?.serializedKeySize,
              ),
              ['Serialized Value Size']: CommonUtils.beautifyBytes(
                  selectedRecord.recordMetadata?.serializedValueSize,
              ),
          })
        : selectedRecord.errorMessage;
    return additionalContent;
}

function modalBody(
    selectedRecord: PublishedRecord | null,
    selectedTab,
    setSelectedTab,
    timezone: string,
    timeFormat: string,
    clipboard,
) {
    if (!selectedRecord) return null;
    const items: CommonTabsItemProps[] = [
        {
            label: 'Key',
            value: 'key',
            children: (
                <CommonEditorWrapper minHeight="23rem">
                    <CommonEditor
                        content={CommonUtils.beautifyJsonString(
                            selectedRecord.key,
                        )}
                        language={'json'}
                        defaultValue={CommonUtils.beautifyJsonString(
                            selectedRecord.key,
                        )}
                        readOnly
                    />
                </CommonEditorWrapper>
            ),
        },
    ];
    if (ProducerUtils.isSchemaEditorSerializer(selectedRecord.keySerializer)) {
        items.push({
            label: 'Key Schema',
            value: 'keySchema',
            children: (
                <CommonEditorWrapper minHeight="23rem">
                    <CommonEditor
                        content={CommonUtils.beautifyJsonString(
                            selectedRecord.keySchema,
                        )}
                        language={ProducerUtils.editorLanguageBySerializer(
                            selectedRecord.keySerializer,
                        )}
                        defaultValue={CommonUtils.beautifyJsonString(
                            selectedRecord.keySchema,
                        )}
                        readOnly
                    />
                </CommonEditorWrapper>
            ),
        });
    }
    items.push({
        label: 'Value',
        value: 'value',
        children: (
            <CommonEditorWrapper minHeight="23rem">
                <CommonEditor
                    content={CommonUtils.beautifyJsonString(
                        selectedRecord.value,
                    )}
                    language={'json'}
                    defaultValue={CommonUtils.beautifyJsonString(
                        selectedRecord.value,
                    )}
                    readOnly
                />
            </CommonEditorWrapper>
        ),
    });
    if (
        ProducerUtils.isSchemaEditorSerializer(selectedRecord.valueSerializer)
    ) {
        items.push({
            label: 'Value Schema',
            value: 'valueSchema',
            children: (
                <CommonEditorWrapper minHeight="23rem">
                    <CommonEditor
                        content={CommonUtils.beautifyJsonString(
                            selectedRecord.valueSchema,
                        )}
                        language={ProducerUtils.editorLanguageBySerializer(
                            selectedRecord.valueSerializer,
                        )}
                        defaultValue={CommonUtils.beautifyJsonString(
                            selectedRecord.valueSchema,
                        )}
                        readOnly
                    />
                </CommonEditorWrapper>
            ),
        });
    }
    const additionalContent = computeAdditionalContent(
        selectedRecord,
        timezone,
        timeFormat,
    );
    items.push(
        {
            label: 'Headers',
            value: 'headers',
            children: (
                <CommonEditorWrapper minHeight="23rem">
                    <CommonEditor
                        content={CommonUtils.beautifyJsonString(
                            selectedRecord.headers,
                        )}
                        language={'json'}
                        defaultValue={CommonUtils.beautifyJsonString(
                            selectedRecord.headers,
                        )}
                        readOnly
                    />
                </CommonEditorWrapper>
            ),
        },
        {
            label: selectedRecord.succeeded ? 'Metadata' : 'Error Message',
            value: 'additional',
            children: (
                <CommonEditorWrapper minHeight="23rem">
                    <CommonEditor
                        content={additionalContent}
                        defaultValue={additionalContent}
                        language={selectedRecord.succeeded ? 'json' : 'text'}
                        readOnly
                    />
                </CommonEditorWrapper>
            ),
        },
    );
    return (
        <CommonTabs
            container={{
                variant: 'outline',
                value: selectedTab,
                onTabChange: setSelectedTab,
            }}
            items={items}
            additionalActions={
                <div className="ml-auto flex items-end">
                    <Tooltip label="Copy Current Content">
                        <ActionIcon
                            className="ml-2"
                            onClick={() => {
                                if (selectedTab === 'key') {
                                    clipboard.copy(selectedRecord.key);
                                } else if (selectedTab === 'value') {
                                    clipboard.copy(selectedRecord.value);
                                } else if (selectedTab === 'headers') {
                                    clipboard.copy(selectedRecord.headers);
                                } else if (selectedTab === 'keySchema') {
                                    clipboard.copy(selectedRecord.keySchema);
                                } else if (selectedTab === 'valueSchema') {
                                    clipboard.copy(selectedRecord.valueSchema);
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

function BlazingProducerRecordPreviewComponent({
    selectedRecord,
    isPreviewModalOpen,
    setIsPreviewModalOpen,
    timezone,
    timeFormat,
}: BlazingProducerRecordPreviewComponentProps) {
    const [selectedTab, setSelectedTab] = useState('additional');
    const clipboard = useClipboard();
    useEffect(() => {
        if (
            isPreviewModalOpen &&
            selectedTab !== 'key' &&
            selectedTab !== 'value' &&
            selectedTab !== 'headers' &&
            selectedTab !== 'additional'
        ) {
            setSelectedTab('additional');
        }
    }, [isPreviewModalOpen]);
    return (
        <CommonModal
            onClose={() => setIsPreviewModalOpen(false)}
            isOpen={isPreviewModalOpen}
            modalBody={modalBody(
                selectedRecord,
                selectedTab,
                setSelectedTab,
                timezone,
                timeFormat,
                clipboard,
            )}
            modalTitle={
                <div className="flex items-center">
                    <Text className="pr-2">Record Preview</Text>
                    <Text color="dimmed" size="xs">
                        {selectedRecord?.topic}
                        {selectedRecord?.succeeded ? ' (Success)' : ' (Failed)'}
                    </Text>
                </div>
            }
        />
    );
}

export default BlazingProducerRecordPreviewComponent;
