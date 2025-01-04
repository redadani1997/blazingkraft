import { Grid, Text, useMantineColorScheme } from '@mantine/core';
import { useFocusTrap } from '@mantine/hooks';
import useCommonLocalStorage from 'common/hooks/localstorage/useCommonLocalStorage';
import {
    BlazingConsumptionResponse,
    ConsumerConfiguration,
    ConsumerDeserializer,
} from 'common/types/consumer';
import { TopicDescription } from 'common/types/topic';
import { CommonTimeUtils } from 'common/utils/CommonTimeUtils ';
import { CommonUtils } from 'common/utils/CommonUtils';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import {
    ConsumerUtils,
    TextSearchFilterType,
} from 'common/utils/ConsumerUtils';
import { MutableRefObject, useEffect, useMemo, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { TbInfoTriangleFilled } from 'react-icons/tb';
import { useParams, useSearchParams } from 'react-router-dom';
import CommonMultiSelect from 'scenes/common/select/CommonMultiSelect';
import BlazingConsumerAdditionalFilters from '../blazing_consumer_additional_filters/BlazingConsumerAdditionalFilters';
import { BlazingConsumerJavascriptUtils } from '../blazing_consumer_additional_filters/javascript/BlazingConsumerJavascriptUtils';
import BlazingConsumerDeserializer from '../blazing_consumer_deserializer/BlazingConsumerDeserializer';
import { BlazingConsumerDisplayField } from '../blazing_consumer_records/BlazingConsumerRecordsComponent';
import useKafkaConsumer, {
    RecordConsumptionRequestBody,
} from '../hooks/useKafkaConsumer';
import BlazingConsumerFilterButton from './button/BlazingConsumerFilterButton';

interface BlazingConsumerFilterComponentProps {
    consumerConfiguration: ConsumerConfiguration;
    isGetAllTopicsDescriptionsPending: boolean;
    topicsDescriptions: TopicDescription[];
    topics: string[];
    setKeyDeserializer: (keyDeserializer: ConsumerDeserializer) => void;
    setKeyDeserializerConfiguration: any;
    setValueDeserializer: (valueDeserializer: ConsumerDeserializer) => void;
    setValueDeserializerConfiguration: any;
    keyDeserializer: ConsumerDeserializer;
    keyDeserializerConfiguration: Map<string, any>;
    valueDeserializer: ConsumerDeserializer;
    valueDeserializerConfiguration: Map<string, any>;
    timezone: string;
    setTimezone: (timezone: string) => void;
    resultsSize: number;
    timeFormat: string;
    synchronousSetAllRecords: (records: BlazingConsumptionResponse[]) => void;
    transitionnedSetAllRecords: (records: BlazingConsumptionResponse[]) => void;
    recordsInnerState: MutableRefObject<BlazingConsumptionResponse[]>;
    setIsConsuming: (isConsuming: boolean) => void;
    isConsuming: boolean;
    displayedFields: BlazingConsumerDisplayField[];
    keySchema: string;
    valueSchema: string;
    setKeySchema: (keySchema: string) => void;
    setValueSchema: (valueSchema: string) => void;
    isKeySchemaSyntaxValid: boolean;
    setIsKeySchemaSyntaxValid: (isKeySchemaSyntaxValid: boolean) => void;
    isKeySchemaDefinitionValid: boolean;
    setIsKeySchemaDefinitionValid: (
        isKeySchemaDefinitionValid: boolean,
    ) => void;
    isValueSchemaSyntaxValid: boolean;
    setIsValueSchemaSyntaxValid: (isValueSchemaSyntaxValid: boolean) => void;
    isValueSchemaDefinitionValid: boolean;
    setIsValueSchemaDefinitionValid: (
        isValueSchemaDefinitionValid: boolean,
    ) => void;
}

export interface TimeFilter {
    disabled: boolean;
    liveConsumption: boolean;
    allowStart: boolean;
    startDate: Date;
    startTime: string;
    allowEnd: boolean;
    endDate: Date;
    endTime: string;
    earliest: boolean;
    latest: boolean;
}
export interface PartitionFilter {
    partitions: Map<string, string[]>;
}
export interface OffsetFilter {
    disabled: boolean;
    offsets: Map<string, number>;
}
export interface GroupIdFilter {
    groupId?: string;
}
export interface JavascriptFilter {
    disabled: boolean;
    content: string;
}

export interface TextSearchFilter {
    key: string;
    value: string;
    headers: string;
    metadata: string;
    keyType: TextSearchFilterType;
    valueType: TextSearchFilterType;
    headersType: TextSearchFilterType;
    metadataType: TextSearchFilterType;
}

function constructRequestBody(
    topics,
    clusterCode,
    keySchema,
    valueSchema,
    timeFilter: TimeFilter,
    partitionFilter: PartitionFilter,
    offsetFilter: OffsetFilter,
    groupIdFilter: GroupIdFilter,
    javascriptFilter: JavascriptFilter,
    textSearchFilter: TextSearchFilter,
    keyDeserializer,
    keyDeserializerConfiguration,
    valueDeserializer,
    valueDeserializerConfiguration,
    timezone,
    topicsDescriptions: TopicDescription[],
    resultsSize,
) {
    const start = timeFilter.allowStart
        ? CommonTimeUtils.datesToTimestamp(
              timeFilter.startDate,
              timeFilter.startTime,
              timezone,
          )
        : undefined;
    const end = timeFilter.allowEnd
        ? CommonTimeUtils.datesToTimestamp(
              timeFilter.endDate,
              timeFilter.endTime,
              timezone,
          )
        : undefined;
    const requestBody: RecordConsumptionRequestBody = {
        resultsSize,
        topics,
        clusterCode,
        keySchema,
        valueSchema,
        consumerAdditionalFiltersRequest: {
            timeFilter: {
                disabled: timeFilter.disabled,
                earliest: timeFilter.earliest,
                latest: timeFilter.latest,
                liveConsumption: timeFilter.liveConsumption,
                start,
                end,
            },
            partitionFilter: CommonUtils.mapToArray(
                partitionFilter.partitions,
            ).reduce((acc, current) => {
                const { key, value } = current;
                const topicDescription = topicsDescriptions.find(
                    topicDescription => topicDescription.name === key,
                );
                if (!topicDescription) {
                    return {
                        ...acc,
                        [key]: value,
                    };
                }
                return {
                    ...acc,
                    [key]: value.includes('-1')
                        ? topicDescription.partitions.map(
                              partitionInfo => partitionInfo.partition,
                          )
                        : value,
                };
            }, {}),
            offsetFilter: {
                disabled: offsetFilter.disabled,
                offsets: CommonUtils.mapToArray(offsetFilter.offsets).reduce(
                    (acc, current) => {
                        const { key, value } = current;
                        return {
                            ...acc,
                            [key]: value,
                        };
                    },
                    {},
                ),
            },
            groupIdFilter: groupIdFilter.groupId,
            javascriptFilter: {
                disabled: javascriptFilter.disabled,
                code: javascriptFilter.content,
            },
            textSearchFilter,
        },
        consumerAdditionalConfigurationRequest: {
            keyDeserializer: keyDeserializer,
            keyDeserializerConfiguration: keyDeserializerConfiguration,
            valueDeserializer: valueDeserializer,
            valueDeserializerConfiguration: valueDeserializerConfiguration,
        },
    };
    return requestBody;
}

function BlazingConsumerFilterComponent({
    isGetAllTopicsDescriptionsPending,
    topicsDescriptions,
    consumerConfiguration,
    topics,
    setKeyDeserializer,
    setKeyDeserializerConfiguration,
    setValueDeserializer,
    setValueDeserializerConfiguration,
    keyDeserializer,
    keyDeserializerConfiguration,
    valueDeserializer,
    valueDeserializerConfiguration,
    timezone,
    setTimezone,
    resultsSize,
    timeFormat,
    synchronousSetAllRecords,
    transitionnedSetAllRecords,
    recordsInnerState,
    setIsConsuming,
    isConsuming,
    displayedFields,
    isKeySchemaDefinitionValid,
    isKeySchemaSyntaxValid,
    isValueSchemaDefinitionValid,
    isValueSchemaSyntaxValid,
    keySchema,
    setIsKeySchemaDefinitionValid,
    setIsKeySchemaSyntaxValid,
    setIsValueSchemaDefinitionValid,
    setIsValueSchemaSyntaxValid,
    setKeySchema,
    setValueSchema,
    valueSchema,
}: BlazingConsumerFilterComponentProps) {
    const { colorScheme } = useMantineColorScheme();
    const favoriteColor = colorScheme === 'dark' ? 'yellow' : 'red';
    const topicsSelectRef = useFocusTrap(
        CommonValidationUtils.isFalsyArray(topics),
    );

    const [_, setSearchParams] = useSearchParams();

    const [timeFilter, setTimeFilter] = useState<TimeFilter>({
        disabled: false,
        allowStart: false,
        startDate: CommonTimeUtils.nowAsDate(timezone),
        startTime: CommonTimeUtils.nowAsTimeString(timezone),
        allowEnd: false,
        endDate: CommonTimeUtils.nowAsDate(timezone),
        endTime: CommonTimeUtils.nowAsTimeString(timezone),
        liveConsumption: false,
        earliest: false,
        latest: true,
    });
    const [partitionFilter, setPartitionFilter] = useState<PartitionFilter>({
        partitions: new Map<string, string[]>(),
    });
    const [offsetFilter, setOffsetFilter] = useState<OffsetFilter>({
        disabled: true,
        offsets: new Map<string, number>(),
    });
    const [groupIdFilter, setGroupIdFilter] = useState<GroupIdFilter>({});

    const [javascriptFilter, setJavascriptFilter] = useState<JavascriptFilter>({
        content: BlazingConsumerJavascriptUtils.CONTENT_BOILERPLATE,
        disabled: true,
    });
    const [textSearchFilter, setTextSearchFilter] = useState<TextSearchFilter>({
        key: '',
        value: '',
        headers: '',
        metadata: '',
        keyType: 'DISABLED',
        valueType: 'DISABLED',
        headersType: 'DISABLED',
        metadataType: 'DISABLED',
    });

    const [alreadyStarted, setAlreadyStarted] = useState(false);
    const [partitionFilterInitialized, setPartitionFilterInitialized] =
        useState(false);

    const [
        getBlazingKRaftConsumerConfigurationStorage,
        setBlazingKRaftConsumerConfigurationStorage,
    ] = useCommonLocalStorage({
        key: 'Blazing KRaft Consumer Configuration',
    });

    const [
        getBlazingKRaftConsumerSettingsStorage,
        setBlazingKRaftConsumerSettingsStorage,
    ] = useCommonLocalStorage({
        key: 'Blazing KRaft Consumer Settings',
    });

    const { start, stop } = useKafkaConsumer(
        synchronousSetAllRecords,
        transitionnedSetAllRecords,
        recordsInnerState,
        setIsConsuming,
    );

    useEffect(() => {
        setIsConsuming(isConsuming);
    }, [isConsuming]);

    const { clusterCode } = useParams();

    function doStart() {
        const requestBody: RecordConsumptionRequestBody = constructRequestBody(
            topics,
            clusterCode,
            keySchema,
            valueSchema,
            timeFilter,
            partitionFilter,
            offsetFilter,
            groupIdFilter,
            javascriptFilter,
            textSearchFilter,
            keyDeserializer,
            keyDeserializerConfiguration,
            valueDeserializer,
            valueDeserializerConfiguration,
            timezone,
            topicsDescriptions,
            resultsSize,
        );

        start(requestBody);
    }

    const initialDoStart = doStart;

    function doStartWithStorage() {
        doStart();
        ConsumerUtils.storeBlazingKRaftConsumerConfigurationStorage(
            {
                kafkaKeySchema: keySchema,
                kafkaValueSchema: valueSchema,
                keyDeserializer,
                keyDeserializerConfiguration: CommonUtils.mapToObject(
                    keyDeserializerConfiguration,
                ),
                valueDeserializer,
                valueDeserializerConfiguration: CommonUtils.mapToObject(
                    valueDeserializerConfiguration,
                ),
            },
            setBlazingKRaftConsumerConfigurationStorage,
        );
        ConsumerUtils.storeBlazingKRaftConsumerSettingsStorage(
            {
                displayedFields,
                resultsSize:
                    resultsSize > 0
                        ? resultsSize
                        : ConsumerUtils.DEFAULT_RESULTS_SIZE,
                timeFormat,
                timezone,
            },
            setBlazingKRaftConsumerSettingsStorage,
        );
    }

    function doStop() {
        stop();
    }

    useEffect(() => {
        if (alreadyStarted) {
            return;
        }
        if (!alreadyStarted && isConsuming) {
            setAlreadyStarted(true);
        }
        if (
            CommonValidationUtils.isTruthyArray(topics) &&
            topicsDescriptions.length > 0 &&
            partitionFilterInitialized &&
            !isConsuming &&
            !isGetAllTopicsDescriptionsPending
        ) {
            setAlreadyStarted(true);
            initialDoStart();
        }
    }, [
        topicsDescriptions,
        alreadyStarted,
        isConsuming,
        partitionFilterInitialized,
        isGetAllTopicsDescriptionsPending,
    ]);

    const topicsExists = useMemo(() => {
        return topics && topics.length > 0;
    }, [topics, topicsDescriptions]);

    const topicsOptions = useMemo(
        () =>
            topicsDescriptions.map(topicDescription => ({
                label: topicDescription.name,
                value: topicDescription.name,
                isFavorite: topicDescription.isFavorite,
                internal: topicDescription.internal,
            })),
        [topicsDescriptions],
    );
    return (
        <div className="flex flex-col">
            <Grid className="">
                <Grid.Col span={12} xs={6} sm={4} md={4} lg={4}>
                    <CommonMultiSelect
                        multiSelectRef={topicsSelectRef}
                        loading={isGetAllTopicsDescriptionsPending}
                        data={topicsOptions}
                        placeholder={'Please select topics'}
                        value={topics}
                        onChange={value => {
                            setSearchParams({
                                topics: value ? value.join(';') : '',
                            });
                        }}
                        error={!topicsExists ? true : false}
                        searchable
                        clearable
                        creatable
                        labelRenderer={({ label, isFavorite, internal }) => {
                            if (!internal && !isFavorite) {
                                return label;
                            }
                            return (
                                <div className="flex items-center">
                                    <Text>{label}</Text>
                                    {internal && (
                                        <TbInfoTriangleFilled
                                            size="1.1rem"
                                            className="ml-1"
                                            color="pink"
                                        />
                                    )}
                                    {isFavorite && (
                                        <AiFillStar
                                            color={favoriteColor}
                                            size="1.1rem"
                                            className="ml-1"
                                        />
                                    )}
                                </div>
                            );
                        }}
                    />
                </Grid.Col>
                <Grid.Col span={12} xs={6} sm={2} md={2} lg={2}>
                    <BlazingConsumerAdditionalFilters
                        topics={topics}
                        topicsDescriptions={topicsDescriptions}
                        timeFilter={timeFilter}
                        setTimeFilter={setTimeFilter}
                        partitionFilter={partitionFilter}
                        setPartitionFilter={setPartitionFilter}
                        offsetFilter={offsetFilter}
                        setOffsetFilter={setOffsetFilter}
                        groupIdFilter={groupIdFilter}
                        setGroupIdFilter={setGroupIdFilter}
                        javascriptFilter={javascriptFilter}
                        setJavascriptFilter={setJavascriptFilter}
                        textSearchFilter={textSearchFilter}
                        setTextSearchFilter={setTextSearchFilter}
                        keyDeserializer={keyDeserializer}
                        valueDeserializer={valueDeserializer}
                        timezone={timezone}
                        setTimezone={setTimezone}
                        timeFormat={timeFormat}
                        setPartitionFilterInitialized={
                            setPartitionFilterInitialized
                        }
                        isGetAllTopicsDescriptionsPending={
                            isGetAllTopicsDescriptionsPending
                        }
                    />
                </Grid.Col>
                <Grid.Col span={12} xs={6} sm={2} md={2} lg={2}>
                    <BlazingConsumerDeserializer
                        consumerConfiguration={consumerConfiguration}
                        keyDeserializer={keyDeserializer}
                        keyDeserializerConfiguration={
                            keyDeserializerConfiguration
                        }
                        setKeyDeserializerConfiguration={
                            setKeyDeserializerConfiguration
                        }
                        valueDeserializer={valueDeserializer}
                        valueDeserializerConfiguration={
                            valueDeserializerConfiguration
                        }
                        setValueDeserializerConfiguration={
                            setValueDeserializerConfiguration
                        }
                        setKeyDeserializer={setKeyDeserializer}
                        setValueDeserializer={setValueDeserializer}
                        keySchema={keySchema}
                        valueSchema={valueSchema}
                        setKeySchema={setKeySchema}
                        setValueSchema={setValueSchema}
                        setIsKeySchemaSyntaxValid={setIsKeySchemaSyntaxValid}
                        setIsKeySchemaDefinitionValid={
                            setIsKeySchemaDefinitionValid
                        }
                        setIsValueSchemaSyntaxValid={
                            setIsValueSchemaSyntaxValid
                        }
                        setIsValueSchemaDefinitionValid={
                            setIsValueSchemaDefinitionValid
                        }
                    />
                </Grid.Col>
                <Grid.Col span={12} xs={6} sm={4} md={4} lg={2}>
                    <BlazingConsumerFilterButton
                        doStart={doStartWithStorage}
                        doStop={doStop}
                        isConsuming={isConsuming}
                        isKeySchemaDefinitionValid={isKeySchemaDefinitionValid}
                        isKeySchemaSyntaxValid={isKeySchemaSyntaxValid}
                        isValueSchemaDefinitionValid={
                            isValueSchemaDefinitionValid
                        }
                        isValueSchemaSyntaxValid={isValueSchemaSyntaxValid}
                        topicsExists={topicsExists}
                    />
                </Grid.Col>
            </Grid>
        </div>
    );
}

export default BlazingConsumerFilterComponent;
