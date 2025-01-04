import useCommonLocalStorage from 'common/hooks/localstorage/useCommonLocalStorage';
import {
    BlazingConsumptionResponse,
    ConsumerConfiguration,
    ConsumerDeserializer,
} from 'common/types/consumer';
import { TopicDescription } from 'common/types/topic';
import { CommonTimeUtils } from 'common/utils/CommonTimeUtils ';
import { CommonUtils } from 'common/utils/CommonUtils';
import {
    ConsumerUtils,
    IBlazingKRaftConsumerConfigurationStorage,
    IBlazingKRaftConsumerSettingsStorage,
} from 'common/utils/ConsumerUtils';
import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    useTransition,
} from 'react';
import BlazingConsumerFilter from './blazing_consumer_filter/BlazingConsumerFilter';
import BlazingConsumerRecords from './blazing_consumer_records/BlazingConsumerRecords';
import { BlazingConsumerDisplayField } from './blazing_consumer_records/BlazingConsumerRecordsComponent';

interface BlazingConsumerBodyComponentProps {
    consumerConfiguration: ConsumerConfiguration;
    isGetAllTopicsDescriptionsPending: boolean;
    topicsDescriptions: TopicDescription[];
    topics: string[];
}

const BlazingConsumerBodyComponent = ({
    isGetAllTopicsDescriptionsPending,
    topicsDescriptions,
    consumerConfiguration,
    topics,
}: BlazingConsumerBodyComponentProps) => {
    const [isTransitionning, startTransition] = useTransition();
    const [isAllTransitionning, startAllTransition] = useTransition();
    const [allRecords, setAllRecords] = useState<BlazingConsumptionResponse[]>(
        [],
    );
    const recordsInnerState = useRef<BlazingConsumptionResponse[]>([]);
    const [keyDeserializer, setKeyDeserializer] =
        useState<ConsumerDeserializer>('STRING');
    const [keyDeserializerConfiguration, setKeyDeserializerConfiguration] =
        useState<Map<string, any> | undefined>(new Map<string, any>());
    const [valueDeserializer, setValueDeserializer] =
        useState<ConsumerDeserializer>('STRING');
    const [valueDeserializerConfiguration, setValueDeserializerConfiguration] =
        useState<Map<string, any> | undefined>(new Map<string, any>());
    const [timezone, setTimezone] = useState<string>(
        CommonTimeUtils.CURRENT_TIMEZONE,
    );
    const [resultsSize, setResultsSize] = useState<number>(
        ConsumerUtils.DEFAULT_RESULTS_SIZE,
    );
    const [timeFormat, setTimeFormat] = useState(
        CommonTimeUtils.COMMON_DATE_FORMAT,
    );
    const [displayedFields, setDisplayedFields] = useState<
        BlazingConsumerDisplayField[]
    >(['topic', 'partition', 'offset', 'timestamp']);
    const [isConsuming, setIsConsuming] = useState(false);

    const [valueSchema, setValueSchema] = useState<string>();
    const [keySchema, setKeySchema] = useState<string>();
    const [isValueSchemaSyntaxValid, setIsValueSchemaSyntaxValid] =
        useState<boolean>(true);
    const [isKeySchemaSyntaxValid, setIsKeySchemaSyntaxValid] =
        useState<boolean>(true);
    const [isValueSchemaDefinitionValid, setIsValueSchemaDefinitionValid] =
        useState<boolean>(true);
    const [isKeySchemaDefinitionValid, setIsKeySchemaDefinitionValid] =
        useState<boolean>(true);

    function transitionnedSetAllRecords(records: BlazingConsumptionResponse[]) {
        startAllTransition(() => {
            setAllRecords(records);
        });
    }

    const synchronousSetAllRecords = useCallback(
        (records: BlazingConsumptionResponse[]) => {
            setAllRecords(records);
        },
        [setAllRecords],
    );

    const clearRecords = useCallback(() => {
        recordsInnerState.current = [];
        synchronousSetAllRecords([]);
    }, []);

    const [
        getBlazingKRaftConsumerConfigurationStorage,
        setBlazingKRaftConsumerConfigurationStorage,
    ] = useCommonLocalStorage({
        key: 'Blazing KRaft Consumer Configuration',
    });

    const blazingKRaftConsumerConfigurationStorage: IBlazingKRaftConsumerConfigurationStorage | null =
        useMemo(() => {
            return ConsumerUtils.retrieveBlazingKRaftConsumerConfigurationStorage(
                getBlazingKRaftConsumerConfigurationStorage,
            );
        }, []);

    const [
        getBlazingKRaftConsumerSettingsStorage,
        setBlazingKRaftConsumerSettingsStorage,
    ] = useCommonLocalStorage({
        key: 'Blazing KRaft Consumer Settings',
    });

    const blazingKRaftConsumerSettingsStorage: IBlazingKRaftConsumerSettingsStorage | null =
        useMemo(() => {
            return ConsumerUtils.retrieveBlazingKRaftConsumerSettingsStorage(
                getBlazingKRaftConsumerSettingsStorage,
            );
        }, []);

    useEffect(() => {
        if (blazingKRaftConsumerSettingsStorage) {
            if (blazingKRaftConsumerSettingsStorage.timezone) {
                setTimezone(blazingKRaftConsumerSettingsStorage.timezone);
            }
            if (blazingKRaftConsumerSettingsStorage.timeFormat) {
                setTimeFormat(blazingKRaftConsumerSettingsStorage.timeFormat);
            }
            if (blazingKRaftConsumerSettingsStorage.resultsSize) {
                setResultsSize(blazingKRaftConsumerSettingsStorage.resultsSize);
            }
            if (blazingKRaftConsumerSettingsStorage.displayedFields) {
                setDisplayedFields(
                    blazingKRaftConsumerSettingsStorage.displayedFields,
                );
            }
        }
    }, []);

    useEffect(() => {
        setKeyDeserializer(
            !consumerConfiguration.perRequestKeyDeserializer
                ? consumerConfiguration.keyDeserializer
                : 'STRING',
        );
        setValueDeserializer(
            !consumerConfiguration.perRequestValueDeserializer
                ? consumerConfiguration.valueDeserializer
                : 'STRING',
        );
        if (blazingKRaftConsumerConfigurationStorage) {
            if (
                consumerConfiguration.perRequestKeyDeserializer &&
                blazingKRaftConsumerConfigurationStorage.keyDeserializer
            ) {
                setKeySchema(
                    blazingKRaftConsumerConfigurationStorage.kafkaKeySchema,
                );
                setIsKeySchemaSyntaxValid(true);
                setIsKeySchemaDefinitionValid(true);

                setKeyDeserializer(
                    blazingKRaftConsumerConfigurationStorage.keyDeserializer,
                );
            }
            if (
                consumerConfiguration.perRequestValueDeserializer &&
                blazingKRaftConsumerConfigurationStorage.valueDeserializer
            ) {
                setValueSchema(
                    blazingKRaftConsumerConfigurationStorage.kafkaValueSchema,
                );
                setIsValueSchemaSyntaxValid(true);
                setIsValueSchemaDefinitionValid(true);
                setValueDeserializer(
                    blazingKRaftConsumerConfigurationStorage.valueDeserializer,
                );
            }
        }
    }, [consumerConfiguration]);

    useEffect(() => {
        const initialValueDeserializerConfiguration =
            !consumerConfiguration.perRequestValueDeserializer
                ? consumerConfiguration.valueDeserializerConfiguration
                : ConsumerUtils.computeInitialDeserializerConfiguration(
                      valueDeserializer,
                      false,
                      !consumerConfiguration.perRequestValueDeserializer,
                  );
        setValueDeserializerConfiguration(
            initialValueDeserializerConfiguration,
        );
        if (
            blazingKRaftConsumerConfigurationStorage &&
            consumerConfiguration.perRequestValueDeserializer
        ) {
            if (
                blazingKRaftConsumerConfigurationStorage.valueDeserializerConfiguration
            ) {
                setValueDeserializerConfiguration(
                    CommonUtils.objectToMap(
                        blazingKRaftConsumerConfigurationStorage.valueDeserializerConfiguration,
                    ),
                );
            }
        }
    }, [valueDeserializer]);
    useEffect(() => {
        const initialKeyDeserializerConfiguration =
            !consumerConfiguration.perRequestKeyDeserializer
                ? consumerConfiguration.keyDeserializerConfiguration
                : ConsumerUtils.computeInitialDeserializerConfiguration(
                      keyDeserializer,
                      true,
                      !consumerConfiguration.perRequestKeyDeserializer,
                  );
        setKeyDeserializerConfiguration(initialKeyDeserializerConfiguration);
        if (
            blazingKRaftConsumerConfigurationStorage &&
            consumerConfiguration.perRequestKeyDeserializer
        ) {
            if (
                blazingKRaftConsumerConfigurationStorage.keyDeserializerConfiguration
            ) {
                setKeyDeserializerConfiguration(
                    CommonUtils.objectToMap(
                        blazingKRaftConsumerConfigurationStorage.keyDeserializerConfiguration,
                    ),
                );
            }
        }
    }, [keyDeserializer]);

    return (
        <div className="h-full w-full flex flex-col">
            <div className="h-auto">
                <BlazingConsumerFilter
                    isGetAllTopicsDescriptionsPending={
                        isGetAllTopicsDescriptionsPending
                    }
                    topicsDescriptions={topicsDescriptions}
                    consumerConfiguration={consumerConfiguration}
                    topics={topics}
                    keyDeserializer={keyDeserializer}
                    setKeyDeserializer={setKeyDeserializer}
                    keyDeserializerConfiguration={keyDeserializerConfiguration}
                    setKeyDeserializerConfiguration={
                        setKeyDeserializerConfiguration
                    }
                    valueDeserializer={valueDeserializer}
                    setValueDeserializer={setValueDeserializer}
                    valueDeserializerConfiguration={
                        valueDeserializerConfiguration
                    }
                    setValueDeserializerConfiguration={
                        setValueDeserializerConfiguration
                    }
                    timezone={timezone}
                    setTimezone={setTimezone}
                    resultsSize={resultsSize}
                    timeFormat={timeFormat}
                    displayedFields={displayedFields}
                    synchronousSetAllRecords={synchronousSetAllRecords}
                    transitionnedSetAllRecords={transitionnedSetAllRecords}
                    recordsInnerState={recordsInnerState}
                    setIsConsuming={setIsConsuming}
                    isConsuming={isConsuming}
                    keySchema={keySchema}
                    valueSchema={valueSchema}
                    setKeySchema={setKeySchema}
                    setValueSchema={setValueSchema}
                    isKeySchemaSyntaxValid={isKeySchemaSyntaxValid}
                    setIsKeySchemaSyntaxValid={setIsKeySchemaSyntaxValid}
                    isKeySchemaDefinitionValid={isKeySchemaDefinitionValid}
                    setIsKeySchemaDefinitionValid={
                        setIsKeySchemaDefinitionValid
                    }
                    isValueSchemaSyntaxValid={isValueSchemaSyntaxValid}
                    setIsValueSchemaSyntaxValid={setIsValueSchemaSyntaxValid}
                    isValueSchemaDefinitionValid={isValueSchemaDefinitionValid}
                    setIsValueSchemaDefinitionValid={
                        setIsValueSchemaDefinitionValid
                    }
                />
            </div>
            <BlazingConsumerRecords
                keyDeserializer={keyDeserializer}
                valueDeserializer={valueDeserializer}
                timezone={timezone}
                setTimezone={setTimezone}
                multiTopics={topics && topics.length > 1}
                resultsSize={resultsSize}
                setResultsSize={setResultsSize}
                timeFormat={timeFormat}
                setTimeFormat={setTimeFormat}
                clearRecords={clearRecords}
                allRecords={allRecords}
                isAllTransitionning={isAllTransitionning}
                isConsuming={isConsuming}
                setDisplayedFields={setDisplayedFields}
                displayedFields={displayedFields}
            />
        </div>
    );
};

export default BlazingConsumerBodyComponent;
