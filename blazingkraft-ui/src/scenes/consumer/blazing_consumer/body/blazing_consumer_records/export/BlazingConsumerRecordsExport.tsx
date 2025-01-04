import { BlazingConsumptionResponse } from 'common/types/consumer';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import consumerActions from 'scenes/consumer/redux/actions';
import BlazingConsumerRecordsExportComponent from './BlazingConsumerRecordsExportComponent';

interface BlazingConsumerRecordsExportProps {
    selectedRecordId: number;
    allRecords: BlazingConsumptionResponse[];
}

const BlazingConsumerRecordsExport = ({
    allRecords,
    selectedRecordId,
}: BlazingConsumerRecordsExportProps) => {
    // Map State To Props
    const { isExportConsumerRecordsPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isExportConsumerRecordsPending:
                    store.consumerReducer.isExportConsumerRecordsPending,
            };
        },
        shallowEqual,
    );

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { clusterCode } = useParams();

    const exportConsumerRecords = (
        records: BlazingConsumptionResponse[],
        exportType: 'CSV' | 'JSON',
    ) =>
        dispatch(
            consumerActions.exportConsumerRecords(
                records,
                exportType,
                clusterCode,
            ),
        );

    return (
        <BlazingConsumerRecordsExportComponent
            selectedRecordId={selectedRecordId}
            allRecords={allRecords}
            isExportConsumerRecordsPending={isExportConsumerRecordsPending}
            exportConsumerRecords={exportConsumerRecords}
        />
    );
};

export default BlazingConsumerRecordsExport;
