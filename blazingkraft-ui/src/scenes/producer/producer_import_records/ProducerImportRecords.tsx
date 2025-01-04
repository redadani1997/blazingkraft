import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import { PublishedRecord } from '../blazing_producer/body/BlazingProducerBodyComponent';
import { IPublishedRecordOrError } from '../redux';
import producerActions from '../redux/actions';
import ProducerImportRecordsComponent from './ProducerImportRecordsComponent';

interface ProducerImportRecordsProps {
    keySchema: string;
    valueSchema: string;
    keySerializer: string;
    keySerializerConfiguration: Map<string, any>;
    valueSerializer: string;
    valueSerializerConfiguration: Map<string, any>;
    isModalOpen: boolean;
    setIsModalOpen: (boolean) => void;
    onSuccess: (importedRecords: PublishedRecord[]) => void;
}

const ProducerImportRecords = ({
    isModalOpen,
    setIsModalOpen,
    onSuccess,
    keySchema,
    valueSchema,
    keySerializer,
    keySerializerConfiguration,
    valueSerializer,
    valueSerializerConfiguration,
}: ProducerImportRecordsProps) => {
    // Map State To Props
    const { isImportBlazingRecordsPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isImportBlazingRecordsPending:
                    store.producerReducer.isImportBlazingRecordsPending,
            };
        },
        shallowEqual,
    );

    // Map Dispatch To Props
    const { clusterCode } = useParams();

    const dispatch = useDispatch<any>();

    const importBlazingRecords = (
        jsonFile: any,
        failFast: boolean,
        async: boolean,
    ) =>
        dispatch(
            producerActions.importBlazingRecords(
                jsonFile,
                failFast,
                async,
                keySchema,
                valueSchema,
                keySerializer,
                keySerializerConfiguration,
                valueSerializer,
                valueSerializerConfiguration,
                clusterCode,
            ),
        ).then(({ value }: { value: IPublishedRecordOrError[] }) => {
            setIsModalOpen(false);
            if (!value || value.length === 0) {
                return;
            }

            const importedRecords: PublishedRecord[] = value
                .reverse()
                .map(recordOrError => {
                    const { recordData } = recordOrError;
                    const parsingErrorMessage = `Unavailable due to Parsing Error:\n\n ${recordOrError.errorMessage}`;

                    if (recordOrError.succeeded) {
                        return {
                            id: null,
                            topic: null,
                            recordMetadata: recordOrError.recordMetadata,
                            key: recordData
                                ? recordData.key
                                : parsingErrorMessage,
                            keySchema: null,
                            keySerializer: null,
                            value: recordData
                                ? recordData.value
                                : parsingErrorMessage,
                            valueSchema: null,
                            valueSerializer: null,
                            headers: recordData
                                ? recordData.headers
                                : parsingErrorMessage,
                            succeeded: true,
                            errorMessage: null,
                        };
                    } else {
                        return {
                            id: null,
                            topic: null,
                            recordMetadata: null,
                            key: recordData
                                ? recordData.key
                                : parsingErrorMessage,
                            keySchema: null,
                            keySerializer: null,
                            value: recordData
                                ? recordData.value
                                : parsingErrorMessage,
                            valueSchema: null,
                            valueSerializer: null,
                            headers: recordData
                                ? recordData.headers
                                : parsingErrorMessage,
                            succeeded: false,
                            errorMessage: recordOrError.errorMessage,
                        };
                    }
                });
            onSuccess(importedRecords);
        });

    return (
        <>
            <ProducerImportRecordsComponent
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                importBlazingRecords={importBlazingRecords}
                isImportBlazingRecordsPending={isImportBlazingRecordsPending}
            />
        </>
    );
};

export default ProducerImportRecords;
