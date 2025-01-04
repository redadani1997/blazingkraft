import { ActionIcon, Text, Tooltip } from '@mantine/core';
import { useMemo } from 'react';
import { TbEraser } from 'react-icons/tb';
import CommonCode from 'scenes/common/code/CommonCode';
import CommonScrollArea from 'scenes/common/scroll_area/CommonScrollArea';
import { PublishedRecord } from '../../BlazingProducerBodyComponent';
import { BlazingProducerDisplayField } from '../BlazingProducerRecordsComponent';
import BlazingProducerRecordsItemsPaging from '../paging/BlazingProducerRecordsItemsPaging';
import BlazingProducerRecordsSettings from '../settings/BlazingProducerRecordsSettings';

interface BlazingProducerRecordsListComponentProps {
    records: PublishedRecord[];
    clearRecords: () => void;
    setSelectedRecordId: (index: number) => void;
    setSelectedRecord: (record: PublishedRecord) => void;
    selectedRecordId: number;
    setIsPreviewModalOpen: (isOpen: boolean) => void;
    timezone: string;
    setTimezone: (timezone: string) => void;
    timeFormat: string;
    setTimeFormat: (timeFormat: string) => void;
    displayedFields: BlazingProducerDisplayField[];
    setDisplayedFields: (
        displayedFields: BlazingProducerDisplayField[],
    ) => void;
}

function BlazingProducerRecordsListComponent({
    records,
    clearRecords,
    setSelectedRecord,
    setSelectedRecordId,
    selectedRecordId,
    setIsPreviewModalOpen,
    timezone,
    setTimezone,
    timeFormat,
    setTimeFormat,
    displayedFields,
    setDisplayedFields,
}: BlazingProducerRecordsListComponentProps) {
    const partitionSelected = displayedFields.includes('partition');
    const offsetSelected = displayedFields.includes('offset');
    const timestampSelected = displayedFields.includes('timestamp');
    const keySelected = displayedFields.includes('key');
    const valueSelected = displayedFields.includes('value');
    const colsNumber = useMemo(() => {
        let cols = 0;
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
        keySelected,
        valueSelected,
        partitionSelected,
        offsetSelected,
        timestampSelected,
    ]);

    return (
        <div className="flex flex-col w-full h-full">
            <div
                className="grid gap-2 w-full items-center relative"
                style={{
                    minHeight: '2.7rem',
                    gridTemplateColumns: `repeat(${colsNumber}, minmax(0, 1fr))`,
                }}
            >
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
                <div className="absolute flex justify-end w-full">
                    <Tooltip label={`Clear (${records.length})`}>
                        <ActionIcon
                            onClick={() => {
                                if (records.length === 0) {
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
                    <BlazingProducerRecordsSettings
                        timezone={timezone}
                        setTimezone={setTimezone}
                        timeFormat={timeFormat}
                        setTimeFormat={setTimeFormat}
                        displayedFields={displayedFields}
                        setDisplayedFields={setDisplayedFields}
                    />
                </div>
            </div>
            {records.length > 0 ? (
                <CommonScrollArea className="h-full w-full">
                    <BlazingProducerRecordsItemsPaging
                        records={records}
                        setSelectedRecord={setSelectedRecord}
                        setSelectedRecordId={setSelectedRecordId}
                        selectedRecordId={selectedRecordId}
                        setIsPreviewModalOpen={setIsPreviewModalOpen}
                        timezone={timezone}
                        timeFormat={timeFormat}
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

export default BlazingProducerRecordsListComponent;
