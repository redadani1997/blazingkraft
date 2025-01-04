import { ActionIcon, Skeleton, Text, Tooltip } from '@mantine/core';
import useCommonLocalStorage from 'common/hooks/localstorage/useCommonLocalStorage';
import { BlazingConsumptionResponse } from 'common/types/consumer';
import { CommonDesktopUtils } from 'common/utils/CommonDesktopUtils';
import { CommonUtils } from 'common/utils/CommonUtils';
import {
    IBlazingKRaftProducerConfigurationStorage,
    ProducerUtils,
} from 'common/utils/ProducerUtils';
import { useCallback, useMemo } from 'react';
import { AiOutlineRedo } from 'react-icons/ai';
import { TbEraser } from 'react-icons/tb';
import { useParams } from 'react-router';
import CommonCode from 'scenes/common/code/CommonCode';
import CommonScrollArea from 'scenes/common/scroll_area/CommonScrollArea';
import { BlazingConsumerDisplayField } from '../BlazingConsumerRecordsComponent';
import BlazingConsumerRecordsExport from '../export/BlazingConsumerRecordsExport';
import BlazingConsumerRecordsItemsPaging from '../paging/BlazingConsumerRecordsItemsPaging';
import BlazingConsumerRecordsSettings from '../settings/BlazingConsumerRecordsSettings';

interface BlazingConsumerRecordsListComponentProps {
    setSelectedRecordId: (index: number) => void;
    setSelectedRecord: (record: BlazingConsumptionResponse) => void;
    selectedRecordId: number;
    setIsPreviewModalOpen: (isOpen: boolean) => void;
    multiTopics: boolean;
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
    clearRecords: () => void;
    allRecords: BlazingConsumptionResponse[];
    isAllTransitionning: boolean;
    isConsuming: boolean;
}

function BlazingConsumerRecordsListComponent({
    setSelectedRecord,
    setSelectedRecordId,
    selectedRecordId,
    setIsPreviewModalOpen,
    timezone,
    setTimezone,
    multiTopics,
    timeFormat,
    setTimeFormat,
    displayedFields,
    setDisplayedFields,
    resultsSize,
    setResultsSize,
    allRecords,
    clearRecords,
    isAllTransitionning,
    isConsuming,
}: BlazingConsumerRecordsListComponentProps) {
    const { clusterCode } = useParams();

    const topicSelected = displayedFields.includes('topic');
    const partitionSelected = displayedFields.includes('partition');
    const offsetSelected = displayedFields.includes('offset');
    const timestampSelected = displayedFields.includes('timestamp');
    const keySelected = displayedFields.includes('key');
    const valueSelected = displayedFields.includes('value');
    const colsNumber = useMemo(() => {
        let cols = 0;
        if (multiTopics && topicSelected) {
            cols += 2;
        }
        if (keySelected) {
            cols += 2;
        }
        if (valueSelected) {
            cols += 2;
        }
        if (partitionSelected) {
            cols += 1;
        }
        if (offsetSelected) {
            cols += 1;
        }
        if (timestampSelected) {
            cols += 3;
        }
        return cols;
    }, [
        multiTopics,
        topicSelected,
        keySelected,
        valueSelected,
        partitionSelected,
        offsetSelected,
        timestampSelected,
    ]);

    const [
        getBlazingKRaftProducerConfigurationStorage,
        setBlazingKRaftProducerConfigurationStorage,
    ] = useCommonLocalStorage({
        key: 'Blazing KRaft Producer Configuration',
    });

    const blazingKRaftProducerConfigurationStorage: IBlazingKRaftProducerConfigurationStorage | null =
        useMemo(() => {
            return ProducerUtils.retrieveBlazingKRaftProducerConfigurationStorage(
                getBlazingKRaftProducerConfigurationStorage,
            );
        }, []);

    const reproduceRecord = useCallback(
        (record: BlazingConsumptionResponse) => {
            const existingConfiguration =
                blazingKRaftProducerConfigurationStorage || {};

            ProducerUtils.storeBlazingKRaftProducerConfigurationStorage(
                {
                    ...existingConfiguration,
                    kafkaKey: record.key.payload,
                    kafkaValue: record.value.payload,
                    kafkaHeaders: CommonUtils.beautifyJson(record.headers),
                },
                setBlazingKRaftProducerConfigurationStorage,
            );

            if (CommonDesktopUtils.isWeb()) {
                window.open(
                    `/clusters/${clusterCode}/producer/blazing_producer?topic=${record.metadata.topic}`,
                    '_blank',
                    'noopener,noreferrer',
                );
            } else {
                window.open(
                    `#/clusters/${clusterCode}/producer/blazing_producer?topic=${record.metadata.topic}`,
                    '_blank',
                    'noopener,noreferrer',
                );
            }
        },
        [],
    );

    return (
        <div className="flex flex-col w-full h-full">
            <div
                className="grid gap-2 w-full items-center relative"
                style={{
                    minHeight: '2.7rem',
                    gridTemplateColumns: `repeat(${colsNumber}, minmax(0, 1fr))`,
                }}
            >
                {multiTopics && topicSelected && (
                    <div className="grid-col-span-2 overflow-hidden">
                        <CommonCode className="text-sm common-elipsis">
                            Topic
                        </CommonCode>
                    </div>
                )}
                {partitionSelected && (
                    <div className="grid-col-span-1 overflow-hidden">
                        <CommonCode className="text-sm common-elipsis">
                            Partition
                        </CommonCode>
                    </div>
                )}
                {offsetSelected && (
                    <div className="grid-col-span-1 overflow-hidden">
                        <CommonCode className="text-sm common-elipsis">
                            Offset
                        </CommonCode>
                    </div>
                )}
                {keySelected && (
                    <div className="grid-col-span-2 overflow-hidden">
                        <CommonCode className="text-sm common-elipsis">
                            Key
                        </CommonCode>
                    </div>
                )}
                {valueSelected && (
                    <div className="grid-col-span-2 overflow-hidden">
                        <CommonCode className="text-sm common-elipsis">
                            Value
                        </CommonCode>
                    </div>
                )}
                {timestampSelected && (
                    <span className="grid-col-span-3 overflow-hidden">
                        <CommonCode className="text-sm common-elipsis">
                            Timestamp
                        </CommonCode>
                    </span>
                )}
                <div className="absolute flex justify-end w-full items-center">
                    <Tooltip label="Reproduce Selected Record">
                        <ActionIcon
                            onClick={() => {
                                if (
                                    allRecords.length === 0 ||
                                    selectedRecordId === null ||
                                    selectedRecordId === undefined
                                ) {
                                    return;
                                }
                                const record = allRecords.find(
                                    record => record.id === selectedRecordId,
                                );
                                if (!record) {
                                    return;
                                }
                                reproduceRecord(record);
                            }}
                        >
                            <AiOutlineRedo size="1.4rem" />
                        </ActionIcon>
                    </Tooltip>
                    <BlazingConsumerRecordsExport
                        allRecords={allRecords}
                        selectedRecordId={selectedRecordId}
                    />
                    <Tooltip
                        label={`Clear (${CommonUtils.beautifyNumber(
                            allRecords.length,
                        )})`}
                    >
                        <ActionIcon
                            onClick={() => {
                                if (allRecords.length === 0) {
                                    return;
                                }
                                setSelectedRecord(null);
                                setSelectedRecordId(null);
                                clearRecords();
                                setIsPreviewModalOpen(false);
                            }}
                        >
                            <TbEraser size="1.4rem" />
                        </ActionIcon>
                    </Tooltip>
                    <BlazingConsumerRecordsSettings
                        timezone={timezone}
                        setTimezone={setTimezone}
                        timeFormat={timeFormat}
                        setTimeFormat={setTimeFormat}
                        displayedFields={displayedFields}
                        setDisplayedFields={setDisplayedFields}
                        resultsSize={resultsSize}
                        setResultsSize={setResultsSize}
                    />
                </div>
            </div>
            {(isAllTransitionning || isConsuming) && allRecords.length === 0 ? (
                <>
                    <Skeleton height="2.5rem" mt={6} radius="sm" />
                    <Skeleton height="2.5rem" mt={6} radius="sm" />
                    <Skeleton height="2.5rem" mt={6} radius="sm" />
                    <Skeleton height="2.5rem" mt={6} radius="sm" />
                    <Skeleton height="2.5rem" mt={6} radius="sm" />
                </>
            ) : allRecords.length > 0 ? (
                <CommonScrollArea className="h-full w-full">
                    <BlazingConsumerRecordsItemsPaging
                        setSelectedRecord={setSelectedRecord}
                        selectedRecordId={selectedRecordId}
                        setSelectedRecordId={setSelectedRecordId}
                        setIsPreviewModalOpen={setIsPreviewModalOpen}
                        timezone={timezone}
                        multiTopics={multiTopics}
                        timeFormat={timeFormat}
                        allRecords={allRecords}
                        topicSelected={topicSelected}
                        partitionSelected={partitionSelected}
                        offsetSelected={offsetSelected}
                        timestampSelected={timestampSelected}
                        keySelected={keySelected}
                        valueSelected={valueSelected}
                        colsNumber={colsNumber}
                    />
                </CommonScrollArea>
            ) : (
                <Text className="text-gray-500 italic pl-4" size="sm">
                    No available data
                </Text>
            )}
        </div>
    );
}

export default BlazingConsumerRecordsListComponent;
