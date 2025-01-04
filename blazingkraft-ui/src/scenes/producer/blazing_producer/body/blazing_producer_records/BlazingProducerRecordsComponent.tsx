import useCommonLocalStorage from 'common/hooks/localstorage/useCommonLocalStorage';
import { CommonTimeUtils } from 'common/utils/CommonTimeUtils ';
import {
    IBlazingKRaftProducerSettingsStorage,
    ProducerUtils,
} from 'common/utils/ProducerUtils';
import { useEffect, useMemo, useState } from 'react';
import { PublishedRecord } from '../BlazingProducerBodyComponent';
import BlazingProducerRecordsList from './list/BlazingProducerRecordsList';
import BlazingProducerRecordPreview from './preview/BlazingProducerRecordPreview';

interface BlazingProducerRecordsComponentProps {
    records: PublishedRecord[];
    clearRecords: () => void;
}
export type BlazingProducerDisplayField =
    | 'key'
    | 'value'
    | 'partition'
    | 'offset'
    | 'timestamp';

function BlazingProducerRecordsComponent({
    records,
    clearRecords,
}: BlazingProducerRecordsComponentProps) {
    const [selectedRecord, setSelectedRecord] =
        useState<PublishedRecord | null>(null);
    const [selectedRecordId, setSelectedRecordId] = useState<number>(null);
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const [displayedFields, setDisplayedFields] = useState<
        BlazingProducerDisplayField[]
    >(['partition', 'offset', 'timestamp']);
    const [timezone, setTimezone] = useState<string>(
        CommonTimeUtils.CURRENT_TIMEZONE,
    );
    const [timeFormat, setTimeFormat] = useState(
        CommonTimeUtils.COMMON_DATE_FORMAT,
    );

    const [
        getBlazingKRaftProducerSettingsStorage,
        setBlazingKRaftProducerSettingsStorage,
    ] = useCommonLocalStorage({
        key: 'Blazing KRaft Producer Settings',
    });

    const blazingKRaftProducerSettingsStorage: IBlazingKRaftProducerSettingsStorage | null =
        useMemo(() => {
            return ProducerUtils.retrieveBlazingKRaftProducerSettingsStorage(
                getBlazingKRaftProducerSettingsStorage,
            );
        }, []);

    useEffect(() => {
        if (blazingKRaftProducerSettingsStorage) {
            if (blazingKRaftProducerSettingsStorage.displayedFields) {
                setDisplayedFields(
                    blazingKRaftProducerSettingsStorage.displayedFields,
                );
            }
            if (blazingKRaftProducerSettingsStorage.timezone) {
                setTimezone(blazingKRaftProducerSettingsStorage.timezone);
            }
            if (blazingKRaftProducerSettingsStorage.timeFormat) {
                setTimeFormat(blazingKRaftProducerSettingsStorage.timeFormat);
            }
        }
    }, []);

    useEffect(() => {
        if (records && records.length === 0) {
            setSelectedRecord(null);
            setSelectedRecordId(null);
        } else if (
            selectedRecordId === null &&
            selectedRecord === null &&
            records &&
            records.length > 0
        ) {
            setSelectedRecord(records[0]);
            setSelectedRecordId(0);

            ProducerUtils.storeBlazingKRaftProducerSettingsStorage(
                {
                    displayedFields,
                    timezone,
                    timeFormat,
                },
                setBlazingKRaftProducerSettingsStorage,
            );
        }
    }, [records]);
    return (
        <>
            <BlazingProducerRecordsList
                records={records}
                clearRecords={clearRecords}
                setSelectedRecord={setSelectedRecord}
                selectedRecordId={selectedRecordId}
                setSelectedRecordId={setSelectedRecordId}
                setIsPreviewModalOpen={setIsPreviewModalOpen}
                timezone={timezone}
                setTimezone={setTimezone}
                timeFormat={timeFormat}
                setTimeFormat={setTimeFormat}
                displayedFields={displayedFields}
                setDisplayedFields={setDisplayedFields}
            />

            <BlazingProducerRecordPreview
                selectedRecord={selectedRecord}
                isPreviewModalOpen={isPreviewModalOpen}
                setIsPreviewModalOpen={setIsPreviewModalOpen}
                timezone={timezone}
                timeFormat={timeFormat}
            />
        </>
    );
}

export default BlazingProducerRecordsComponent;
